import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../../utils/colors';
import Header from '../../../components/Header/Header';
import Text from '../../../components/Text/Text';
import MyInput from '../../../components/Inputs/MyInput';
import {FilterIcon, ScanIcon, SearchIcon} from '../../../assets/Svg';
import Button from '../../../components/Buttons/Button';
import CheckBox from '../../../components/Inputs/CheckBox';
import ShipmentList from '../components/ShipmentList';
import {useGetShipMentsQuery} from '../../../redux/api/apiSlice';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import FilterModal from '../components/FilterModal';

export default function Home() {
  const [markAll, setMarkAll] = useState(false);
  const user = useSelector(data => data.user.user);
  const [filterOpen, setFilterOpen] = useState(false);
  const openFilter = () => {
    setFilterOpen(true);
  };

  const closeFilter = () => {
    setFilterOpen(false);
  };
  const toggleMarkAll = () => {
    setMarkAll(prev => !prev);
  };
  const {data, error, isLoading, refetch, isFetching} =
    useGetShipMentsQuery('');

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'An error occurred',
        text2: 'Error Loading Data',
      });
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Header />
      <Text style={styles.hello}>Hello,</Text>
      <Text h1>{user.name}</Text>
      <MyInput
        IconLeft={<SearchIcon color={colors.gray} />}
        placeholder="Search"
      />
      <View style={styles.actionButtons}>
        <Button
          onPress={openFilter}
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
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} />
        </View>
      )}
      {!isLoading && (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={refetch} />
          }
          data={data ? data.message : []}
          renderItem={({item}) => <ShipmentList markAll={markAll} {...item} />}
          keyExtractor={item => item.name}
        />
      )}
      <FilterModal close={closeFilter} isOpen={filterOpen} />
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
  loading: {
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
