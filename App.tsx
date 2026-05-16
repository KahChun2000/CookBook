import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigation';
import { Provider } from 'react-redux';
import { store } from './redux';

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </Provider>
  );
}
