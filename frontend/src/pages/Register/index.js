import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

import {FiArrowLeft} from 'react-icons/fi'

import './styles.css'

export default function Register() {
  //Variáveis para guardar os dados
  const [name,
    setName] = useState('')
  const [email,
    setEmail] = useState('')
  const [whatsapp,
    setWhatsapp] = useState('')
  const [city,
    setCity] = useState('')
  const [uf,
    setUf] = useState('')

  const history = useHistory()

  //Função para o registro via axios
  async function handleRegister(e) {
    e.preventDefault()

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    }
    try {
      //Enviando os dados para a api e retornando o id de sucesso
      const response = await api.post('ongs', data)

      alert(`Seu ID de acesso: ${response.data.id}`)

      //Voltando o user para a página de  login
      history.push('/')
    } catch (err) {
      alert('Error no cadastro, tente novamente')
    }

  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Logo_BeTheHrro"/>

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos
            da sua ONG</p>

          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color={"#E02041"}/>
            Voltar para o logon</Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}
            required/>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required/>
          <input
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
            required/>

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
              required/>
            <input
              placeholder="UF"
              style={{
              width: 80
            }}
              value={uf}
              onChange={e => setUf(e.target.value)}
              required/>
          </div>

          <button type="submit" className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}