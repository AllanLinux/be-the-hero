// UseEffect - Serve para disparar uma função em determinado momento do componente.
import React, { useEffect, useState } from 'react';
// Responsavel por não dar refresh na page inteira
import { Link, useHistory } from 'react-router-dom'
// Importando do react-icons o botão
import { FiPower, FiTrash2 } from 'react-icons/fi';
// Import logo
import logoImg from '../../assets/logo.svg'
// Import CSS
import './styles.css'
// Importando API
import api from '../../services/api'

export default function Profile() {
      const [incidents, setIncidents] = useState([]);
      // Buscando o nome da ong, salvo na tela de logon
      const ongName = localStorage.getItem('ongName');
      const ongId = localStorage.getItem('ongId');

      const history = useHistory();

      /**
       * api.get esta fazendo a consulta em profiles e passando o OngId no header
       * then, estou definindo a resposta
       */
      useEffect(() => {
            api.get('profile', {
                  headers: {
                        Authorization: ongId,
                  }
            }).then(response => {
                  setIncidents(response.data);
            })
      }, [ongId]);
      // incidents.map - Percorre cada um dele retornando algo salvando na variavel incident
    
      // Função para deletar caso
      async function handleDeleteIncident(id) {
            try {
                  await api.delete(`incidents/${id}`,{
                        headers: {
                              Authorization: ongId,
                        }
                  });
                  // Filtro para trazer todos os id que sejam diferente do id que foi deletado
                  setIncidents(incidents.filter(incident => incident.id !== id))
            } catch(err) {
                  alert("Erro ao deletar caso, tente novamente.")
            }
      }

      function handleLogout() {
            localStorage.clear();
            history.push('/');
      }

      return (
          <div className='profile-container'>
                <header>
                      <img src={logoImg} alt='Be The Hero' />
                      <span>
                            Bem vinda, {ongName} !
                      </span>
                      <Link className='button' to='/incidents/new'>Cadastrar novo caso
                      </Link>
                      <button onClick={handleLogout} type='button'>
                            <FiPower size={18} color='#E02041' />
                      </button>
                </header>

                <h1>Casos Cadastrados</h1>
                <ul>
                  {incidents.map(incident => (
                        <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{
                              // Usando o intl para fazer a formatação monetária
                        Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)
                        }</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type='button'>
                              <FiTrash2 width={20} color='#A8A8B3' />
                        </button>
                  </li>
                  ))}      
                </ul>

          </div>
    )
};