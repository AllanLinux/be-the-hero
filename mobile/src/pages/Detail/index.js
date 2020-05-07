import React, { useEffect } from 'react';
// TouchableOpacity - Componente que torna qualquer coisa clicavel
// FlatList - Fazer as listagens dos itens, scroll na tela
// Linking - Para chamar uma app do celular
import { View, FlatList, Image, Text, TouchableOpacity, Linking } from 'react-native';
// Pacote de icones padrão, importando para usar no botão
import { Feather } from '@expo/vector-icons'
// Componente que irá direcionar para outra tela, como useHistory
// UseRoute - Serve para pegar informações especificas da pagina atual da aplicação
import { useNavigation, useRoute } from '@react-navigation/native'
// Importando o componente de e-mail
import * as MailComposer from 'expo-mail-composer'
// Importando api
import api from '../../services/api'
// Import Logos
import logoImg from '../../assets/logo.png';
// Importando a estilização
import styles from './styles';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();
    // Pegando todos os valores recebidos da pagina anterior, incident
    const incident = route.params.incident;
    const message = `Olá ${incident.name}, estou entrando em contato, pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'
    }).format(incident.value)}`
    function navigationBack() {
        navigation.goBack();
    }

    function sendMail() {
        /**
         * expo install expo-mail-composer 
         * Para abrir o e-mail por cima da tela da aplicação
         * */
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigationBack}>
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG: </Text>
                <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

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
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}