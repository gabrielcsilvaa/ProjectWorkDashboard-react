import React /* ReactNode */ from "react";

interface CardDataStatsProps {
  title: string;
  informacao: string;
}

const Card4_5: React.FC<CardDataStatsProps> = ({ title, informacao }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-end justify-between">
        <div>
          <div>
            <h4 className="text-lg font-semibold text-black dark:text-white">
              {informacao}
            </h4>
          </div>
          <div className="mt-4">
            <span className="text-sm font-medium">{title}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card4_5;
