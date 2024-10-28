// src/components/CryptoChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import 'chartjs-adapter-date-fns';

// Register the necessary components for the time scale
ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip, Legend);

const CryptoChart = ({ coinId = 'bitcoin', days = 30 }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
          {
            params: {
              vs_currency: 'usd',
              days: days,
              interval: 'daily'
            }
          }
        );

        const prices = response.data.prices.map((price) => ({
          x: new Date(price[0]), // Convert timestamp to Date object
          y: price[1]
        }));

        setChartData({
          datasets: [
            {
              label: `${coinId} Price (USD)`,
              data: prices,
              fill: false,
              borderColor: 'blue',
              tension: 0.1
            }
          ]
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setLoading(false);
      }
    };

    fetchChartData();
  }, [coinId, days]);

  if (loading) return <p>Loading chart...</p>;

  return (
    <div>
      <h2>Price Chart for {coinId}</h2>
      <Line
        data={chartData}
        options={{
          scales: {
            x: {
              type: 'time', // Set x-axis as a time scale
              time: {
                unit: 'day' // Display unit
              }
            },
            y: {
              beginAtZero: false
            }
          }
        }}
      />
    </div>
  );
};

export default CryptoChart;
