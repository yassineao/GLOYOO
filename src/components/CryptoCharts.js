// DataSeriesChart.jsx

import React, { useEffect, useState, useMemo } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import PropTypes from 'prop-types';
import GlitchLoader from '../components/loader';
import Radio from './Radio'; // Adjust the import path as necessary

const DataSeriesChart = ({ coinId = 'bitcoin' }) => {
  const [chartData, setChartData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [interval, setInterval] = useState('monthly'); // Default interval
  const [isZoomed, setIsZoomed] = useState(false); // Track zoom state
  const [scaleType, setScaleType] = useState('linear'); // Linear or Logarithmic scale
  const [chartType, setChartType] = useState('area'); // 'area' or 'candlestick'

  const API_KEY = '35701ffd-c0bb-4deb-80e7-947e91e96e4e'; // Ensure you have this in your .env file

  useEffect(() => {
    const fetchCoinData = async () => {
      setLoading(true);
      setError(null);

      let days;
      switch (interval) {
        case 'hourly':
          days = 1;
          break;
        case 'weekly':
          days = 7;
          break;
        case 'biweekly':
          days = 14;
          break;
        case 'monthly':
          days = 30;
          break;
        case 'quarterly':
          days = 90;
          break;
        case 'biannually':
          days = 180;
          break;
        case 'yearly':
          days = 365;
          break;
        case 'all':
          days = 'max'; // For CoinGecko API
          break;
        default:
          days = 7;
      }

      try {
        if (chartType === 'candlestick') {
          // Fetch OHLC data from CoinGecko
          let coinGeckoId = coinId.toLowerCase();
          const coinGeckoIds = {
            bitcoin: 'bitcoin',
            ethereum: 'ethereum',
            ripple: 'ripple',
            litecoin: 'litecoin',
            // Add more mappings as necessary
          };
          coinGeckoId = coinGeckoIds[coinId.toLowerCase()] || coinId.toLowerCase();

          const ohlcResponse = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coinGeckoId}/ohlc`,
            {
              params: {
                vs_currency: 'usd',
                days: days === 'max' ? 'max' : days,
              },
            }
          );

          const data = ohlcResponse.data;
          console.log('CoinGecko API Response:', data);

          if (Array.isArray(data) && data.length > 0) {
            const chartSeriesData = data
              .map((point) => {
                if (Array.isArray(point) && point.length >= 5) {
                  return {
                    x: new Date(point[0]),
                    y: [point[1], point[2], point[3], point[4]], // [open, high, low, close]
                  };
                } else {
                  console.error('Invalid point data:', point);
                  return null;
                }
              })
              .filter((item) => item !== null);

            if (chartSeriesData.length === 0) {
              setError('No valid OHLC data available');
              return;
            }

            setChartData([
              {
                data: chartSeriesData,
              },
            ]);

            // No need to set categories; x-axis will use Date objects
            setCategories([]);
          } else {
            setError('No OHLC data available');
            return;
          }
        } else {
          // Fetch area chart data from LiveCoinWatch API
          const startDate =
            Date.now() -
            (days === 'max' ? 365 * 5 * 24 * 60 * 60 * 1000 : days * 24 * 60 * 60 * 1000);
          const response = await axios.post(
            'https://api.livecoinwatch.com/coins/single/history',
            {
              code: coinId.toUpperCase(),
              currency: 'USD',
              start: startDate,
              end: Date.now(),
              meta: true,
            },
            {
              headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json',
              },
            }
          );

          if (Array.isArray(response.data.history)) {
            const validData = response.data.history.filter((point) => point.rate > 0);

            if (validData.length === 0) {
              setError('No valid data available for the selected interval.');
              return;
            }

            const prices = validData.map((point) => parseFloat(point.rate.toFixed(4)));

            const dateOptions = {
              day: 'numeric',
              month: 'short',
              year: interval === 'yearly' || interval === 'all' ? 'numeric' : undefined,
              hour: interval === 'hourly' ? '2-digit' : undefined,
              minute: interval === 'hourly' ? '2-digit' : undefined,
            };

            const dates = validData.map((point) =>
              new Date(point.date).toLocaleDateString('en-US', dateOptions)
            );

            setChartData([
              {
                name: `${coinId} Price (USD)`,
                data: prices,
              },
            ]);
            setCategories(dates);
          } else {
            setError('No historical data available');
          }
        }
      } catch (error) {
        console.error('Error fetching coin data:', error);

        if (error.response && error.response.data && error.response.data.error) {
          setError(`API Error: ${error.response.data.error}`);
        } else {
          setError('Failed to load data from the API.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [coinId, interval, scaleType, chartType]);

  const options = useMemo(() => {
    const isCandlestick = chartType === 'candlestick';

    const commonOptions = {
      chart: {
        type: chartType,
        height: '100%',
        fontFamily: 'Orbitron, sans-serif',
        animations: {
          enabled: true,
          easing: 'easeout',
          speed: 1500,
          dynamicAnimation: {
            speed: 1000,
          },
        },
        toolbar: {
          show: true,
          tools: {
            zoom: true,
            zoomin: true,
            zoomout: true,
            reset: true,
            selection: true,
          },
          autoSelected: 'zoom',
        },
        events: {
          zoomed: () => {
            setIsZoomed(true);
          },
          beforeResetZoom: () => {
            setIsZoomed(false);
          },
        },
        background: 'linear-gradient(145deg, #1d1f27, #222835)',
        foreColor: '#FFF',
      },
      xaxis: isCandlestick
        ? {
            type: 'datetime',
            labels: {
              datetimeUTC: false,
              style: {
                colors: '#8AFCFF',
                fontSize: '12px',
              },
            },
          }
        : {
            categories: categories,
            labels: {
              style: {
                colors: '#8AFCFF',
                fontSize: '12px',
              },
            },
            axisBorder: {
              show: true,
              color: '#8AFCFF',
            },
          },
      yaxis: {
        type: isCandlestick ? 'numeric' : scaleType,
        labels: {
          style: {
            colors: '#FC74FF',
            fontSize: '12px',
          },
        },
      },
      tooltip: {
        enabled: true,
        theme: 'dark',
        x: {
          format: 'dd MMM yyyy HH:mm',
        },
        marker: {
          show: true,
        },
      },
      grid: {
        borderColor: 'rgba(255, 255, 255, 0.2)',
        strokeDashArray: 4,
      },
      dataLabels: {
        enabled: false,
      },
    };

    if (isCandlestick) {
      return {
        ...commonOptions,
        plotOptions: {
          candlestick: {
            colors: {
              upward: '#00B746',
              downward: '#EF403C',
            },
          },
        },
      };
    } else {
      return {
        ...commonOptions,
        colors: ['#19F6E8'],
        stroke: {
          curve: 'smooth',
          width: 3,
          colors: ['#00FFFF'],
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            gradientToColors: ['#00FFFF'],
            shadeIntensity: 1,
            type: 'vertical',
            opacityFrom: 0.5,
            opacityTo: 0.1,
            stops: [0, 90, 100],
          },
        },
        markers: {
          size: 5,
          colors: ['#FC74FF'],
          strokeWidth: 2,
          strokeColors: '#FFF',
          hover: {
            size: 8,
          },
        },
      };
    }
  }, [categories, interval, isZoomed, scaleType, chartType]);

  // Define the options for the Radio component
  const intervalOptions = [
    { value: 'hourly', label: 'H' },
    { value: 'weekly', label: 'W' },
    { value: 'biweekly', label: 'BI' },
    { value: 'monthly', label: 'M' },
    { value: 'quarterly', label: 'Q' },
    { value: 'yearly', label: 'Y' },
    { value: 'all', label: 'All' },
  ];

  // Options for scale type
  const scaleOptions = [
    { value: 'linear', label: 'Linear' },
    { value: 'logarithmic', label: 'Logarithmic' },
  ];

  // Options for chart type
  const chartTypeOptions = [
    { value: 'area', label: 'Area' },
    { value: 'candlestick', label: 'Candlestick' },
  ];

  return (
    <div
      id="data-series-chart"
      style={{
        width: '100%',
        height: '500px',
        background: 'radial-gradient(circle, #2a2d37, #1a1c23)',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 0 30px rgba(0, 255, 255, 0.2)',
      }}
    >
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        {/* Interval Selection */}
        <Radio
          options={intervalOptions}
          selectedValue={interval}
          onChange={(newValue) => {
            setInterval(newValue);
            setIsZoomed(false);
          }}
        />
        {/*<Radio
          options={scaleOptions}
          selectedValue={scaleType}
          onChange={(newValue) => setScaleType(newValue)}
        />
        <Radio
          options={chartTypeOptions}
          selectedValue={chartType}
          onChange={(newValue) => setChartType(newValue)}
        /> */}
        
      </div>
      {loading ? (
        <GlitchLoader />
      ) : error ? (
        <p style={{ textAlign: 'center', color: 'red', fontSize: '1.5rem' }}>{error}</p>
      ) : (
        <Chart options={options} series={chartData} type={chartType} height="100%" />
      )}
    </div>
  );
};

DataSeriesChart.propTypes = {
  coinId: PropTypes.string,
};

DataSeriesChart.defaultProps = {
  coinId: 'bitcoin',
};

export default DataSeriesChart;
