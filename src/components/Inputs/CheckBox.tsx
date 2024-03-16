import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';
import Text from '../Text/Text';
type CheckboxProps = {
  isChecked?: boolean;
  onCheck: () => void;
};
export default function CheckBox({isChecked = false, onCheck}: CheckboxProps) {
  return (
    <TouchableOpacity
      onPress={onCheck}
      style={[
        styles.container,
        {
          borderColor: isChecked ? colors.primary : colors.gray,
          backgroundColor: isChecked ? colors.primary : colors.white,
        },
      ]}>
      {isChecked && <Text style={styles.text}>✓</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
  },
});
