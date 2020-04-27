import React from 'react';
import CampoBase from "./components/CampoBaseComponent";
import { Provider } from 'react-redux';
import { ConfigureStore } from "./redux/configureStore";

const store = ConfigureStore();

export default function App() {
  return (
      <Provider store={store}>
        <CampoBase />
      </Provider>
  );
}

