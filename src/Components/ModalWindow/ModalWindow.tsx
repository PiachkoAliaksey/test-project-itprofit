import React from "react";

import './style.scss'

interface IModalWindow{
  open:React.Dispatch<React.SetStateAction<boolean>>,
  isOpen:boolean
}

const ModalWindow:React.FC<IModalWindow> = ({open,isOpen})=>{
  return(
    <>
    <div className="darkBG"></div>
    <div className={`darkBGtext ${isOpen?'darkBGtextStart':''}`}>
      <span>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making</span>
      <button onClick={()=>open(false)}>Close modal</button>
    </div>
    </>

  )
}

export default ModalWindow;
