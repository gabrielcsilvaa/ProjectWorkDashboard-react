import React, { useEffect, useState } from 'react';
import DefaultLayout from '../layout/DefautLayout'; // Verifique se o caminho está correto
import CalendarComponent from '../components/CalendarComponent';

const Calendar: React.FC = () => {
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Ajuste o tempo conforme necessário
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <DefaultLayout>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-2 mt-2">Calendário</h1>

        <div className="bg-white px-10 py-3 text-black-2 shadow-default dark:border-strokedark dark:bg-boxdark dark:text-white">
          <CalendarComponent />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Calendar;