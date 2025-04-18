
import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-sport-blue border-r-transparent border-b-sport-blue border-l-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sport-darkgray font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
