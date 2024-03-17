import {StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';
import {colors} from '../../utils/colors';
export interface InputProps {
  label: string;
  style?: ViewStyle;
  value: string;
  onChange: (e: string) => void;
  secureEntry?: boolean;
  error?: boolean;
}
export default function Input({
  label,
  style,
  onChange,
  value,
  secureEntry = false,
  error = false,
}: InputProps) {
  return (
    <TextInput
      error={error}
      secureTextEntry={secureEntry}
      value={value}
      onChangeText={onChange}
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
