import { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

export interface Props {
    data: number[]
}

const VerticalBars = (props: Props) => {
  const data = props.data;
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const chartCanvas = chartRef.current!.getContext('2d');

    const chart = new Chart(chartCanvas!, {
      type: 'bar',
      data: {
        labels: data.map((_, index) => index + 1),
        datasets: [
          {
            label: 'Vertical Bars',
            data: data,
            backgroundColor: '#4caf50',
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
  }, []);

  return <div style={{width: 360, margin: "0 auto"}}>
      <canvas ref={chartRef} />
    </div>;
};

export default VerticalBars;
