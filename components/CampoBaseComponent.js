import React, {Component} from "react";
import Calendario from './CalendarioComponent'
import { EXCURSIONES } from "../common/excursiones";

import DetalleExcursion from "./DetalleExcursionComponent";
import {View} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import * as ROUTES from '../constants/routes';
import {NavigationContainer} from "@react-navigation/native";

const Stack = createStackNavigator();



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

class CampoBase extends Component {

    render() {
        return (
            <NavigationContainer>
                <View style={{flex:1, paddingTop: 0 }}>
                    <CalendarioNavegador />
                </View>
            </NavigationContainer>
        );
    }
}

export default CampoBase;
