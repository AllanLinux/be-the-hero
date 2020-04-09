import { StyleSheet } from 'react-native';
// expo add constants
import Constants from 'expo-constants'

export default StyleSheet.create({
    container: {
        // Fazer com que ocupe o tamanho inteiro
        flex: 1,
        // Adicionando um padding nas laterais
        paddingHorizontal: 24,
        // Preenchimento superior da statusbar
        paddingTop: Constants.statusBarHeight + 20,
        //backgroundColor: '#8931B9'
    },
    header: {
        // Itens ficam um do lado do outro
        flexDirection: 'row',
        // Alinhando o item
        justifyContent: 'space-between',
        // Centralizar o colocar o texto na direita
        alignItems: 'center'
    },
    headerText: {
        fontSize: 15,
        color: '#737380'
    },
    headerTextBold: {
        // Negrito
        fontWeight: 'bold'
    },

    title: {
		fontSize: 30,
		marginBottom: 16,
		marginTop: 48,
		color: '#13131a',
		fontWeight: 'bold',
	},
	description: {
		fontSize: 16,
		lineHeight: 24,
        color: '#737380',
        marginBottom: 5,
	},
	incidentList: {
		marginTop: 32,
	},
	incident: {
		padding: 24,
		borderRadius: 8,
		backgroundColor: '#FFF',
		marginBottom: 16,
	},
	incidentProperty: {
		fontSize: 14,
		color: '#41414d',
		fontWeight: 'bold',
	},
	incidentValue: {
		marginTop: 8,
		fontSize: 15,
		marginBottom: 24,
		color: '#737380'
	},
    detailsButton: {
        // Para que a flecha fique ao lado do texto
        flexDirection: 'row',
        // Fecla de um lado, texto do outro
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    detailsButtonText: {
        color: '#E02041',
        fontSize: 15,
        fontWeight: 'bold'
    }, 
})