import React, {useState} from 'react';
import AppNavigation from './src/navigations/AppNavigation';
import AnimaatedSplashScreen from './src/screens/SplashScreen/AnimatedSplashScreen';

export default function App() {
  const [visible, setVisible] = useState(true);
  return (
    <>
      {visible ? (
        <AnimaatedSplashScreen
          onAnimationEnd={() => {
            setVisible(false);
          }}
        />
      ) : (
        <AppNavigation />
      )}
    </>
  );
}
