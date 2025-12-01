
import React from 'react';
import Header from './components/Header';
import Calculator from './components/Calculator';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-stone-800 bg-stone-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-amber-200/30 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-2/3 h-2/3 bg-amber-200/20 rounded-full filter blur-3xl opacity-40 animate-pulse animation-delay-2000"></div>
      </div>
      
      <div className="flex-grow flex flex-col">
        <Header />
        <main className="container mx-auto px-4 py-2 sm:py-8 flex-grow">
            <Calculator />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
