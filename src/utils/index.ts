import {ErrorType} from './types';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const handleError = (error: ErrorType) => {
  Toast.show({
    type: 'error',
    text1: 'An error occurred',
    text2: error?.data?.message,
  });
};

export const extractCookies = async (rawCookies: string) => {
  if (!rawCookies) return {};

  const cookies = {};
  const sid = rawCookies.split(';')[0];
  const parts = sid.split('=');

  cookies[parts[0]] = parts[1];

  await AsyncStorage.setItem('token', JSON.stringify(cookies));
  return cookies;
};
