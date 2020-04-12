import React, {Component} from "react";
import Calendario from './CalendarioComponent'
import { EXCURSIONES } from "../common/excursiones";

import DetalleExcursion from "./DetalleExcursionComponent";
import {View} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import * as ROUTES from '../constants/routes';
import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import Home from "./HomeComponent";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function HomeNavegador() {
    return(
        <Stack.Navigator
            initialRouteName={ROUTES.HOME}
            headerMode='screen'
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: '#015afc' },
                headerTitleStyle: { color: '#fff' }
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

function CalendarioNavegador() {
    return(
        <Stack.Navigator
            initialRouteName={ROUTES.CALENDARIO}
            headerMode='screen'
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: '#015afc' },
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

function DrawerNavegador() {
    return(
        <Drawer.Navigator
            drawerStyle={{
                backgroundColor: '#c2d3da'
            }}
            initialRouteName={ROUTES.HOME}
        >
            <Drawer.Screen name={ROUTES.HOME} component={HomeNavegador} />
            <Drawer.Screen name={ROUTES.CALENDARIO} component={CalendarioNavegador} />
        </Drawer.Navigator>
    )
}

class CampoBase extends Component {

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

export default CampoBase;
