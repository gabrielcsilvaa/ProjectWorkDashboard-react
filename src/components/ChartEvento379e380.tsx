import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import '../css/satoshi.css';

interface ChartProps {
  valor1: number;
  valor2: number;
  empresa: string;
  sobrou379: number;
  sobrou380: number;
}
function valueToPercent(value1: number, value2: number): number[] {
  return [Math.round((value1 * 100) / 100), Math.round((value2 * 100) / 100)];
}

const ChartEvento379e380: React.FC<ChartProps> = ({ valor1, valor2, empresa, sobrou379, sobrou380 }) => {
  const nomeEmpresa = empresa;
  const chartOptions: ApexOptions = {
    series: valueToPercent(valor2, valor1),

    chart: {
      height: 350,
      type: 'radialBar',
    },

    plotOptions: {
      radialBar: {
        track: {
          show: true,
          startAngle: undefined,
          endAngle: undefined,
          background: '#f2f2f2',
          strokeWidth: '80%',
          opacity: 0.5,
          margin: 2,
          dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            blur: 7,
            opacity: 0.5,
          },
        },

        dataLabels: {
          name: {
            fontSize: '14px',
          },
          value: {
            fontSize: '16px',
          },

          total: {
            show: true,
            label: 'Eventos',
            fontSize: '14px',
            fontFamily: 'IMPACT',
            fontWeight: 600,

            formatter: function (w) {
              // Você pode personalizar o valor retornado aqui
              return '';
            },
          },
        },
      },
    },
    labels: ['EVENTO 380', 'EVENTO 379'],
    colors: ['#271b79', '#FD5201'],
  };
  const resposta379 = sobrou380 < 0 ? "Passou" : "Faltam";
  const resposta380 = sobrou379 < 0 ? "Passou" : "Faltam";
  return (
    <div className="">
      <h2 className="mt-5 text-center">{nomeEmpresa}</h2>
      <ReactApexChart
        options={chartOptions}
        series={chartOptions.series}
        type="radialBar"
        height={350}
      />
      <h3 className="flex items-center justify-center font-satoshi">
        <p className="mr-2 font-bold">380</p> {resposta379}: R$:{sobrou380}
      </h3>
      <h4 className="flex items-center justify-center font-satoshi">
        <p className="mr-2 font-bold">379</p> {resposta380}: R$:{sobrou379}
      </h4>
    </div>
  );
};

export default ChartEvento379e380;