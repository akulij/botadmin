import { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

export type BarData = {
    chart_name: string;
    labels: string[];
    data: number[];
}

export interface Props {
    data: BarData
}

const VerticalBars = (props: Props) => {
  const data = props.data;
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const chartCanvas = chartRef.current!.getContext('2d');

    const chart = new Chart(chartCanvas!, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: data.chart_name,
            data: data.data,
            backgroundColor: '#1677ff',
          },
        ],
      },
      options: {
        scales: {
        },
      },
    });
    return () => {
        chart.destroy();
    }
  }, [data]);

  return <div style={{width: 360}}>
      <canvas ref={chartRef} />
    </div>;
};

export default VerticalBars;
