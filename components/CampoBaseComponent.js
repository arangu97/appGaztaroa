import React, {Component} from "react";
import { connect } from 'react-redux'
import {Image, View, StyleSheet, Text, Alert} from "react-native";
import {Icon, Button} from "react-native-elements";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer, DrawerActions} from "@react-navigation/native";
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import NetInfo from '@react-native-community/netinfo';


import Calendario from './CalendarioComponent'
import DetalleExcursion from "./DetalleExcursionComponent";
import * as ROUTES from '../constants/routes';
import Home from "./HomeComponent";
import QuienesSomos from "./QuienesSomosComponent";
import Contacto from "./ContactoComponent";
import {colorGaztaroaClaro, colorGaztaroaOscuro} from "../common/common";
import {
    fetchActividades,
    fetchCabeceras,
    fetchComentarios,
    fetchExcursiones,
    fetchPaisajes
} from "../redux/ActionCreators";
import PruebaEsfuerzo from "./PruebaEsfuerzoComponent";
import VistaFavoritos from "./VistaFavoritosComponent";
import firebase from "../common/firebase";
import MisPaisajes from "./MisPaisajesComponent";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        comentarios: state.comentario,
        cabeceras: state.cabeceras,
        actividades: state.actividades,
        paisajes : state.paisajes
    }
}

const mapDispatchToProps = dispatch => ({
    fetchExcursiones: () => dispatch(fetchExcursiones()),
    fetchComentarios: () => dispatch(fetchComentarios()),
    fetchCabeceras: () => dispatch(fetchCabeceras()),
    fetchActividades: () => dispatch(fetchActividades()),
    fetchPaisajes: () => dispatch(fetchPaisajes())
})


function CustomDrawerContent(props) {
    return(
        <DrawerContentScrollView {...props}>
            <SafeAreaView style={styles.container} forceInset={{ top : 'always', horizontal: 'never'}}>
                <View style={styles.drawerHeader}>
                    <View style={{flex:1}}>
                        <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/dsm-aranguren-appgaztaroa.appspot.com/o/logo.png?alt=media&token=cc36d47d-ea74-4d7b-9374-8a25245d987f'}} style={styles.drawerImage} />
                    </View>
                    <View style={{flex: 2}}>
                        <Text style={styles.drawerHeaderText}> Gaztaroa</Text>
                    </View>
                </View>
                <DrawerItemList {...props} />
                <Button
                    title="Cerrar sesión"
                    onPress={() => Alert.alert(
                            'Cerrar sesión',
                            'Estás seguro que quieres salir?',
                            [
                                {text: 'Cancelar', onPress: () => console.log(item.nombre + ' Favorito no borrado')},
                                {text: 'Sí', onPress: () => {
                                        firebase
                                            .auth()
                                            .signOut()
                                            .then(() => props.navigation.replace('Login'))
                                    }},
                            ],
                            {cancelable: false},
                        )}
                    buttonStyle={{margin: 10, backgroundColor: '#ff0000'}}
                />
            </SafeAreaView>
        </DrawerContentScrollView>
    )
}


function HomeNavegador({ navigation }) {
    return(
        <Stack.Navigator
            initialRouteName={ROUTES.HOME}
            headerMode='screen'
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro },
                headerTitleStyle: { color: '#fff' },
                headerLeft: () => (<Icon name="menu" size={28} color= 'white' onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }/>)
            }}
        >
            <Stack.Screen
                name={ROUTES.HOME}
                component={Home}
                options={{
                    title: 'Campo Base'
                }}
            />
        </Stack.Navigator>
    )
}

function CalendarioNavegador({ navigation }) {
    return(
        <Stack.Navigator
            initialRouteName={ROUTES.CALENDARIO}
            headerMode='screen'
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro },
                headerTitleStyle: { color: '#fff' }
            }}
        >
            <Stack.Screen
                name={ROUTES.CALENDARIO}
                component={Calendario}
                options={{
                    title: 'Calendario Gaztaroa'
                }}
            />
            <Stack.Screen
                name={ROUTES.DETALLE}
                component={DetalleExcursion}
                options={{
                    title: 'Detalle Excursión'
                }}
            />
        </Stack.Navigator>
    )
}

function ContactoNavegador({ navigation }) {
    return(
        <Stack.Navigator
            initialRouteName={ROUTES.CONTACTO}
            headerMode='screen'
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro },
                headerTitleStyle: { color: '#fff' },
                headerLeft: () => (<Icon name="menu" size={28} color= 'white' onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }/>)
            }}
        >
            <Stack.Screen
                name={ROUTES.CONTACTO}
                component={Contacto}
                options={{
                    title: 'Contacto'
                }}
            />
        </Stack.Navigator>
    )
}

function QuienesSomosNavegador({ navigation }) {
    return(
        <Stack.Navigator
            initialRouteName={ROUTES.QUIENES}
            headerMode='screen'
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro},
                headerTitleStyle: { color: '#fff' },
                headerLeft: () => (<Icon name="menu" size={28} color= 'white' onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }/>)
            }}
        >
            <Stack.Screen
                name={ROUTES.QUIENES}
                component={QuienesSomos}
                options={{
                    title: 'Quiénes Somos'
                }}
            />
        </Stack.Navigator>
    )
}

function PruebaDeEsfuerzoNavegador({ navigation }){
    return(
        <Stack.Navigator
            initialRouteName={ROUTES.PRUEBA_ESFUERZO}
            headerMode='screen'
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro},
                headerTitleStyle: { color: '#fff' },
                headerLeft: () => (<Icon name="menu" size={28} color= 'white' onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }/>)
            }}
        >
            <Stack.Screen
                name={ROUTES.PRUEBA_ESFUERZO}
                component={PruebaEsfuerzo}
                options={{
                    title: 'Prueba de Esfuerzo'
                }}
            />
        </Stack.Navigator>
    )
}

function ExcursionesFavoritasNavegador({ navigation }){
    return(
        <Stack.Navigator
            initialRouteName={ROUTES.EXCURSIONES_FAVORITAS}
            headerMode='screen'
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro},
                headerTitleStyle: { color: '#fff' },
                headerLeft: () => (<Icon name="menu" size={28} color= 'white' onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }/>)
            }}
        >
            <Stack.Screen
                name={ROUTES.EXCURSIONES_FAVORITAS}
                component={VistaFavoritos}
                options={{
                    title: 'Excursiones favoritas'
                }}
            />
        </Stack.Navigator>
    )
}

function MisPaisajesNavegador( { navigation } ) {
    return(
        <Stack.Navigator
            initialRouteName={ROUTES.MIS_PAISAJES}
            headerMode='screen'
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro},
                headerTitleStyle: { color: '#fff' },
                headerLeft: () => (<Icon name="menu" size={28} color= 'white' onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }/>)
            }}
        >
            <Stack.Screen
                name={ROUTES.MIS_PAISAJES}
                component={MisPaisajes}
                options={{
                    title: 'Mis Paisajes'
                }}
            />

        </Stack.Navigator>
    )
}


function DrawerNavegador() {
    return(
        <Drawer.Navigator
            drawerStyle={{
                backgroundColor: colorGaztaroaClaro
            }}
            initialRouteName={ROUTES.HOME}
            drawerContent={props => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name={ROUTES.HOME} component={HomeNavegador}
               options={{
                   drawerIcon: ({ tintColor }) => (
                       <Icon
                           name='home'
                           type='font-awesome'
                           size={22}
                           color={tintColor}
                       />
                   )
               }}
            />
            <Drawer.Screen name={ROUTES.QUIENES} component={QuienesSomosNavegador}
               options={{
                   drawerIcon: ({ tintColor }) => (
                       <Icon
                           name='info-circle'
                           type='font-awesome'
                           size={22}
                           color={tintColor}
                       />
                   )
               }}
            />
            <Drawer.Screen name={ROUTES.CALENDARIO} component={CalendarioNavegador}
               options={{
                   drawerIcon: ({ tintColor }) => (
                       <Icon
                           name='calendar'
                           type='font-awesome'
                           size={22}
                           color={tintColor}
                       />
                   )
               }}
            />
            <Drawer.Screen name={ROUTES.CONTACTO} component={ContactoNavegador}
               options={{
                   drawerIcon: ({ tintColor }) => (
                       <Icon
                           name='address-card'
                           type='font-awesome'
                           size={22}
                           color={tintColor}
                       />
                   )
               }}
            />
            <Drawer.Screen name={ROUTES.PRUEBA_ESFUERZO} component={PruebaDeEsfuerzoNavegador}
                           options={{
                               drawerIcon: ({ tintColor }) => (
                                   <Icon
                                       name='heartbeat'
                                       type='font-awesome'
                                       size={22}
                                       color={tintColor}
                                   />
                               )
                           }}
            />
            <Drawer.Screen name={ROUTES.EXCURSIONES_FAVORITAS} component={ExcursionesFavoritasNavegador}
                           options={{
                               drawerIcon: ({ tintColor }) => (
                                   <Icon
                                       name='thumbs-up'
                                       type='font-awesome'
                                       size={22}
                                       color={tintColor}
                                   />
                               )
                           }}
            />
            <Drawer.Screen name={ROUTES.MIS_PAISAJES} component={MisPaisajesNavegador}
                           options={{
                               drawerIcon: ({ tintColor }) => (
                                   <Icon
                                       name='image'
                                       type='font-awesome'
                                       size={22}
                                       color={tintColor}
                                   />
                               )
                           }}
            />
        </Drawer.Navigator>
    )
}

class CampoBase extends Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                this.props.navigation.replace('SignUp')
            }
        });
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                Alert.alert(
                    "No hay ninguna conexión disponible",
                    "Los datos mostrados no estarán actualizados",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
                return;
            }
            this.props.fetchExcursiones();
            this.props.fetchComentarios();
            this.props.fetchCabeceras();
            this.props.fetchActividades();
            this.props.fetchPaisajes();
        });
    }


    render() {
        return (
            <View style={{flex:1, paddingTop: 0 }}>
                <DrawerNavegador />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: colorGaztaroaOscuro,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CampoBase);
