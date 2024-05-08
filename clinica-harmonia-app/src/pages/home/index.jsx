import React, { useEffect } from 'react';
import NavBar from '../../components/NavBar';
import HomeContent from '../../components/HomeContent';
import HomeFooter from '../../components/HomeFooter';

function Home() {
  useEffect(() => {
    document.title = 'Clínica Harmonia | Página Inicial';
  }, []);
  return (
    <>
      <NavBar />
      <HomeContent />
      <HomeFooter />
    </>
  );
}

export default Home;
