import React, { useState } from "react";
import DarkModeSwitcher from "./DarkModeSwitcher";
import logoPadrao from "../images/logo_padrao.png";
import logoDark from "../images/logo_dark.png";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false); // Estado para controlar o dropdown

  const handleCalendarioClick = () => {
    setShowDropdown(!showDropdown); // Alternar o dropdown ao clicar
  };

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center">
          <div className="header-logo dark:hidden">
            <img src={logoPadrao} className="h-24 w-36 cursor-pointer" onClick={() => navigate('/')} />
          </div>
          <div className="header-logo hidden dark:inline-block">
            <img src={logoDark} className="h-24 w-36 cursor-pointer" onClick={() => navigate('/')} />
          </div>
        
          <button
            className="ml-6 text-black dark:text-white font-semibold text-lg cursor-pointer hover:underline mt-3"
            onClick={() => navigate('/')}
          >
            Inicio
          </button>

          <div className="relative">
            <button
              className="ml-6 text-black dark:text-white font-semibold text-lg cursor-pointer hover:underline mt-3"
              onClick={handleCalendarioClick}
            >
              Calendário
            </button>
            
            {showDropdown && (
              <div className="absolute mt-2 py-2 w-48 bg-gray-800 dark:bg-boxdark bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <button
                  className="block px-4 py-2 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105 transition-transform duration-100 w-full text-left"
                  style={{ width: '250px', paddingLeft: '25px' }} 
                  onClick={() => navigate('/calendario')}
                >
                  Calendário Empresas
                </button>
                <button
                  className="block px-4 py-2 text-black dark:text-white hover:bg-gray-900 dark:hover:bg-gray-600 hover:scale-105 transition-transform duration-100 w-full text-left"
                  style={{ width: '250px', paddingLeft: '25px' }} 
                  onClick={() => navigate('/calendarioSocios')}
                >
                  Calendário Sócios
                </button>
              </div>
            )}
          </div>

          <button
            className="ml-6 text-black dark:text-white font-semibold text-lg cursor-pointer hover:underline mt-3"
            onClick={() => navigate('/clientes')}
          >
            Eventos
          </button>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DarkModeSwitcher />
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;