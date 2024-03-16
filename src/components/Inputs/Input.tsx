import {StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';
import {colors} from '../../utils/colors';
export interface InputProps {
  label: string;
  style?: ViewStyle;
}
export default function Input({label, style}: InputProps) {
  return (
    <TextInput
      outlineColor="transparent"
      style={[styles.input, style]}
      label={label}
      mode="outlined"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 0,
    backgroundColor: colors.inputBg,
  },
});
