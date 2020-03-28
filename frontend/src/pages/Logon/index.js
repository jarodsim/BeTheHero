import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'

import api from '../../services/api'

import './styles.css'

import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

import {FiLogIn} from 'react-icons/fi'

export default function Logon() {
  const [id,
    setId] = useState('')

  const history = useHistory()

  //Função para logar
  async function handleLogin(e) {
    e.preventDefault()

    try {
      const response = await api.post('sessions', {id})

      //Precisa ter disponível em toa a aplicação
      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', response.data.name)

      history.push('/profile')
    } catch (error) {
      alert('Falha no login, tente novamente')
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="logo"/>

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)}/>

          <button type="submit" className="button">Entrar</button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color={"#E02041"}/>
            Não tenho cadastro</Link>
        </form>
      </section>

      <img src={heroesImg} alt="heroes"/>
    </div>
  )
}