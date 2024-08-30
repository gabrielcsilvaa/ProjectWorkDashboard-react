import React from "react";
import BolinhaPiscando from "./GreenCircle.tsx";
import { useNavigate } from 'react-router-dom';

interface CardDataStatsProps {
  title: string;
  value: number | string;
  dataCadastro: string | null;
  Cardimg: any;
  online: any;
}

const Card: React.FC<CardDataStatsProps> = ({
  title,
  value,
  dataCadastro,
  Cardimg,
  online,
}) => {

  return (
    <div
      className="h-cardnew w-310px rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark cursor-pointer" // Adicionar cursor-pointer para indicar que é clicável
    >
      <div className="flex items-end justify-between">
        <div>{Cardimg}</div>
        <div>
          <div className="h-20 w-45">
            <h4 className="ml-7.5 mt-4 text-base font-semibold text-black dark:text-white">
              {value}
            </h4>

            <div className="ml-8 mt-2 h-30 w-39">
              <div className="flex items-end justify-between">
                <span className="flex-auto text-sm font-medium">{title}</span>
                <div className="flex-auto">
                  <BolinhaPiscando Bolinha={online} />
                </div>
              </div>
            </div>
            <h5 className="mt-4 text-title-sm font-medium text-black dark:text-white">
              {dataCadastro}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
