import React from 'react';

interface BolinhaPiscando{
  Bolinha:boolean;
}

const BolinhaPiscando=({Bolinha}) => {
  const validacao = Bolinha
  if (validacao === true){
    return (
      <div className='ml-0'>
        <div className="w-4 h-4 bg-green-500 rounded-full animate-piscar ml-0 mt-0 "></div>
      </div>
    );
  }else{
      return (
        <div>
          <div className="w-4 h-4 bg-green-500 rounded-full animate-piscar ml-10 mt-0 hidden"></div>
        </div>
      );
    }
};

export default BolinhaPiscando;