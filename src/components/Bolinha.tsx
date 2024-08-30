import React from 'react';

interface BolinhaProps {
    color: string; // Defina o tipo de propriedade color como uma string
  }
  
  const Bolinha: React.FC<BolinhaProps> = ({ color }) => {
    return (
      <div className="w-5 h-5 bg-verdelimao rounded-full"></div>
    );
  };
  
  export default Bolinha;