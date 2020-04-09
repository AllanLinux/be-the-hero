import React, {useState} from 'react';
// Responsavel por não dar refresh na page inteira
import { Link, useHistory } from 'react-router-dom'
// Importando do react-icons o botão de Login
import { FiArrowLeft } from 'react-icons/fi';
// Import API
import api from '../../services/api'
// Import CSS
import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function Register() {
    // Usando o useState para armazenar o valor dos input
    const [name, setName] =  useState('');
    const [email, setEmail] =  useState('');
    const [whatsapp, setWhatsapp] =  useState('');
    const [city, setCity] =  useState('');
    const [uf, setUf] =  useState('');

    // Para levar o usuário a página anterior
    const history = useHistory();

    /**
     * Função reponsavel por fazer cadastro do usuário
     * Recebe e como evento e não dá refresh na page quando
     * Quando usado await, precisa usar o async no inicio da função
     **/
    async function handleRegister(e) {
        e.preventDefault();
        // Salvando os dados em data e enviando para api
        try {
            const data = {name,email,whatsapp,city,uf};
            const response = await api.post('ongs', data);
            // Pegando o ID de resposta da API e retornando para o usuario
            alert(`Seu ID de acesso: ${response.data.id}`);
            // Levando o usuário para rota padrão, raiz
            history.push('/');
        } 
        catch (err) {
            alert('Erro no cadastro, tente novamente.')
        }
    }
    return (
        <div className="register-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be The Hero" />

                <h1>Cadastro</h1>
                <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                <Link className="back-link" to="/">
                    <FiArrowLeft size={16} color="#E02041" />
                    Não tenho cadastro
                </Link>
            </section>
            <form onSubmit={handleRegister}>
                <input 
                    placeholder="Nome da ONG"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input 
                    type="email" 
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                />
                <input 
                    placeholder="WhatsApp"
                    name={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)} 
                />

                <div className="input-group">
                <input 
                    placeholder="Cidade"
                    name={city}
                    onChange={e => setCity(e.target.value)}
                 />
                <input 
                    placeholder="UF" 
                    name={uf}
                    onChange={e => setUf(e.target.value)}
                    style={{ width: 80 }}
                />
                </div>

                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>
    );
}