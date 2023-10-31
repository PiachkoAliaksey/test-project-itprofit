import React, { useEffect, useState } from "react";
import { InputMask, useMask } from '@react-input/mask';
import { withMask } from 'use-mask-input';
import isValidEmail from "../../utils/checkValidemail";
import { URL_SERVER } from "../../api/api";

import './style.scss';



const FormCallBack = () => {
  const inputRef = useMask({ mask: '+0 (___) ___-__-__', replacement: { _: /\d/ } });

  const baseState = [
    { title: 'Name', description: '' },
    { title: 'Email', description: '' },
    { title: 'Number', description: '' },
    { title: 'Text', description: '' },
  ]

  const [formData, setFormData] = useState(baseState);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isValid, setIsValid] = useState(false);
  console.log(isDisabled)
  console.log(isValid)


  const handleOnChangeInput = (e: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (+e.currentTarget.id === 1) {
      const isValidField: boolean = isValidEmail(e.currentTarget.value.trim().toLowerCase());
      setIsValid(isValidField);
    }
    const fields = [...formData];
    fields[+e.currentTarget.id]['description'] = e.currentTarget.value;
    setFormData(fields);

    setIsDisabled(!formData.every((item) => item.description.length > 0))

  }

  async function handleSubmitForm(e: React.SyntheticEvent) {
    e.preventDefault();
    await fetch(`${URL_SERVER}/api/form`, {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "name": formData[0].description, "email": formData[1].description, "number": formData[2].description, "text": formData[3].description })
    }).then((response) => {
      if (response.ok) {

        console.log({
          "status": "success",
          "msg": "Ваша заявка успешно отправлена"
        })
        const data = [...formData].map(item => {
          return { title: item.title, description: '' }
        })
        setIsDisabled(!formData.every((item) => item.description.length > 0))
        setFormData(data);
        return response.json();
      }
      throw new Error();
    })
      .then((responseJson) => {

      })
      .catch((error) => {
        console.log({
          "status": "error",
          "fields": {
            "inputName": `${error.message}`
          }
        })
      });


  }



  return (
    <div className="main-block-form">
      <h2>Form call back</h2>
      <form onSubmit={(e) => handleSubmitForm(e)} className="base-style-form">
        <div className="base-style-block">
          <input required id='0' onChange={(e) => handleOnChangeInput(e)} value={formData[0].description} className={`base-style-input ${formData[0].description.length === 0 ? 'errorBorder' : ''}`} type="text" placeholder="Name" />
          {formData[0].description.length === 0 ? (<span style={{ color: 'red' }}>{formData[0].title} is required</span>) : ('')}
        </div>
        <div className="base-style-block">
          <input required id='1' onChange={(e) => handleOnChangeInput(e)} value={formData[1].description} className={`base-style-input ${formData[1].description.length === 0 ? 'errorBorder' : ''}`} type="email" placeholder="e-mail" />
          {formData[1].description.length === 0 ? (<span style={{ color: 'red' }}>{formData[1].title} is required</span>) : (isValidEmail(formData[1].description.trim().toLowerCase()) ? ('') : (<span style={{ color: 'red' }}>{formData[1].title} is not valid</span>))}
        </div>
        <div className="base-style-block">
          <input ref={inputRef} required id='2' onChange={(e) => handleOnChangeInput(e)} value={formData[2].description} className={`base-style-input ${formData[2].description.length === 0 ? 'errorBorder' : ''}`} type="text" placeholder="tel.number" />
          {formData[2].description.length === 0 ? (<span style={{ color: 'red' }}>{formData[2].title} is required</span>) : ('')}
        </div>
        <div className="base-style-block">
          <textarea required id='3' onChange={(e) => handleOnChangeInput(e)} value={formData[3].description} className={`base-style-textarea ${formData[3].description.length === 0 ? 'errorBorder' : ''} `} placeholder="Type some text..."></textarea>
          {formData[3].description.length === 0 ? (<span style={{ color: 'red' }}>{formData[3].title} is required</span>) : ('')}
        </div>
        <button disabled={isDisabled && !isValid} className={isDisabled ? 'base-style-button-dis' : "base-style-button"} type="submit">Submit</button>
      </form>

    </div>
  )
}

export default FormCallBack;
