import { SET_MESSAGE, SET_LOADING_ARTICLES, SET_LOADING_MENU, SET_LOADING_CATEGORIES } from '../actions/message';

export const initialState = {
  loadingArticles: true, 
  loadingMenu: true,
  loadingCategories: true
};

const messageReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        message: action.message
      };
    case SET_LOADING_ARTICLES:
      return {
        ...state,
        loadingArticles: false
      };
    case SET_LOADING_MENU:
      return {
        ...state,
        loadingMenu: false
      };
    case SET_LOADING_CATEGORIES:
      return {
        ...state,
        loadingCategories: false
      };
    default:
      return state;
  }
};

export default messageReducer;