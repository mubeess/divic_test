import {Image, StatusBar, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

import {colors} from '../../utils/colors';
import {LogoImage} from '../../assets/Images';
import Button from '../../components/Buttons/Button';
import LoginModal from './components/LoginModal';

export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <View style={styles.conntainer}>
      <StatusBar backgroundColor={colors.primary} />
      <Image resizeMode="contain" source={LogoImage} style={styles.logo} />
      <Button
        label="Login"
        backgroundColor={colors.white}
        fontColor={colors.primary}
        onPress={openModal}
        style={styles.button}
      />
      <LoginModal isOpen={isModalOpen} closeModal={closeModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  conntainer: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    height: 36,
    width: '100%',
    marginTop: 'auto',
  },
  button: {
    marginTop: 'auto',
  },
  buttonText: {
    color: colors.primary,
  },
});
