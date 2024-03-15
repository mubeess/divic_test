/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';

import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/redux';
import app_theme from './app_theme.json';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';

const theme = {
  ...DefaultTheme,

  myOwnProperty: true,

  colors: app_theme.colors,
};
export default function Main() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
