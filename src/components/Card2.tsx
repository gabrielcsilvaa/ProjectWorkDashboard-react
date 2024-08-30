import React /* ReactNode */ from "react";

interface CardDataStatsProps {
  title: string;
  informacao: string;
}


const Card2: React.FC<CardDataStatsProps> = ({ title, informacao }) => {
  return (
    <div>
      <h1 className="text-lg font-semibold text-black dark:text-white">
              {informacao}
            </h1>
      <span className="text-sm font-medium">{title}</span>
      <div className="flex items-end justify-between">
        
      </div>
    </div>
  );
};

export default Card2;

