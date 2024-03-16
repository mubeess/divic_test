import {StatusBar, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../utils/colors';
import Header from '../../../components/Header/Header';
import Text from '../../../components/Text/Text';
import MyInput from '../../../components/Inputs/MyInput';
import {FilterIcon, ScanIcon, SearchIcon} from '../../../assets/Svg';
import Button from '../../../components/Buttons/Button';
import CheckBox from '../../../components/Inputs/CheckBox';
import ShipmentList from '../components/ShipmentList';

export default function Home() {
  const [markAll, setMarkAll] = useState(false);
  const toggleMarkAll = () => {
    setMarkAll(prev => !prev);
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Header />
      <Text style={styles.hello}>Hello,</Text>
      <Text h1>Mubarak Ibrahim</Text>
      <MyInput
        IconLeft={<SearchIcon color={colors.gray} />}
        placeholder="Search"
      />
      <View style={styles.actionButtons}>
        <Button
          backgroundColor={colors.inputBg}
          IconLeft={<FilterIcon color={colors.iconColor} />}
          style={styles.button}
          fontColor={colors.iconColor}
          label="Filters"
        />
        <Button
          IconLeft={<ScanIcon color={colors.white} />}
          style={styles.button}
          label="Add Scan"
        />
      </View>

      <View style={styles.shipmentSelection}>
        <Text h1>Shipment</Text>

        <View style={styles.checkBoxContainer}>
          <CheckBox isChecked={markAll} onCheck={toggleMarkAll} />
          <Text>Mark All</Text>
        </View>
      </View>

      <ShipmentList />
      <ShipmentList />
      <ShipmentList />
      <ShipmentList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  hello: {
    color: colors.lightGray,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  button: {
    width: '45%',
    height: 44,
  },
  shipmentSelection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
