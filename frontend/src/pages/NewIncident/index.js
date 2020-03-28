import React, {useState} from 'react'

import api from '../../services/api'

import './styles.css'

import {Link, useHistory} from 'react-router-dom'

import {FiArrowLeft} from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

export default function NewIncident() {
  const [title,
    setTitle] = useState('')
  const [description,
    setDescription] = useState('')
  const [value,
    setValue] = useState('')

  const ongId = localStorage.getItem('ongId')

  const history = useHistory()

  //Função para adicionar novo incident
  async function handlerNewincident(e) {
    e.preventDefault()

    const data = {
      title,
      description,
      value
    }

    try {
      await api.post('incidents', data, {
        headers: {
          authorization: ongId
        }
      })

      alert('Caso adicionado com sucesso!')
      history.push('/profile')
    } catch (error) {
      alert('Error, não foi possível adicionar o caso, tente novamente')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Logo_BeTheHrro"/>

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color={"#E02041"}/>
            Voltar para home</Link>
        </section>

        <form onSubmit={handlerNewincident}>
          <input
            placeholder="Título"
            value={title}
            onChange={e => setTitle(e.target.value)}/>
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}/>
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}/>

          <button type="submit" className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}
