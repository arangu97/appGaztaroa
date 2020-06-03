import {createStore, combineReducers, applyMiddleware} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { excursiones } from './excursiones';
import { comentarios } from './comentarios';
import { cabeceras } from './cabeceras';
import { actividades } from './actividades';
import { favoritos } from "./favoritos";
import { paisajes } from "./paisajes";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};

const pReducer = persistReducer(persistConfig, combineReducers({
                                                    excursiones,
                                                    comentarios,
                                                    cabeceras,
                                                    actividades,
                                                    favoritos,
                                                    paisajes})
                );

const store = createStore(
    pReducer,
    applyMiddleware(thunk)//, logger)
);
const persistor = persistStore(store);


export {persistor, store};

