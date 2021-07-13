import * as api from "../api";
import {AUTH} from '../constants/actionTypes';
import * as apis from '../api/index.js';

export const signin = (formData, history) => async (dispatch) => {
    try{
        //log in user
        const {data} = await apis.signIn(formData);
        dispatch({type: AUTH, data});

        history.push('/');
    }catch(error){
        console.log(error);
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try{
        const {data} = await apis.signUp(formData);
        dispatch({type: AUTH, data});

        history.push('/');
    }catch(error){
        console.log(error);
    }
}