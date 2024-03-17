import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {LoginRequest} from './types';
import {extractCookies} from '../../utils';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shippex-demo.bc.brandimic.com/api',
    prepareHeaders: async headers => {
      const token = await AsyncStorage.getItem('token');
      const credentials = await AsyncStorage.getItem('credentials');
      if (token) {
        const parsedToken = JSON.parse(token);
        const parsedCredentials = JSON.parse(credentials);

        headers.set(
          'Cookies',
          `sid=${parsedToken.sid};system_user=${parsedCredentials.username};full_name=${parsedCredentials.fullname};user_id=${parsedCredentials.username};user_image=''`,
        );
        headers.set('Content-Encoding', 'gzip');
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    loginUser: builder.mutation({
      query: (loginRequest: LoginRequest) => ({
        url: 'https://shippex-demo.bc.brandimic.com/api/method/login',
        method: 'POST',
        body: loginRequest,
      }),
      transformResponse: (response, other) => {
        extractCookies(other?.response?.headers.map['set-cookie']);
        return response;
      },
    }),
    getShipMents: builder.query({
      query: () => ({
        url: `https://shippex-demo.bc.brandimic.com/api/method/frappe.client.get_list?doctype=AWB&fields=["*"]`,
      }),
    }),
    getFilters: builder.query({
      query: () => ({
        url: `https://shippex-demo.bc.brandimic.com/api/method/frappe.client.get_list?doctype=AWB Status&fields=["*"]`,
      }),
      transformErrorResponse: response => {
        console.log(response);
      },
    }),
  }),
});

export const {useLoginUserMutation, useGetShipMentsQuery, useGetFiltersQuery} =
  apiSlice;
