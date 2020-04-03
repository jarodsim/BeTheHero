import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

import api from '../../services/api'

import './styles.css'

export default function Profile() {
  const [incidents, setIncidents] = useState([])
  const ongName = localStorage.getItem('ongName')
  const ongId = localStorage.getItem('ongId')
  const history = useHistory()


  /**
   * Recebe dois parâmetros. O segundo parâmetro é quando essa operação será
   *  executada
   */
  useEffect(() => {
    api.get('profile', {
      headers: {
        authorization: ongId
      }
    }).then(response => {
      setIncidents(response.data)
    })
  }, [ongId])

  //Função para deletar incidente
  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          authorization: ongId
        }
      })

      //Para exibir dados atualizados após a deleção de alguns
      setIncidents(incidents.filter(incident => incident.id !== id))
    } catch (error) {
      alert('Error ao deletar o caso, tente novamente')
    }
  }

    //Função para deletar a ONG
    async function hendleDeleteOng() {
      try {
        await api.delete(`profile/`, {
          headers: {
            authorization: ongId
          }
        })

        handleLogout()
      } catch (error) {
        alert('Erro ao tentar deletar a ONG')
      }
    }

  //Função para logout
  function handleLogout() {
    localStorage.clear()
    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem Vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <Link className="button" onClick={hendleDeleteOng}>Deletar conta</Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={16} color={"#e02041"} />
        </button>
      </header>
      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          /**
           * Key será uma identificão pra qual item é qual, útil para na hora que * for ser deletado
           */
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>
            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>
            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button type="button">
              <FiTrash2 size={20} color={"a8a8b3"} onClick={() => handleDeleteIncident(incident.id)} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}