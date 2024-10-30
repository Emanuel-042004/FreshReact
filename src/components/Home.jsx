//eslint-disable-next-line no-unused-vars
import React  from 'react';
import Navbar from './Navbar';
import cover from '../assets/cover.png';
import {  CoverImage} from '../styles/Home'; 

const Home = () => {

  return (
    <div>
      <Navbar />
      <CoverImage src={cover} alt="Cover" />
     
    </div>
  );
}

export default Home;