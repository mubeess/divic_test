import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../utils/colors';
import CheckBox from '../../../components/Inputs/CheckBox';
import {BoxImage} from '../../../assets/Images';
import Text from '../../../components/Text/Text';
import {ArrowRightIcon, ExpandIcon} from '../../../assets/Svg';
import Animated, {Easing, FadeIn} from 'react-native-reanimated';
export interface ItemProps {
  name: string;
  origin_state: string;
  destination_state: string;
  status: string;
  company_currency: string;
  markAll?: boolean;
}
export default function ShipmentList({
  name,
  origin_state,
  status,
  company_currency,
  destination_state,
  markAll,
}: ItemProps) {
  const [marked, setMarked] = useState(false);
  const toggleMark = () => {
    setMarked(prev => !prev);
  };
  return (
    <Animated.View
      entering={FadeIn.duration(500).easing(Easing.ease)}
      style={styles.container}>
      <CheckBox isChecked={markAll ? markAll : marked} onCheck={toggleMark} />
      <Image resizeMode="contain" style={styles.box} source={BoxImage} />
      <View style={styles.details}>
        <Text style={styles.name}>{company_currency}</Text>
        <Text numberOfLines={1} h2>
          {name}
        </Text>
        <View style={styles.location}>
          <Text style={styles.locationText}>{origin_state}</Text>
          <ArrowRightIcon color={colors.primary} />
          <Text style={styles.locationText}>{destination_state}</Text>
        </View>
      </View>

      <View style={[styles.status, {borderColor: colors.white}]}>
        <Text style={{color: colors.primary}}>{status}</Text>
      </View>

      <TouchableOpacity activeOpacity={0.7} style={styles.expand}>
        <ExpandIcon color={colors.primary} />
      </TouchableOpacity>
    </Animated.View>
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
    marginBottom: 10,
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
    fontSize: 10,
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
