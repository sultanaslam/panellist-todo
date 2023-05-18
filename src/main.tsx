import React from 'react';
import ReactDOM from 'react-dom/client';
import Todos from './components/Todos.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from 'redux/store.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Todos />
    </Provider>
  </React.StrictMode>
);
