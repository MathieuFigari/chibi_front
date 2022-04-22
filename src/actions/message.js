export const SET_MESSAGE = 'SET_MESSAGE';

export const setMessage = (message) => (
  {
    type: SET_MESSAGE,
    message
  }
);

export const SET_LOADING_MENU = 'SET_LOADING_MENU';

export const setLoadingMenu = () => (
  {
    type: SET_LOADING_MENU,
  }
);

export const SET_LOADING_ARTICLES = 'SET_LOADING_ARTICLES';

export const setLoadingArticles = () => (
  {
    type: SET_LOADING_ARTICLES,
  }
);

export const SET_LOADING_CATEGORIES = 'SET_LOADING_CATEGORIES';

export const setLoadingCategories = () => (
  {
    type: SET_LOADING_CATEGORIES,
  }
);
