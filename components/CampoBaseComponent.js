import React, {Component} from "react";
import Calendario from './CalendarioComponent'

import DetalleExcursion from "./DetalleExcursionComponent";
import {Image, View, StyleSheet, Text} from "react-native";
import {Icon} from "react-native-elements";
import {createStackNavigator} from "@react-navigation/stack";
import * as ROUTES from '../constants/routes';
import {NavigationContainer, DrawerActions} from "@react-navigation/native";
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from 'expo-constants'

import Home from "./HomeComponent";
import QuienesSomos from "./QuienesSomosComponent";
import Contacto from "./ContactoComponent";
import {colorGaztaroaClaro, baseUrl, colorGaztaroaOscuro} from "../common/common";

import {fetchActividades, fetchCabeceras, fetchComentarios, fetchExcursiones} from "../redux/ActionCreators";
import { connect } from 'react-redux'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        comentarios: state.comentario,
        cabeceras: state.cabeceras,
        actividades: state.actividades
    }
}

const mapDispatchToProps = dispatch => ({
    fetchExcursiones: () => dispatch(fetchExcursiones()),
    fetchComentarios: () => dispatch(fetchComentarios()),
    fetchCabeceras: () => dispatch(fetchCabeceras()),
    fetchActividades: () => dispatch(fetchActividades())
})


function CustomDrawerContent(props) {
    return(
        <DrawerContentScrollView {...props}>
            <SafeAreaView style={styles.container} forceInset={{ top : 'always', horizontal: 'never'}}>
                <View style={styles.drawerHeader}>
                    <View style={{flex:1}}>
                        <Image source={{uri: baseUrl + 'logo.png'}} style={styles.drawerImage} />
                    </View>
                    <View style={{flex: 2}}>
                        <Text style={styles.drawerHeaderText}> Gaztaroa</Text>
                    </View>
                </View>
                <DrawerItemList {...props} />
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
        </Drawer.Navigator>
    )
}

class CampoBase extends Component {

    componentDidMount() {
        this.props.fetchExcursiones();
        this.props.fetchComentarios();
        this.props.fetchCabeceras();
        this.props.fetchActividades();
    }


    render() {
        return (
            <NavigationContainer>
                <View style={{flex:1, paddingTop: 0 }}>
                    <DrawerNavegador />
                </View>
            </NavigationContainer>
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
