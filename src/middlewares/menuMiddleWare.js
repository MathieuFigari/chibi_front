import axios from 'axios';

import {  FETCH_FOODCATEGORIES,  saveFoodCategories } from '../actions/menu';

import { setLoadingMenu } from '../actions/message';

const menu = (store) => (next) => (action) => {
    switch (action.type) {
     
  
      case FETCH_FOODCATEGORIES: {
        axios.get('https://chib-caf.herokuapp.com/category')
        .then(
          (response) => {
            store.dispatch(saveFoodCategories(response.data))
          },
        ).catch(
          (error) => console.log(error),
        ).finally(() => store.dispatch(setLoadingMenu()));
        next(action);
        break;
      }
      default:
      next(action)
    }

}

export default menu;
