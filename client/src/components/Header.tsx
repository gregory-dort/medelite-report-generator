import React from 'react';

interface HeaderProps {
    state?: string;
}

const Header: React.FC<HeaderProps> = ({ state }) => {
    return (
         <div className="bg-white rounded-xl shadow-md p-6 mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-700 tracking-wide">INFINITE - Managed by MEDELITE</h1>
          <h2 className="text-lg font-semibold mt-2 text-gray-700">FACILITY ASSESSMENT SNAPSHOT</h2>
          {state && (
            <p className="text-md font-medium mt-1 text-gray-700">{state}</p>
          )}
        </div>
    );
};

export default Header;