import axios from 'axios';
import { AUTH_FIRSTNAME, AUTH_MIDDLENAME, AUTH_LASTNAME, AUTH_USERNAME, AUTH_TOKEN, AUTH_ID, AUTH_ERROR } from './types';
import { api_address } from '../variables';

const token = localStorage.getItem('appWithAPI_token')?localStorage.getItem('appWithAPI_token'):null;

const api = axios.create({
  baseURL: api_address
  // baseURL: api_address,
  // headers: {"Authorization" : `Bearer ${token}`}
});

const noauth = axios.create({
  baseURL: api_address
});

// if(localStorage.getItem('appWithAPI_token')) axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('appWithAPI_token');

export const getUserInfo = (userInfoProps, callback) => async dispatch => {
console.log(userInfoProps);
  try {
    const response = await api.get(
      'api/users/'  + userInfoProps.id,
      {headers: {"Authorization" : `Bearer ${userInfoProps.token}`}}
    );

    dispatch({ type: AUTH_FIRSTNAME, payload: response.data.Firstname });
    dispatch({ type: AUTH_MIDDLENAME, payload: response.data.Middlename });
    dispatch({ type: AUTH_LASTNAME, payload: response.data.Lastname });
    dispatch({ type: AUTH_USERNAME, payload: response.data.Username });
    dispatch({ type: AUTH_ID, payload: response.data.Id });
    dispatch({ type: AUTH_TOKEN, payload: userInfoProps.token });
    dispatch({ type: AUTH_ERROR, payload: '' });

    callback(response.data.Id);
  } catch (e) {
    callback(0);
    dispatch({ type: AUTH_ERROR, payload: 'Could not get user info' });
  }
};

export const register = (formProps, callback) => async dispatch => {
  try {
    const response = await noauth.post(
      'api/users',
      formProps
    );

    localStorage.setItem('appWithAPI_token', response.data.Token);
    localStorage.setItem('appWithAPI_userid', response.data.Id);
    dispatch({ type: AUTH_TOKEN, payload: response.data.Token });
    dispatch({ type: AUTH_FIRSTNAME, payload: response.data.Firstname });
    dispatch({ type: AUTH_MIDDLENAME, payload: response.data.Middlename });
    dispatch({ type: AUTH_LASTNAME, payload: response.data.Lastname });
    dispatch({ type: AUTH_USERNAME, payload: response.data.Username });
    dispatch({ type: AUTH_ID, payload: response.data.Id });
    dispatch({ type: AUTH_ERROR, payload: '' });

    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Username is alread taken' });
  }
};

export const signin = (formProps, callback) => async dispatch => {

  try {
    const response = await noauth.post(
      'api/login',
      formProps
    );

    localStorage.setItem('appWithAPI_token', response.data.Token);
    localStorage.setItem('appWithAPI_userid', response.data.Id);
    dispatch({ type: AUTH_TOKEN, payload: response.data.Token });
    dispatch({ type: AUTH_FIRSTNAME, payload: response.data.Firstname });
    dispatch({ type: AUTH_MIDDLENAME, payload: response.data.Middlename });
    dispatch({ type: AUTH_LASTNAME, payload: response.data.Lastname });
    dispatch({ type: AUTH_USERNAME, payload: response.data.Username });
    dispatch({ type: AUTH_ID, payload: response.data.Id });
    dispatch({ type: AUTH_ERROR, payload: '' });

    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Please make sure you are using the right credentials and try again.' });
  }
};

export const signout = () => async dispatch => {
  localStorage.removeItem('appWithAPI_token');
  localStorage.removeItem('appWithAPI_userid');

  dispatch({ type: AUTH_TOKEN, payload: '' });
  dispatch({ type: AUTH_FIRSTNAME, payload: '' });
  dispatch({ type: AUTH_MIDDLENAME, payload: '' });
  dispatch({ type: AUTH_LASTNAME, payload: '' });
  dispatch({ type: AUTH_USERNAME, payload: '' });
  dispatch({ type: AUTH_ID, payload: '' });
  dispatch({ type: AUTH_ERROR, payload: '' });

};
