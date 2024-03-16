import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../utils/colors';
import {ChevronLeftIcon} from '../../../assets/Svg';
import Text from '../../../components/Text/Text';
import Input from '../../../components/Inputs/Input';
import Button from '../../../components/Buttons/Button';
import {useNavigation} from '@react-navigation/native';

import {RootStackParamList} from '../../../Navigations/Stack/MainAppStack';
import {StackNavigationProp} from '@react-navigation/stack';

export interface ModalLoginProps {
  isOpen?: boolean;
  closeModal: () => void;
}
type DashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;
const {height} = Dimensions.get('window');
export default function LoginModal({isOpen, closeModal}: ModalLoginProps) {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const routeToDashBoard = () => {
    navigation.navigate('Dashboard');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={isOpen}>
      <View style={styles.layer}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            <View style={styles.decoration} />
            <TouchableOpacity onPress={closeModal} style={styles.closeModal}>
              <ChevronLeftIcon color={colors.primary} />
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.loginText} h1>
              Login
            </Text>
            <Text style={styles.loginDescription}>
              Please enter your First, Last name and your phone number in order
              to register
            </Text>
            <Input style={styles.input} label="URL" />
            <Input style={styles.input} label="Username/Email" />
            <Input style={styles.input} label="Password" />
            <Button
              onPress={routeToDashBoard}
              style={styles.button}
              label="Login"
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  layer: {
    flex: 1,
  },
  content: {
    height: height - 50,
    backgroundColor: colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 'auto',
    padding: 10,
  },
  decoration: {
    height: 5,
    width: 36,
    backgroundColor: colors.gray,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 2.5,
  },
  closeModal: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 18,
    color: colors.primary,
  },
  loginText: {
    marginVertical: 10,
  },
  loginDescription: {
    color: colors.lightGray,
    fontSize: 18,
    textAlign: 'justify',
  },
  input: {
    marginVertical: 10,
  },
  scrollView: {
    backgroundColor: colors.white,
    flex: 1,
  },
  button: {
    marginTop: 'auto',
  },
});
