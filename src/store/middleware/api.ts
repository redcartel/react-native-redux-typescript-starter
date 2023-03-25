import axios from "axios";
import { createAction, Middleware } from '@reduxjs/toolkit';
import axiosRetry from "axios-retry";
import { BASE_URL } from "@env";

axiosRetry(axios, { retries: 3 })

export type APICall<T> = {
    url: string,
    method: string,
    data?: T,
    onStart?: string,
    onSuccess?: string,
    onFailed?: string
}

export const apiCallBegan = createAction<APICall<any>>('api/apiCallBegan');
export const apiCallSuccess = createAction<any>('api/apiCallSuccess');
export const apiCallFailed = createAction<any>('api/apiCallFailed');

const api: Middleware = store => next => async action => {
    if (action.type !== apiCallBegan.type) {
        return next(action);
    }
    else {
        const { url, method, data, onSuccess, onError, onStart } = action.payload;

        if (onStart) {
            store.dispatch({ type: onStart })
        }

        console.log(`${method} ${BASE_URL}${url}`, data ?? 'no data')

        try {
            const response = await axios.request({
                baseURL: BASE_URL,
                url,
                method,
                data
            })
            store.dispatch(apiCallSuccess(response.data));
            if (onSuccess) {
                console.log(`${method} ${url} ${response.status}`)
                return store.dispatch({
                    type: onSuccess,
                    payload: response.data
                })
            }
        }
        catch (e: any) {
            console.error(`${method} ${url} ${e.response?.status} ${e.response.message}`)
            if (onError) {
                return store.dispatch({
                    type: onError, payload: {
                        message: e.message,
                        status: e.response.status,
                        data: e.response.data
                    }
                })
            }
            else {
                console.error({
                    status: e.response.status
                })

                return store.dispatch(apiCallFailed({
                    message: e.message,
                    status: e.response.status,
                    data: e.response.data
                }));
            }
        }
    }
}

export default api