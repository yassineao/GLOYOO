import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const DataSeriesChart = ({ coinId = 'bitcoin', days = 7 }) => {
  const [chartData, setChartData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = '35701ffd-c0bb-4deb-80e7-947e91e96e4e'; // Replace with your actual API key

  useEffect(() => {
    const fetchCoinData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          'https://api.livecoinwatch.com/coins/single/history',
          {
            code: coinId.toUpperCase(),
            currency: 'USD',
            start: Date.now() - days * 24 * 60 * 60 * 1000,
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

        const prices = response.data.history.map((point) =>
          parseFloat(point.rate.toFixed(4))
        );
        const dates = response.data.history.map((point) =>
          new Date(point.date).toLocaleDateString('en-US', {
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
      },
      background: 'linear-gradient(145deg, #1d1f27, #222835)', // Holographic-like background
      foreColor: '#FFF',
    },
    colors: ['#19F6E8'],
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: '#8AFCFF', // Neon light blue
          fontSize: '12px',
        },
      },
      axisBorder: {
        show: true,
        color: '#8AFCFF',
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#FC74FF', // Neon magenta
          fontSize: '12px',
        },
      },
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      x: {
        format: 'dd MMM',
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
    stroke: {
      curve: 'smooth',
      width: 3,
      colors: ['#00FFFF'],
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['#00FFFF'], // Neon cyan glow
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

  return (
    <div
      id="data-series-chart"
      style={{
        width: '100%',
        height: '500px',
        background: 'radial-gradient(circle, #2a2d37, #1a1c23)', // Glow effect for container
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 0 30px rgba(0, 255, 255, 0.2)',
      }}
    >
      {loading ? (
        <p style={{ textAlign: 'center', color: '#00FFFF', fontSize: '1.5rem' }}>
          Loading futuristic data...
        </p>
      ) : error ? (
        <p style={{ textAlign: 'center', color: 'red', fontSize: '1.5rem' }}>
          {error}
        </p>
      ) : (
        <Chart options={options} series={chartData} type="area" height="100%" />
      )}
    </div>
  );
};

export default DataSeriesChart;
