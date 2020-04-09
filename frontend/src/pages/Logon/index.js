// Importando o React
import React, { useState } from 'react';
// Importando do react-icons o botão de Login
import { FiLogIn } from 'react-icons/fi';
// Link - Responsavel por não dar refresh na page inteira
// useHistory - Levar a informação de pagina para outra, tp salvar uma variavel para disponibilizar em outra pagina
import { Link, useHistory } from 'react-router-dom'
// Import API
import api from '../../services/api'
// Import o css 
import './styles.css';

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        // Evita o redirect
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id })

            // Salvando no storage do navegador o id e name da ong, disponivel em outras telas
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            console.log(response.data.name);

            // Enviando os dados para pagina profile
            history.push('/profile');
        }
        catch (err) {
            alert('Falha no login, tente mais tarde.');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
        
    );
}