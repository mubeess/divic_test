import {ReactElement} from 'react';
import {
  KeyboardType,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Text from '../Text/Text';
import {colors} from '../../utils/colors';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
export interface InputProps {
  onChange?: (e: string) => void;
  label?: string;
  style?: ViewStyle;
  type?: KeyboardType;
  secureEntry?: boolean;
  Icon?: ReactElement;
  IconLeft?: ReactElement;
  required?: boolean;
  placeholder?: string;
  value?: string | number;
  onBlur?: () => void;
  onFocus?: () => void;
}
function MyInput({
  onChange,
  label,
  style,
  type,
  Icon,
  placeholder,
  required = false,
  secureEntry = false,
  onBlur,
  onFocus,
  value,
  IconLeft,
}: InputProps) {
  const borderWidthValue = useSharedValue(1);

  const reanimtedBorderStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      borderWidthValue.value,
      [1, 2],
      ['transparent', colors.primary],
    );
    return {
      borderWidth: borderWidthValue.value,
      borderColor,
    };
  });

  return (
    <View style={[styles.mainContainer, style]}>
      <View style={styles.labelContainer}>
        {label && <Text style={styles.label}>{label}</Text>}
        {required && <Text style={styles.required}>*</Text>}
      </View>
      <AnimatedTouchableOpacity
        style={[styles.inputContainer, reanimtedBorderStyle]}>
        {IconLeft && IconLeft}
        <TextInput
          value={`${value || ''}`}
          keyboardType={type}
          onChangeText={onChange}
          secureTextEntry={secureEntry}
          onFocus={() => {
            borderWidthValue.value = withTiming(2);
            onFocus?.();
          }}
          onBlur={() => {
            borderWidthValue.value = withTiming(1);
            onBlur?.();
          }}
          placeholder={placeholder}
          placeholderTextColor="#898989"
          style={[styles.textInput, {color: '#000'}]}
        />
        {Icon && Icon}
      </AnimatedTouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flexDirection: 'column',
    marginTop: 20,
  },
  labelContainer: {
    flexDirection: 'row',
  },
  required: {
    color: 'red',
    fontWeight: 'bold',
  },
  inputContainer: {
    height: 48,
    width: '100%',
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: colors.inputBg,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'uppercase',
    color: '#1A1A1A',
  },
  textInput: {
    width: '90%',
    backgroundColor: colors.inputBg,
    height: 40,
    fontSize: 16,
  },
  iconRight: {
    position: 'absolute',
    right: 0,
    marginRight: 20,
  },
});

export default MyInput;
