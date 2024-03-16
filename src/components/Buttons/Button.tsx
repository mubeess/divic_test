// import {StyleSheet, ViewStyle} from 'react-native';
// import {Button as PaperButton} from 'react-native-paper';
// import React from 'react';
// import {colors} from '../../utils/colors';
// export interface ButtonProps {
//   color?: string;
//   label: string;
//   onPress: () => void;
//   style?: ViewStyle;
//   textColor?: string;
// }
// export default function Button({
//   color = colors.primary,
//   onPress,
//   label,
//   style,
//   textColor = colors.white,
// }: ButtonProps) {
//   return (
//     <PaperButton
//       onPress={onPress}
//       buttonColor={color}
//       textColor={textColor}
//       style={[styles.button, style]}>
//       {label}
//     </PaperButton>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     width: '100%',
//     borderRadius: 5,
//     height: 56,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

import {memo, ReactElement, useEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../../utils/colors';

interface ButtonProps {
  IconRight?: ReactElement;
  IconLeft?: ReactElement;
  isLoading?: boolean;
  onPress?: () => void;
  label: string;
  style?: ViewStyle;
  disabled?: boolean;
  backgroundColor?: string;
  pale?: boolean;
  fontColor?: string;
}

function Button({
  IconRight,
  IconLeft,
  isLoading = false,
  onPress,
  label,
  style,
  disabled = false,
  backgroundColor = colors.primary,
  fontColor = colors.white,
  ...props
}: ButtonProps) {
  const {width} = Dimensions.get('window');
  const sharedValue = useSharedValue(-width);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: sharedValue.value}],
    };
  });
  const startLoading = () => {
    sharedValue.value = withRepeat(withTiming(0.5, {duration: 1000}), -1, true);
  };
  const stopLoading = () => {
    sharedValue.value = withTiming(-width, {duration: 1000});
  };

  useEffect(() => {
    if (isLoading) {
      startLoading();
    } else {
      stopLoading();
    }
  }, [isLoading]);
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.buttonContainer,
        style,
        {backgroundColor: disabled ? colors.disabled : backgroundColor},
      ]}
      {...props}>
      <Animated.View
        style={[
          styles.animatedView,
          {backgroundColor: 'rgba(0,0,0,0.5)'},
          reanimatedStyle,
        ]}
      />
      {IconLeft && IconLeft}
      <Animated.Text
        style={[styles.text, {color: disabled ? colors.gray : fontColor}]}>
        {label}
      </Animated.Text>
      {IconRight && !isLoading && IconRight}
      {isLoading && <ActivityIndicator color="#fff" />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    height: 56,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    position: 'relative',
    overflow: 'hidden',
    gap: 10,
  },
  text: {
    fontSize: 16,
  },
  animatedView: {
    position: 'absolute',
    zIndex: 10,
    opacity: 0.3,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});
export default memo(Button);
