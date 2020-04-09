import React, { useState, useEffect } from 'react';
// TouchableOpacity - Componente que torna qualquer coisa clicavel
// FlatList - Fazer as listagens dos itens, scroll na tela
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
// Pacote de icones padrão, importando para usar no botão
import { Feather } from '@expo/vector-icons'
// Componente que irá direcionar para outra tela, como useHistory
import { useNavigation } from '@react-navigation/native'
// Import Logos
import logoImg from '../../assets/logo.png';
// Importando a estilização
import styles from './styles';
// Importando api
import api from '../../services/api'

export default function Incidents() {
    // Para mudar o estado de uma constante
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage]  = useState(1);
    // Para evitar de buscar dados repetitivos no scroll
    const [loading, setLoading] = useState(false);
    // Componente que irá direcionar para outra tela, como useHistory
    const navigation = useNavigation();

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents() {

        if (loading){
            return;
        }

        if (total > 0 && incidents.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }
        });
        // Anexando doi svetores dentro de 1
        setIncidents([... incidents, ... response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }
    // 
    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos.</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia!</Text>

            <FlatList
                // Os dados que vão montar a lista, ficam no data
                data={incidents}
                style={styles.incidentList}
                // Basicamente, vai receber cada um dos incidentes e vai retornar informação unica 
                keyExtractor={incident => String(incident.id)}
                // Removendo a barra de scroll
                showsVerticalScrollIndicator={false}
                // Essa propriedade ela aceita uma função que é disparada de forma automatica quando chegar no final da lista
                onEndReached={loadIncidents}
                // Ela fala quantos % do final da lista o usuario precisar estar para que carregue novos elementos
                onEndReachedThreshold={0.2}
                // Vai ser a funcao responsavel por renderizar cada um dos itens
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG: </Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>LOCALIZAÇÃO: </Text>
                        <Text style={styles.incidentValue}>{incident.city}/{incident.uf}</Text>

                        <Text style={styles.incidentProperty}>CASO: </Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR: </Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(incident.value)}
                        </Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(incident)}>
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}