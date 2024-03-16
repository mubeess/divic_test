import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../utils/colors';
import CheckBox from '../../../components/Inputs/CheckBox';
import {BoxImage} from '../../../assets/Images';
import Text from '../../../components/Text/Text';
import {ArrowRightIcon, ExpandIcon} from '../../../assets/Svg';

export default function ShipmentList() {
  const [marked, setMarked] = useState(false);
  const toggleMark = () => {
    setMarked(prev => !prev);
  };
  return (
    <View style={styles.container}>
      <CheckBox isChecked={marked} onCheck={toggleMark} />
      <Image resizeMode="contain" style={styles.box} source={BoxImage} />
      <View style={styles.details}>
        <Text style={styles.name}>AWB</Text>
        <Text h2>41785691423</Text>
        <View style={styles.location}>
          <Text style={styles.locationText}>Cairo</Text>
          <ArrowRightIcon color={colors.primary} />
          <Text style={styles.locationText}>Nigeria</Text>
        </View>
      </View>

      <View style={[styles.status, {borderColor: colors.white}]}>
        <Text style={{color: colors.primary}}>Recieved</Text>
      </View>

      <TouchableOpacity activeOpacity={0.7} style={styles.expand}>
        <ExpandIcon color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 67,
    width: '100%',
    backgroundColor: colors.inputBg,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 15,
  },
  box: {
    height: 40,
    width: 40,
  },
  details: {
    flex: 1,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 13,
  },
  name: {
    fontSize: 13,
    color: '#3F395C',
  },
  status: {
    height: 23,
    backgroundColor: colors.primaryLight,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  expand: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
