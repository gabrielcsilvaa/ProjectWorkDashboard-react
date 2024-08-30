import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ComboChart: React.FC = () => {

  const usuario1 = [ 45,  45, 45, 45, 45];
  const usuario2 = [ 20,  91, 20, 91, 20];
  const usuario3 = [ 74, 74, 74, 74, 74];
  const usuario4 = [ 91,  20, 91, 20, 91];
  const usuario5 = [ 45,  45, 45, 45, 45];
  const maxValue = Math.max(...usuario1, ...usuario2, ...usuario3, ...usuario4, ...usuario5);
  const options: ApexCharts.ApexOptions = {
    chart: {
      height: 350,
      type: 'bar',
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#4169E1', '#FFA500', '#32CD32','#FF4500','#800080'],
    stroke: {
      width: [4, 4, 4],
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
      },
    },
    xaxis: {
      categories: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
    },
    yaxis: [
      {
        title: {
          text: 'HORAS',
        },
        min: 0,
        max: maxValue ,
      },
      {
        opposite: true,
        title: {
          text: 'DIAS',
          
        },
        min: 0,
        max: (maxValue),
        tickAmount: 4.3,
        labels: {
          
          formatter: (value) => `${Math.round(value/24)}d`,
        },
      },
    ],
    tooltip: {
      shared: false,
      intersect: true,
      x: {
        show: false,
      },
    },
    legend: {
      horizontalAlign: 'left',
      offsetX: 40,
    },
  };

  const series = [
    {
      name: 'leticia',
      type: 'bar',
      data: usuario1,
    },
    {
      name: 'mateus',
      type: 'bar',
      data: usuario2,
    },
    {
      name: 'joao',
      type: 'bar',
      data: usuario3,
    },
    {
      name: 'teste',
      type: 'bar',
      data: usuario4,
    },
    {
      name: 'Funcionário 5',
      type: 'bar',
      data: usuario5,
    },
    
  ];

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default ComboChart;
