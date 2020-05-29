import React from 'react';
import CampoBase from "./components/CampoBaseComponent";
import { Provider } from 'react-redux';
import { store } from "./redux/configureStore";

import * as ROUTES from './constants/routes';
import SplashScreen from "./components/SplashScreenComponent";
import {createStackNavigator} from "@react-navigation/stack";
import Login from "./components/LoginComponent";
import SignUp from "./components/SignUpComponent";
import {colorGaztaroaOscuro} from "./common/common";
import {NavigationContainer} from "@react-navigation/native";

const Stack = createStackNavigator();

export default function App() {
  return (
      <Provider store={store}>
          <NavigationContainer>
                  <Stack.Navigator
                      initialRouteName={ROUTES.SPLASH}
                      headerMode='screen'
                      screenOptions={{
                          headerTintColor: '#fff',
                          headerStyle: { backgroundColor: colorGaztaroaOscuro },
                          headerTitleStyle: { color: '#fff' }
                      }}
                  >
                      <Stack.Screen
                          name={ROUTES.SPLASH}
                          component={SplashScreen}
                          options={{headerShown: false}}
                      />

                      <Stack.Screen
                          name={ROUTES.LOGIN}
                          component={Login}
                          options={{
                              title: 'Iniciar sesión'
                          }}
                      />

                      <Stack.Screen
                          name={ROUTES.SIGN_UP}
                          component={SignUp}
                          options={{
                              title: 'Registrarse'
                          }}
                      />

                      <Stack.Screen
                          name={ROUTES.HOME}
                          component={CampoBase}
                          options={{headerShown: false}}
                      />
              </Stack.Navigator>
          </NavigationContainer>
      </Provider>
  );
}

