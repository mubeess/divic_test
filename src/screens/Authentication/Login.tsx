import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, TextInput} from 'react-native-paper';

export default function Login() {
  return (
    <View>
      <TextInput mode="outlined" label="Name" />
      <Button mode="contained">Login</Button>
    </View>
  );
}

const styles = StyleSheet.create({});
