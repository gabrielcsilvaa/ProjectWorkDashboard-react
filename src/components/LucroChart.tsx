import React, { useEffect, useState } from "react";
import { listarEmpresas } from "../services/api.jsx";
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import '../css/satoshi.css';

const LucroChart: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const filtro = data.filter(
    (item: any) => item.status_empresa === "A",
  );
  const opossiteFilter = data.filter(
    (item: any) => item.status_empresa === "I",
  );
  const options: ApexOptions = {
    chart: {
      type: 'donut',
      background: 'transparent',
      toolbar: {
        show: false
      }
    },
    series: [41, 41],
    labels: ['Clientes Ativos', 'Clientes Inativos'],
    colors: ['#271b79', '#FD5201'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 500
        },
        legend: {
          position: 'bottom'
        },
      }
    }],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            value: {
              color: '#3F83F8', 
              fontSize: '20px',
              fontFamily: 'Arial, sans-serif',
            },
          }
        }
      }
    },
    legend: {
      position: 'top',
      fontSize: '18px',
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold',
      labels: {
        colors: ['#FFFFFF',]
      },
    },
    tooltip: {
      theme: 'dark',
      style: {
        fontSize: '20px',
        fontFamily: 'Arial, sans-serif'
      },
      y: {
        formatter: function(val) {
          return `${val} clientes`;
        }
      }
    }
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await listarEmpresas();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados da API", error);
      }
      
    };
    fetchDataAsync();
  }, []);
  const series = [filtro.length, opossiteFilter.length];

  return (
    <div className="lucro-chart">
      <ReactApexChart options={options} series={series} type="donut" />
      <div className="flex ">
        <p className="font-bold mx-auto text-center">Totais De Clientes da Office: {data.length}</p>


      </div>
    </div>
  );
};

export default LucroChart;
