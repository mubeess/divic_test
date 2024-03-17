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
import * as Yup from 'yup';
import {RootStackParamList} from '../../../Navigations/Stack/MainAppStack';
import {StackNavigationProp} from '@react-navigation/stack';
import {useFormik} from 'formik';
import {useLoginUserMutation} from '../../../redux/api/apiSlice';
import {useEffect} from 'react';
import {handleError} from '../../../utils';
import {useAppDispatch} from '../../../redux';
import {setUser} from '../../../redux/slices/userSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

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
  const sharedValue = useSharedValue(0);
  const animatedErrorStyle = useAnimatedStyle(() => {
    return {
      transform: [{scaleY: sharedValue.value}],
    };
  });
  const dispatch = useAppDispatch();
  const [loginUser, {error, isLoading, data, isSuccess, isError}] =
    useLoginUserMutation();
  const initialValues = {
    usr: '',
    pwd: '',
  };
  const displayError = () => {
    sharedValue.value = withTiming(1, {duration: 1000});
    setTimeout(() => {
      sharedValue.value = withTiming(0, {duration: 500});
    }, 4000);
  };
  const validationSchema = Yup.object({
    usr: Yup.string().required('Email/User Name is required'),
    pwd: Yup.string()
      .min(7, 'Password must be more than 6 characters')
      .required(),
  });
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async values => {
      await loginUser(values);
    },
  });
  const {handleChange, handleSubmit, values, errors} = formik;
  const {pwd, usr} = values;
  const routeToDashBoard = async () => {
    await AsyncStorage.setItem(
      'credentials',
      JSON.stringify({username: usr, fullname: data.name}),
    );

    navigation.navigate('Dashboard');
    closeModal();
  };
  const clearCache = async () => {
    await AsyncStorage.removeItem('token');
  };
  useEffect(() => {
    if (isError && error) {
      displayError();
    }
  }, [error, isError]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setUser({
          name: data.full_name,
          image: '',
          token: data.home_page,
        }),
      );
      routeToDashBoard();
    }
  }, [isSuccess, data]);

  useEffect(() => {
    clearCache();
  }, []);

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

            <Animated.View style={[styles.error, animatedErrorStyle]}>
              <Text style={styles.erroText}>{error?.data?.message}</Text>
            </Animated.View>

            <Text style={styles.loginText} h1>
              Login
            </Text>
            <Text style={styles.loginDescription}>
              Please enter Your Login Details Below To Proceed
            </Text>

            <Input
              error={Boolean(formik.touched.usr && errors.usr)}
              value={usr}
              onChange={handleChange('usr')}
              style={styles.input}
              label="Username/Email"
            />
            {formik.touched.usr && errors.usr ? (
              <Text style={{color: 'red'}}>{errors.usr}</Text>
            ) : null}
            <Input
              error={Boolean(formik.touched.pwd && errors.pwd)}
              secureEntry={true}
              value={pwd}
              onChange={handleChange('pwd')}
              style={styles.input}
              label="Password"
            />
            {formik.touched.pwd && errors.pwd ? (
              <Text style={{color: 'red'}}>{errors.pwd}</Text>
            ) : null}
            <Button
              isLoading={isLoading}
              disabled={Boolean(!usr || !pwd)}
              onPress={handleSubmit}
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
    position: 'relative',
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
  error: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f2252523',
    borderWidth: 1,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    marginTop: 40,
    marginLeft: 10,
    zIndex: 999999999999,
  },
  erroText: {
    color: 'red',
    textAlign: 'center',
  },
});
