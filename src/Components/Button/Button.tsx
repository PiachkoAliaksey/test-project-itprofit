import React from "react";

import './style.scss'

interface IButton {
  open:React.Dispatch<React.SetStateAction<boolean>>
}

const Button:React.FC<IButton> = ({open})=>{

  const handleModal = ()=>{
    open(true)
  }
  return(
    <button onClick={()=>handleModal()} className="base-style-btn"> Open modal window</button>
  )
}

export default Button;
