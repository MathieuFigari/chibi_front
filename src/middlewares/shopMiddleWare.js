import axios from 'axios';

import { FETCH_ARTICLES, FETCH_CATEGORIES, PRICE_CHECK,  saveArticles, saveCategories } from '../actions/shop';

import { setMessage, setLoadingArticles, setLoadingCategories } from '../actions/message';

const shopMiddleWare = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_ARTICLES: {

        axios.get('https://chib-caf.herokuapp.com/products')
        .then(
          (response) => {
          store.dispatch(saveArticles(response.data))
          },
        ).catch(
          () => console.log('error'),
        ).finally(() => store.dispatch(setLoadingArticles()));
        next(action);
        break;
    }

    case FETCH_CATEGORIES: {
      axios.get('https://chib-caf.herokuapp.com/category')
      .then(
        (response) => {
          store.dispatch(saveCategories(response.data))
        }
      ).catch(
        (error) => console.log(error),
      ).finally(() => store.dispatch(setLoadingCategories()));
      next(action);
      break;
    }

    case PRICE_CHECK: {

      const state = store.getState();
      console.log("state", state)


      axios.post('https://chib-caf.herokuapp.com/checkPrice',
      {
         state
      })
      .then(
        (response) => {
          if(response.data) {
            store.dispatch(setMessage("Prix vérifié"));
          }
        }
      ).catch(
        (error) => console.log('error', error),
      );
      next(action);
      break;
    }

    default:
      next(action);

    
  }
};

export default shopMiddleWare;