import BootSplash from 'react-native-bootsplash';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../../utils/colors';
import {IconImage} from '../../assets/Images';
import {StatusBar} from 'react-native';

type Props = {
  onAnimationEnd: () => void;
};

const AnimaatedSplashScreen = ({onAnimationEnd}: Props) => {
  const sharedValue = useSharedValue(0.3);
  const animatedContainerStyle = useAnimatedStyle(() => {
    const interpoatedBackground = interpolateColor(
      sharedValue.value,
      [0.3, 0.6, 1],
      [colors.white, colors.white, colors.primary],
    );
    return {
      backgroundColor: interpoatedBackground,
    };
  });

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: sharedValue.value}],
    };
  });

  const {container, logo} = BootSplash.useHideAnimation({
    manifest: require('../../../assets/bootsplash_manifest.json'),

    logo: require('../../../assets/bootsplash_logo.png'),

    statusBarTranslucent: false,
    navigationBarTranslucent: false,

    animate: () => {
      sharedValue.value = withTiming(1, {duration: 2000});
      setTimeout(() => {
        onAnimationEnd();
      }, 1000);
    },
  });

  return (
    <Animated.View
      {...container}
      style={[container.style, animatedContainerStyle]}>
      <StatusBar animated backgroundColor={colors.white} />
      <Animated.Image
        {...logo}
        style={[animatedImageStyle, {height: 100, width: 100}]}
        source={IconImage}
      />
    </Animated.View>
  );
};

export default AnimaatedSplashScreen;
