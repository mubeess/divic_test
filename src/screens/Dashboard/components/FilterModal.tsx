import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {colors} from '../../../utils/colors';
import Text from '../../../components/Text/Text';
import {useGetFiltersQuery} from '../../../redux/api/apiSlice';
import Toast from 'react-native-toast-message';
interface FilterModalProps {
  isOpen?: boolean;
  close: () => void;
}
export default function FilterModal({isOpen, close}: FilterModalProps) {
  const {data, error, isLoading} = useGetFiltersQuery('');

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'An error occurred',
        text2: 'Error Loading Filters',
      });
    }
  }, [error]);
  return (
    <Modal animationType="slide" transparent={true} visible={isOpen}>
      <View style={styles.overLay}>
        <View style={styles.content}>
          <View style={styles.decoration} />
          <View style={styles.actionButtons}>
            <TouchableOpacity onPress={close}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <Text h2>Filters</Text>
            <TouchableOpacity onPress={close}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>

          <Text
            h2
            style={{
              fontWeight: '500',
              fontSize: 13,
              marginVertical: 10,
              marginLeft: 20,
            }}>
            SHIPMENT STATUS
          </Text>

          {isLoading && (
            <View style={styles.loading}>
              <ActivityIndicator color={colors.primary} />
            </View>
          )}

          <View style={styles.list}>
            {!isLoading &&
              data &&
              data.message.map(item => (
                <TouchableOpacity
                  onPress={() => {
                    console.log(item);
                  }}
                  key={item.name}
                  style={styles.itemButton}>
                  <Text style={styles.text}>{item.name}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overLay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  content: {
    marginTop: 'auto',
    height: Dimensions.get('window').height / 2,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
  },
  decoration: {
    height: 5,
    width: 36,
    backgroundColor: colors.gray,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 2.5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBg,
    padding: 20,
  },
  buttonText: {
    color: colors.primary,
    fontSize: 16,
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  itemButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.inputBg,
    borderRadius: 10,
  },
  text: {
    color: '#58536E',
    fontSize: 14,
    textTransform: 'capitalize',
  },
});
