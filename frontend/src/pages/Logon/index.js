import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'

import api from '../../services/api'

import './styles.css'

import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

import {FiLogIn} from 'react-icons/fi'

export default function Logon() {
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')

  const history = useHistory()

  //Função para logar
  async function handleLogin(e) {
    e.preventDefault()

    try {
      const response = await api.post('sessions', {email, password})
      //Deixando no localstorage para ficar disponivel para toda a aplocação
      localStorage.setItem('ongId', response.data.id)
      localStorage.setItem('ongName', response.data.name)
      localStorage.setItem('ongEmail', email)

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

          <input placeholder="Seu e-mail" value={email} onChange={e => setEmail(e.target.value)}/>
          <input placeholder="Sua senha" value={password} onChange={e => setPassword(e.target.value)}/>

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