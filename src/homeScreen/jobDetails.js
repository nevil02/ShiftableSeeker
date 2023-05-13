import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../theme/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {horizontalScale, moderateScale, verticalScale} from '../theme/scalling';
import {Fonts} from '../theme';
import {Icons} from '../theme/icons';
import {Images} from '../theme/images';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import RBSheet from 'react-native-raw-bottom-sheet';
import DropDown from '../Component/HomeComponent/DropDown';
import CustomeDropdown from '../Component/HomeComponent/CustomeDropdown';

const Details = [
  {
    id: 0,
    title: 'Avg Recall',
    ans: '50 mins',
  },
  {
    id: 1,
    title: 'Software',
    ans: 'Dentrix',
  },
  {
    id: 2,
    title: 'Dentrix',
    ans: 'Phosphour Plates',
  },
  {
    id: 3,
    title: 'Ultrasonic',
    ans: 'Cavitron',
  },
  {
    id: 4,
    title: 'Charting',
    ans: 'Digital Charts',
  },
  {
    id: 5,
    title: 'Lunch Time',
    ans: 'Paid',
  },
  {
    id: 6,
    title: 'Parking',
    ans: 'Pay Parking @ Public Lot',
  },
];

const data = [
  {key: '1', name: '$50/hr (Recomended)'},
  {key: '2', name: '$100/hr'},
  {key: '3', name: '$150/hr'},
  {key: '4', name: '$200/hr'},
];

const {height, width} = Dimensions.get('window');

const JobDetails = ({navigation}) => {
  const [selected, setSelected] = useState('$50/hr');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSubmited, setSubmited] = useState(false);
  const [selectRecommendation, setSelectRecommendation] = useState({
    id: '',
    name: '$50/hr (Recomended)',
  });
  const [openDropDownModal, setOpenDropDownModal] = useState(false);
  const refRBSheet = useRef();

  const openGps = val => {
    var lat = val.nativeEvent.coordinate.latitude;
    var lng = val.nativeEvent.coordinate.longitude;
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    var url = scheme + `${lat},${lng}`;
    Linking.openURL(url);
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={{flexDirection: 'row', paddingBottom: verticalScale(20)}}>
        <View style={{flex: 1}}>
          <Text style={styles.render_title}>{item.title}</Text>
        </View>
        <View style={{flex: 1.5}}>
          <Text
            style={[styles.render_title, {fontFamily: Fonts.satoshi_medium}]}>
            {item.ans}
          </Text>
        </View>
      </View>
    );
  };

  const modal_renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.modal_render_container}
        onPress={() => {
          setSelected(item.value);
          setModalVisible(!isModalVisible);
        }}>
        <Text style={styles.render_title}>{item.value}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header_container}>
        <Text style={styles.header_title}>Job Details</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={25} color={Colors.white} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: verticalScale(25),
          backgroundColor: Colors.gray[100],
        }}>
        <Text style={styles.requirement_title}>Job Requirements</Text>
        <View style={styles.job_require_container}>
          <View style={styles.row_container}>
            <View style={styles.date_container}>
              <View style={styles.inner_row_view}>
                <Image
                  source={Icons.calenda_outline}
                  style={{width: moderateScale(12), height: moderateScale(12)}}
                />
                <Text style={styles.sub_title}>Dates</Text>
              </View>
              <Text style={styles.title}>25 - 28 Nov, 2022</Text>
            </View>
            <View style={styles.date_container}>
              <View style={styles.inner_row_view}>
                <Image
                  source={Icons.dollar}
                  style={{width: moderateScale(12), height: moderateScale(12)}}
                />
                <Text style={styles.sub_title}>Price range</Text>
              </View>
              <Text style={styles.title}>$45 - $60/hr</Text>
            </View>
          </View>
          <View style={[styles.row_container, {paddingTop: verticalScale(20)}]}>
            <View style={styles.date_container}>
              <View style={styles.inner_row_view}>
                <Image
                  source={Icons.education}
                  style={{width: moderateScale(12), height: moderateScale(12)}}
                />
                <Text style={styles.sub_title}>Qualification</Text>
              </View>
              <Text style={styles.title}>Dental Hygienist, RDH</Text>
            </View>
            <View style={styles.date_container}>
              <View style={styles.inner_row_view}>
                <Image
                  source={Icons.Clock_dark}
                  style={{width: moderateScale(12), height: moderateScale(12)}}
                />
                <Text style={styles.sub_title}>Timeslot</Text>
              </View>
              <Text style={styles.title}>2:30pm - 6:50pm (6 hrs)</Text>
            </View>
          </View>
        </View>
        <View style={styles.horizontal_line} />
        <View style={styles.profile_container}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.profile_image_round}>
              <Image source={Images.dummy_profile} />
            </View>
            <View style={{paddingLeft: verticalScale(10)}}>
              <Text style={styles.username}>Roger Kadama</Text>
              <Text style={styles.phone_number}>+1 (647) 948-6676</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.call_container}
            onPress={() => Linking.openURL(`tel:${'+1(647)947-6676'}`)}>
            <Image
              source={Icons.Call}
              style={{width: moderateScale(19), height: moderateScale(19)}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.horizontal_line} />
        <View style={styles.address_container}>
          <Text style={styles.username}>Abadeh Dentals & Teeth Care</Text>
          <Image
            source={Icons.heart_light}
            style={{width: moderateScale(18), height: moderateScale(16)}}
          />
        </View>
        <Text style={styles.address_text}>
          Unit 101 - 332 Sheppard Ave, Ontario, Canada
        </Text>
        <Text style={styles.address_text}>M2N 3B4</Text>
        <View style={styles.map_container}>
          <MapView
            region={{
              latitude: 23.0235062,
              longitude: 72.5323024,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            onPress={openGps}
            style={styles.map}
            mapType={'standard'}>
            <Marker
              coordinate={{
                latitude: 23.0235062,
                longitude: 72.5323024,
              }}>
              <View style={styles.map_marker_container}>
                <View style={styles.map_marker_inner_view} />
              </View>
            </Marker>
          </MapView>
        </View>
        <View style={styles.details_container}>
          <FlatList data={Details} renderItem={renderItem} />
        </View>
      </ScrollView>

      {isSubmited ? (
        <View
          style={[styles.bottom_container, {justifyContent: 'space-between'}]}>
          <Text style={styles.render_title}>{selected}</Text>
          <TouchableOpacity
            style={styles.cancel_button}
            onPress={() => refRBSheet.current.open()}>
            <Text style={styles.cancel_text}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.bottom_container}>
          <View style={{flex: 1.5}}>
            {/* <DropDown
              selectedValue={selectRecommendation.value}
              placeholder={selectRecommendation.value}
              data={data}
              labelField={'value'}
              valueField={'value'}
              dropdown={styles.country_dropdown}
              selected={item =>
                setSelectRecommendation({
                  id: item.id,
                  value: item.value,
                })
              }
              placeholderStyle={{color: Colors.black}}
              key={'value'}
            /> */}

            <CustomeDropdown
              selectedProfession={selectRecommendation.name}
              data={data}
              title_text=""
              excaimination_image={false}
              setOpenDropDownModal={() =>
                setOpenDropDownModal(!openDropDownModal)
              }
              openModal={openDropDownModal}
              selectItem={item => {
                setSelectRecommendation({
                  id: item.id,
                  name: item.name,
                }),
                  setOpenDropDownModal(false);
              }}
              placeholder_text={selectRecommendation.name}
              closeModal={() =>
                setOpenDropDownModal(!openDropDownModal)
              }
            />
          </View>

          <TouchableOpacity
            style={styles.submit_button}
            onPress={() => setSubmited(true)}>
            <Text
              style={[
                styles.render_title,
                {color: Colors.white, fontSize: moderateScale(15)},
              ]}>
              Submit
            </Text>
            <MaterialIcons
              name="arrow-forward"
              size={20}
              color={Colors.white}
            />
          </TouchableOpacity>
        </View>
      )}

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        customStyles={{
          draggableIcon: {
            backgroundColor: Colors.gray[300],
          },
          container: {
            borderTopLeftRadius: moderateScale(20),
            borderTopRightRadius: moderateScale(20),
          },
        }}
        height={470}
        openDuration={250}>
        <View style={styles.rbsheet_mainView}>
          <Text style={styles.sheet_heading}>Cancelling this shift?</Text>
          <Text style={styles.sheet_title}>
            Please select your reason for cancelling
          </Text>
          <View style={styles.sheet_input_container}>
            <Text style={styles.sheet_input_text}>
              I got a better deal somew`here else.
            </Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={25}
              color={Colors.black}
            />
          </View>
          <View style={styles.sheet_alert_container}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={Icons.alert_circle}
                style={{width: moderateScale(20), height: moderateScale(20)}}
              />
              <Text style={styles.sheet_alet_title}>Attention</Text>
            </View>
            <Text style={styles.sheet_alert_des}>
              You are cancelling with less than 12 hrs left! Shiftable strives
              to maintain balance in commitments. If you cancel now, your time
              slot of{' '}
              <Text style={{fontFamily: Fonts.satoshi_bold}}>
                2:30 pm - 6:30 pm
              </Text>{' '}
              will be blocked for{' '}
              <Text style={{fontFamily: Fonts.satoshi_bold}}>1 hour</Text>.
              During this you won’t be able to see any jobs which overlaps with
              this time slot.
            </Text>
          </View>
          <View style={styles.sheet_button_container}>
            <TouchableOpacity
              style={styles.sheet_button}
              onPress={() => refRBSheet.current.close()}>
              <Text style={styles.sheet_button_text}>I changed my mind</Text>
            </TouchableOpacity>
            <View style={{flex: 0.1}} />
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.close();
                setSubmited(!isSubmited);
              }}
              style={[styles.sheet_button, {backgroundColor: Colors.red[50]}]}>
              <Text
                style={[styles.sheet_button_text, {color: Colors.red[500]}]}>
                Cancel Anyway
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};
export default JobDetails;

const styles = StyleSheet.create({
  country_dropdown: {
    backgroundColor: Colors.white,
    flex: 1,
    borderColor: Colors.gray[400],
    borderWidth: 0.8,
    borderRadius: 8,
    paddingHorizontal: moderateScale(2),
  },
  header_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.blue[500],
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(15),
  },
  header_title: {
    fontFamily: Fonts.satoshi_bold,
    fontSize: moderateScale(20),
    color: Colors.white,
  },
  requirement_title: {
    fontFamily: Fonts.satoshi_bold,
    fontSize: moderateScale(18),
    color: Colors.black,
    marginTop: verticalScale(15),
    marginHorizontal: horizontalScale(15),
  },
  job_require_container: {
    padding: 15,
  },
  row_container: {
    flexDirection: 'row',
  },
  inner_row_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date_container: {
    flex: 1,
  },
  sub_title: {
    fontFamily: Fonts.satoshi_regular,
    color: Colors.gray[900],
    fontSize: moderateScale(14),
    marginLeft: horizontalScale(5),
  },
  title: {
    fontFamily: Fonts.satoshi_medium,
    color: Colors.gray[900],
    fontSize: moderateScale(16),
    marginTop: verticalScale(2),
  },
  horizontal_line: {
    borderTopColor: Colors.gray[200],
    borderTopWidth: moderateScale(1),
  },
  profile_container: {
    paddingHorizontal: horizontalScale(15),
    flexDirection: 'row',
    paddingVertical: verticalScale(20),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profile_image_round: {
    borderRadius: moderateScale(50),
    backgroundColor: Colors.pink[400],
  },
  username: {
    fontFamily: Fonts.satoshi_bold,
    color: Colors.gray[900],
    fontSize: moderateScale(18),
  },
  phone_number: {
    fontFamily: Fonts.satoshi_regular,
    color: Colors.gray[700],
    fontSize: moderateScale(16),
  },
  call_container: {
    borderRadius: moderateScale(40),
    backgroundColor: Colors.purple[100],
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(38),
    height: moderateScale(38),
  },
  address_container: {
    flexDirection: 'row',
    paddingTop: verticalScale(20),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(15),
  },
  address_text: {
    fontFamily: Fonts.satoshi_regular,
    color: Colors.gray[700],
    fontSize: moderateScale(14),
    marginHorizontal: horizontalScale(15),
    marginTop: verticalScale(2),
  },
  map_container: {
    height: moderateScale(198),
    width: '100%',
    paddingHorizontal: horizontalScale(15),
    borderRadius: moderateScale(25),
    paddingVertical: verticalScale(20),
  },
  map: {
    flex: 1,
    borderRadius: moderateScale(25),
  },
  map_marker_container: {
    borderRadius: moderateScale(24),
    width: moderateScale(44),
    height: moderateScale(44),
    backgroundColor: 'rgba(59, 130, 246, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map_marker_inner_view: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    borderColor: Colors.blue[500],
    borderWidth: moderateScale(2),
    backgroundColor: Colors.white,
  },
  details_container: {
    paddingHorizontal: horizontalScale(15),
  },
  render_title: {
    fontFamily: Fonts.satoshi_bold,
    color: Colors.gray[900],
    fontSize: moderateScale(14),
  },
  bottom_container: {
    shadowColor: Colors.gray[500],
    backgroundColor: Colors.white,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    elevation: 10,
    shadowOpacity: 1,
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
    alignItems: 'center',
  },
  price_selector: {
    borderColor: '#CECECE',
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    borderRadius: moderateScale(5),
    flex: 1.5,
  },
  submit_button: {
    backgroundColor: Colors.blue[500],
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: moderateScale(5),
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(14),
    marginLeft: horizontalScale(10),
  },
  modal_render_container: {
    borderBottomColor: Colors.gray[500],
    borderBottomWidth: 0.5,
    marginTop: verticalScale(10),
    alignItems: 'center',
    height: 30,
  },
  cancel_button: {
    paddingHorizontal: horizontalScale(55),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(15),
    borderRadius: moderateScale(5),
    backgroundColor: 'rgba(249, 168, 212, 0.3)',
  },
  cancel_text: {
    fontFamily: Fonts.satoshi_bold,
    fontSize: moderateScale(15),
    color: '#EF4444',
  },
  rbsheet_mainView: {
    padding: 15,
    // paddingHorizontal: horizontalScale(15),
    // paddingVertical: verticalScale(15),
  },
  sheet_heading: {
    fontFamily: Fonts.satoshi_bold,
    color: Colors.gray[900],
    fontSize: moderateScale(24),
  },
  sheet_title: {
    fontFamily: Fonts.satoshi_medium,
    color: Colors.gray[900],
    fontSize: moderateScale(16),
    marginTop: verticalScale(20),
  },
  sheet_input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: Colors.gray[200],
    borderWidth: 1,
    borderRadius: moderateScale(4),
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(10),
    marginVertical: verticalScale(10),
  },
  sheet_input_text: {
    fontFamily: Fonts.satoshi_regular,
    color: Colors.gray[900],
    fontSize: moderateScale(14),
  },
  sheet_alert_container: {
    backgroundColor: Colors.red[50],
    padding: 15,
    marginTop: verticalScale(10),
    borderRadius: 4,
  },
  sheet_alet_title: {
    fontFamily: Fonts.satoshi_bold,
    color: Colors.red[500],
    fontSize: moderateScale(16),
    marginLeft: horizontalScale(5),
  },
  sheet_alert_des: {
    fontFamily: Fonts.satoshi_regular,
    color: Colors.red[500],
    fontSize: moderateScale(14),
    textAlign: 'justify',
    marginTop: verticalScale(10),
  },
  sheet_button_container: {
    flexDirection: 'row',
    paddingVertical: verticalScale(15),
  },
  sheet_button: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(20),
    borderRadius: moderateScale(5),
  },
  sheet_button_text: {
    fontFamily: Fonts.satoshi_bold,
    color: '#111827',
    fontSize: moderateScale(15),
  },
});
