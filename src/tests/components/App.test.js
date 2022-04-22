import { render, screen } from '@testing-library/react';
import App from '../../components/App/index.js';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Components / App', () => {
  const initialState = { 
    categories: [],
    products: [],
    cart: [],
  };
  const initialState2 = { 
    isLoggedIn: false,
    user: null, 
    userAddresses: null, 
    token: null, 
    orders: null
  };
  const mockStore = configureStore();
  let store;

  it('Afficher le texte Présentation', () => {
      store = mockStore({
        shop : initialState,
        auth : initialState2,
      });
      const { container } = render(
        <Router>
          <Provider store={store}>
              <App />
          </Provider>
        </Router>
      );

      container.querySelector('.home__presentation')

      expect(container.lastChild).toBeTruthy();
  });
});

