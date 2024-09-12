import React, { useEffect, useState } from "react";
import { listarEmpresas, processData, consultaAniversario, consultaEventos, consultaAniversarioSocio } from "../services/api.jsx";
import Card from "../components/Card.js";
import Card2 from "../components/Card2.js";
import DefaultLayout from "../layout/DefautLayout.js";
import ChartEvento379e380 from "../components/ChartEvento379e380.tsx";
import {
  CakeIcon,
  UserGroupIcon,
  UserPlusIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ListBulletIcon,
  UserCircleIcon
}
  from "@heroicons/react/24/solid";
import LucroChart from "../components/LucroChart.tsx";
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Dashboard: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [BirhtdayData, setBirthday] = useState<any>();
  const [socioAniversario, setSocio] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [dataconv, setDataconv] = useState<any[]>([]);
  const [eventos, setEventos] = useState<any[]>([]);
  const [contador, setContador] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.clientId) {
      const clientId = location.state.clientId;
      console.log('ID do cliente selecionado:', clientId);
      // Aqui recebe o ID selecionado na rota /clientes
    }
  }, [location.state]);

  const incrementarContador = () => {
    if (contador + 3 < eventos.length) {
      setContador(contador + 1);
    }
  };
  const DiminuirContador = () => {
    if (contador > 0) {
      setContador(contador - 1);
    }
  };

  const filtro = data.filter(
    (item: any) => item.status_empresa === "A");

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  const currentMonthName = monthNames[currentMonth - 1];
  const filteredData = data.filter((item: any) => {
    if (!item.data_cadastro) { 
      return false;
    }
    const [day, month, year] = item.data_cadastro.split('/').map(Number);
    return month === currentMonth && year === currentYear;
  });
  const lastClients = filteredData
    .map(client => client.razao_social);

  useEffect(() => {
    const BirthdayData = async () => {
      try {
        const data = await consultaAniversario();
        console.log(data)
        setBirthday(data);
      } catch (error) {
        console.error("Erro ao buscar dados da API", error);
      }
    };
    BirthdayData();
  }, []);

  useEffect(() => {
    const AniversarioSocios = async () => {
      try {
        const data = await consultaAniversarioSocio();
        console.log(data)
        setSocio(data);
      } catch (error) {
        console.error("Erro ao buscar dados da API", error);
      }
    };
    AniversarioSocios();
  }, []);

  function parseValue(value) {
    if (
      value === 'sem informações' ||
      value === undefined ||
      value === Infinity ||
      Number.isNaN(parseFloat(value))
    ) {
      return -Infinity; // Tratar como valor inexistente ou inválido
    }
    return parseFloat(value);
  }

  useEffect(() => {

    const Eventos379e380 = async () => {
      try {
        const data = await consultaEventos();
        const organizedData = data.sort((a, b) => {
          const maxA = (a.valor379 !== undefined || a.valor380 !== undefined)
            ? Math.max(parseValue(a.valor379), parseValue(a.valor380))
            : -Infinity;
          const maxB = (b.valor379 !== undefined || b.valor380 !== undefined)
            ? Math.max(parseValue(b.valor379), parseValue(b.valor380))
            : -Infinity;

          if (maxA === -Infinity && maxB !== -Infinity) return 1;
          if (maxB === -Infinity && maxA !== -Infinity) return -1;

          if (maxA === Infinity) return 1;
          if (maxB === Infinity) return -1;

          // Ordem decrescente
          return maxB - maxA;
        });
        console.log(organizedData)
        setEventos(organizedData);
      } catch (error) {
        console.error("Erro ao buscar dados da API", error);
      }
    };
    Eventos379e380();
  }, []);


  /*IMAGENS*/
  const logo = (imagem) => {
    if (imagem == 1)
      return (
        <UserGroupIcon className="text-azullogo size-20 stroke-black dark:stroke-white dark:text-boxdark" />
      );
    if (imagem == 2)
      return (
        <CakeIcon className="text-laranjalogo size-19 stroke-black dark:stroke-white dark:text-boxdark" />
      );
    if (imagem == 3)
      return (
        <UserCircleIcon className="text-verdecalendario size-19 stroke-black dark:stroke-white dark:text-boxdark" />
      );
    if (imagem == 4)
      return (
        <UserPlusIcon className="text- size-19 stroke-black dark:stroke-white dark:text-boxdark" />
      );
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


  useEffect(() => {
    const processDataAsync = async () => {
      const dataconv = await processData(data);
      setDataconv(dataconv);
    };
    processDataAsync();
  }, [data]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent" />
      </div>
    );
  }
  return (
    <DefaultLayout>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <Card
          value={filtro.length} // para ver o total é so colocar data
          title="Total de clientes"
          Cardimg={logo(1)}
          dataCadastro=""
          online={true}
        />
        <Card
          value={`${BirhtdayData.length} ${BirhtdayData.length == 1 ? "Empresa" : "Empresas"}`}
          dataCadastro={""}
          title={`${BirhtdayData.length == 1 ? "Completa aniversário hoje" : "Completam aniversário hoje"} `}
          Cardimg={logo(2)}
          online={false}
        />
        <Card
          value={`${socioAniversario.length} ${socioAniversario.length == 1 ? "Socio" : "Socios"}`}
          title={`${socioAniversario.length == 1 ? "Completa aniversário hoje" : "Completam aniversário hoje"} `}
          Cardimg={logo(3)}
          dataCadastro=""
          online={false}
        />
        <Card
          value={`Novos Clientes: ${lastClients.length}`}
          title={`No mês de ${currentMonthName} recebemos ${lastClients.length} clientes`}
          Cardimg={logo(4)}
          dataCadastro=""
          online={false}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:mt-6 md:grid-cols-1 md:gap-6 xl:grid-cols-3 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-2 rounded-sm border border-stroke bg-white px-9 py-1 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center justify-between max-w-200  p-1 bg-gray-100 rounded-md">

            <Card2 title="" informacao="EVENTO 379 E 380" />
            <div className="flex justify-end mt-3">
              <button className="mr-2 flex items-center bg-laranjalogo text-white px-3 py-2 rounded-lg shadow hover:bg-laranjahover transition" onClick={DiminuirContador}><ArrowLeftIcon className="h-5 w-5 mr-1" /></button>
              <button className="mr-2 flex items-center bg-laranjalogo text-white px-3 py-2 rounded-lg shadow hover:bg-laranjahover transition" onClick={incrementarContador}><ArrowRightIcon className="h-5 w-5 mr-1" /></button>
              <Link to="/clientes">
                <button
                  className="mr-2 flex items-center bg-laranjalogo text-white px-3 py-2 rounded-lg shadow hover:bg-laranjahover transition"
                  onClick={() => navigate('/clientes')}
                >
                  <ListBulletIcon className="h-5 w-5 mr-1" />
                </button>
              </Link>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center font-bold">
            <div className="bg-laranjalogo mr-2 h-5 w-5 rounded-full"></div>
            <h1 className="mr-20">EVENTO 379</h1>
            <div className="bg-azullogo mr-2 h-5 w-5 rounded-full"></div>
            <h2>EVENTO 380</h2>
          </div>

          <div className=" place-items-end grid grid-cols-3 text-black-2 dark:text-white">
            <ChartEvento379e380
              valor1={eventos[contador].valor379}
              valor2={eventos[contador].valor380}
              empresa={eventos[contador].nome}
              sobrou379={eventos[contador].sobra379}
              sobrou380={eventos[contador].sobra380} />
            <ChartEvento379e380
              valor1={eventos[contador + 1].valor379}
              valor2={eventos[contador + 1].valor380}
              empresa={eventos[contador + 1].nome}
              sobrou379={eventos[contador + 1].sobra379}
              sobrou380={eventos[contador + 1].sobra380} />
            <ChartEvento379e380
              valor1={eventos[contador + 2].valor379}
              valor2={eventos[contador + 2].valor380}
              empresa={eventos[contador + 2].nome}
              sobrou379={eventos[contador + 2].sobra379}
              sobrou380={eventos[contador + 2].sobra380} />
          </div>
        </div>
        <div className="rounded-sm border border-stroke bg-white px-10 py-1 shadow-default dark:border-strokedark dark:bg-boxdark">
          <Card2
            title="Mostrando a distribuição atual da base de clientes da office"
            informacao="Resumo de Clientes Ativos/Inativo" />
          <div className="mt-10 text-black-2 dark:text-white">
            <LucroChart />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;