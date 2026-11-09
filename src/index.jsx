import { createRoot } from 'react-dom/client';
import App from './App';
import '../styles/index.css';
import '../styles/variables.css';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store = {store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);