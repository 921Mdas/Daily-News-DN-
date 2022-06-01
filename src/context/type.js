// Use Reducer commands
export const GET_ARTICLES = "GET_ARTICLES";
export const GET_FAV_ARTICLES = "GET_FAV_ARTICLES";
export const UPDATE_INIT_SORT = "UPDATE_INIT_SORT";
export const ERROR_GLOBAL = "ERROR_GLOBAL";
export const SIGN_IN = "SIGN_IN";
export const REGISTER = "REGISTER";
export const GET_CURRENT_USER = "GET_CURRENT_USER";
export const SIGN_IN_OK = "SIGN_IN_OK";
export const AUTH_OK = "AUTH_OK";
export const AUTH_NOT_OK = "AUTH_NOT_OK";
export const SIGN_OUT = "SIGN_OUT";
export const CHANGE_LAYOUT = "CHANGE_LAYOUT";

const BASEURL = "http://localhost:3001/";

// API URLS
// export const GET_CONTENT_URL = `${BASEURL}api/articles/content`;
// export const LOADMORE_URL = `${BASEURL}api/articles/loadmore`;
// export const DELETE_ARTICLE_URL = `${BASEURL}api/articles/admin/delete/`;
// export const LIKE_ARTICLE_URL = `${BASEURL}api/articles/admin/like/`;
// export const GETLIKED_ARTICLE_URL = `${BASEURL}api/articles/admin/like/`;
// export const SIGN_UP_URL = `${BASEURL}api/users/register`;
// export const SIGN_IN_URL = `${BASEURL}api/users/signin`;
// export const AUTO_SIGN_URL = `${BASEURL}api/users/isauth`;
// export const CREATE_ARTICLE_URL = `${BASEURL}api/articles/admin/addarticles`;

// production
export const GET_CONTENT_URL = ` /api/articles/content`;
export const LOADMORE_URL = `/api/articles/loadmore`;
export const DELETE_ARTICLE_URL = `/api/articles/admin/delete/`;
export const LIKE_ARTICLE_URL = `/api/articles/admin/like/`;
export const GETLIKED_ARTICLE_URL = `/api/articles/admin/like/`;
export const SIGN_UP_URL = `/api/users/register`;
export const SIGN_IN_URL = `/api/users/signin`;
export const AUTO_SIGN_URL = `/api/users/isauth`;
export const CREATE_ARTICLE_URL = `/api/articles/admin/addarticles`;

// local Storage item names
export const ARTICLES_STORED = "articles";

// check javascript enums
