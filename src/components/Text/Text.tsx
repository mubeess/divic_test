import {StyleSheet, Text as AppText, TextStyle} from 'react-native';
import {colors} from '../../utils/colors';

export interface TextProps {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  style?: TextStyle;
  children?: any;
  numberOfLines?: number;
}
export default function Text({
  children,
  h1,
  h2,
  h3,
  style,
  numberOfLines = 0,
  ...props
}: TextProps) {
  return (
    <AppText
      ellipsizeMode="tail"
      {...props}
      numberOfLines={numberOfLines}
      style={[
        styles.textStyle,

        {
          fontSize: h1 ? 28 : h2 ? 18 : h3 ? 16 : 14,
          fontWeight: h1 ? 'bold' : h2 ? '800' : h3 ? '700' : '400',
        },
        style,
      ]}>
      {children}
    </AppText>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    color: colors.black,
  },
});
