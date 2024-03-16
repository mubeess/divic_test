import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';
import {AvatarImage, LogoBlue} from '../../assets/Images';
import {BellIcon} from '../../assets/Svg';

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Image source={AvatarImage} style={styles.avataraImage} />
      </View>
      <Image resizeMode="contain" source={LogoBlue} />
      <TouchableOpacity style={styles.notification}>
        <BellIcon color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    width: '100%',
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },

  notification: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: colors.inputBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avataraImage: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
});
