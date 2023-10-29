import React, { Component, useEffect, useContext, createContext, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import FormCallBack from './Components/FormCallBack/FormCallBack';
import Button from './Components/Button/Button';
import ModalWindow from './Components/ModalWindow/ModalWindow';




import './sass/style.scss';


function App() {
  const [isOpen,setIsOpen] = useState(false);

  useEffect(() => {
    if(isOpen) document.body.style.overflow = 'hidden';
 }, [isOpen]);

  return (
    <>
      <FormCallBack/>
      <Button open={setIsOpen}/>
      {isOpen&&<ModalWindow open={setIsOpen} isOpen ={isOpen}/>}
    </>
  )
}

export default App;
