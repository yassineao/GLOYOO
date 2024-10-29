import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const DataSeriesChart = ({ coinId = 'bitcoin', days = 7 }) => {
  const [chartData, setChartData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
          {
            params: {
              vs_currency: 'usd',
              days: days,
              interval: 'daily',
            },
          }
        );

        const prices = response.data.prices.map((price) =>
          parseFloat(price[1].toFixed(4)) // Limit to four decimal places
        );
        const dates = response.data.prices.map((price) =>
          new Date(price[0]).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
          })
        );

        setChartData([
          {
            name: `${coinId} Price (USD)`,
            data: prices,
          },
        ]);
        setCategories(dates);
      } catch (error) {
        console.error('Error fetching coin data:', error);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [coinId, days]);

  const options = {
    chart: {
      type: 'area',
      height: '100%',
      fontFamily: 'Inter, sans-serif',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ['#00FFC8'],
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: '#00FFFF', // Neon cyan
          fontFamily: 'Orbitron, sans-serif',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#FF00FF', // Neon pink
          fontFamily: 'Orbitron, sans-serif',
        },
      },
    },
    tooltip: {
      enabled: true,
      x: {
        format: 'dd MMM',
      },
      theme: 'dark',
    },
    grid: {
      borderColor: '#444',
      strokeDashArray: 5,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
  };

  return (
    <div id="data-series-chart" style={{ width: '100%', height: '400px' }}>
      {loading ? (
        <p style={{ textAlign: 'center', color: '#fff' }}>Loading...</p>
      ) : error ? (
        <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
      ) : (
        <Chart options={options} series={chartData} type="area" height="100%" />
      )}
    </div>
  );
};

export default DataSeriesChart;
