import React from 'react';
import CampoBase from "./components/CampoBaseComponent";
import { Provider } from 'react-redux';
import { store } from "./redux/configureStore";

export default function App() {
  return (
      <Provider store={store}>
        <CampoBase />
      </Provider>
  );
}

