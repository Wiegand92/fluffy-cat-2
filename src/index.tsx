// 3rd Party //
import reactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';

// Components //
import App from './components/App';

// Styles //
import './style.css';

// Render //
reactDOM.render(
  // <Provider store={store}>
  <App />,
  /* </Provider>, */
  document.getElementById('app'),
);
