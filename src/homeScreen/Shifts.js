import React, {useState, useRef, useMemo} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  Dimensions,
  TextInput,
  Platform,
} from 'react-native';
import MainHeader from '../Component/HomeComponent/MainHeader';
import Colors from '../theme/Colors';
import {moderateScale} from '../theme/scalling';
import {Images} from '../theme/images';
import {Icons} from '../theme/icons';
import {JobList} from '../theme/ConstantArray';
import {Fonts} from '../theme';
import JobilstComp from '../Component/HomeComponent/JobDetails';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Rating, AirbnbRating} from 'react-native-ratings';
import YesNoButton from '../Component/HomeComponent/YesNoButton';
import {Calendar} from 'react-native-calendars';
import {changeMonth} from '../theme/controller';
import {SafeAreaView} from 'react-native-safe-area-context';
import ConformationModal from '../Component/HomeComponent/ConformationModal';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

const Shifts = ({navigation}) => {
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [openConfirmationModal, SetOpenConfirmationModal] = useState(false);
  const [isItem, setIsItem] = useState();
  const [jobData, setJobData] = useState(JobList);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const showDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const refRBSheet = useRef();

  const likeOrdislikeJob = () => {
    let temp = jobData;

    temp.map((mapItem, mapIndex) => {
      if (mapItem.id === isItem.id) {
        if (mapItem.isFavourite !== undefined) {
          if (mapItem.isFavourite === true) {
            mapItem.isFavourite = false;
          } else {
            mapItem.isFavourite = true;
          }
        } else {
          temp[mapIndex] = {...mapItem, isFavourite: true};
        }
      }
    });
    console.log('temp :::', JSON.stringify(temp));
    setJobData([...temp]);
    SetOpenConfirmationModal(false);
  };

  const selectdDate = date => {
    if (date !== null) {
      if (!startDate) {
        setStartDate(moment(date).format('MMM DD,YYYY'));
        setSelectedStartDate(date);
      } else if (!endDate) {
        setSelectedEndDate(date);
        setEndDate(moment(date).format('MMM DD,YYYY'));
        setDatePickerVisibility(!isDatePickerVisible);
      } else {
        setStartDate(moment(date).format('MMM DD,YYYY'));
        setSelectedStartDate(date);
        setEndDate('');
        setSelectedEndDate('');
      }
    } else {
      console.log('Invalid Date :::');
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <MainHeader
        isShowLogo={false}
        text="Shifts"
        bellAction={() => navigation.navigate('Notification')}
        openProfile={() => navigation.navigate('MyProfile')}
      />
      <View style={{padding: moderateScale(20), backgroundColor: Colors.white}}>
        <View style={styles.calender_view}>
          <TouchableOpacity
            style={styles.calender_first_View}
            onPress={showDatePicker}>
            <Image
              source={Icons.calenda_outline}
              style={styles.calender_image}
            />
            <Text style={styles.date_text}>
              {startDate == '' ? 'select Date' : startDate}
            </Text>
            <Image source={Icons.Dote} style={{marginLeft: moderateScale(5)}} />
            <Text style={styles.date_text}>{endDate}</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.openJob_text}>24 Jobs Open</Text>
          </View>
        </View>
        {isDatePickerVisible && (
          <CalendarPicker
            multipleDates={[startDate, endDate]}
            allowRangeSelection={true}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            onDateChange={selectdDate}
            // minDate={new Date()}
            selectedDayTextColor="#FFFFFF"
            selectedRangeStyle={{backgroundColor: Colors.blue[500]}}
            selectedRangeStartStyle={{backgroundColor: Colors.blue[500]}}
            selectedRangeEndStyle={{backgroundColor: Colors.blue[500]}}
          />
        )}
        <TouchableOpacity
          style={styles.openCalender_button}
          onPress={showDatePicker}
        />
      </View>
      <FlatList
        data={JobList}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <>
              <JobilstComp
                index={index}
                item={item}
                lastView={'Shift'}
                arraylength={JobList.length - 1}
                status={'completed'}
                send_invoice={() => refRBSheet.current.open()}
                reviewModall={() => setOpenReviewModal(true)}
                likePress={() => {
                  SetOpenConfirmationModal(true), setIsItem(item);
                }}
              />
            </>
          );
        }}
      />
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
          <Text style={styles.rbSheet_header_text}>Send Invoice</Text>
          <Text style={styles.textInpute_titlle}>Total Hours Worked*</Text>
          <View style={styles.textinpute_view}>
            <TextInput
              style={styles.textinpute}
              placeholder={'Enter here...'}
              placeholderTextColor={Colors.gray[500]}
            />
            <Text style={styles.hours_text}>Hours</Text>
          </View>
          <Text style={styles.textInpute_titlle}>
            Hourly Price (You were hired at $45/Hr) *
          </Text>
          <View style={styles.textinpute_view}>
            <TextInput
              style={styles.textinpute}
              placeholder={'Enter here...'}
              placeholderTextColor={Colors.gray[500]}
            />
          </View>
          <View
            style={{
              padding: moderateScale(13),
              marginVertical: moderateScale(10),
              backgroundColor: Colors.red[50],
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={Icons.alert_circle}
                style={{width: moderateScale(20), height: moderateScale(20)}}
              />
              <Text
                style={{
                  color: Colors.red[500],
                  fontFamily: Fonts.satoshi_bold,
                  marginLeft: moderateScale(5),
                }}>
                Attention
              </Text>
            </View>
            <Text
              style={{
                color: Colors.red[500],
                fontFamily: Fonts.satoshi_regular,
                marginLeft: moderateScale(5),
                textAlign: 'justify',
                marginTop: moderateScale(5),
                fontSize: moderateScale(13),
              }}>
              You are changing the Hourly Price at which this clinic hired you.
              Please note that this can lead to payment disputes in future. Talk
              to the clinic owner before sending the invoice.
            </Text>
          </View>
          <YesNoButton
            first_button_backgroundColor={Colors.borderColor}
            first_button_color={Colors.black}
            first_button_text={'Do it later'}
            second_button_backgroundColor={Colors.sky_color}
            second_button_color={Colors.white}
            second_button_text={'Send invoice'}
            first_button_call={() => refRBSheet.current.close()}
            second_button_call={() => refRBSheet.current.close()}
            flex1={1}
            flex2={1}
            second_button_image={false}
          />
        </View>
      </RBSheet>
      <Modal
        transparent={true}
        visible={openReviewModal}
        onRequestClose={() => setOpenReviewModal(false)}>
        <View style={{flex: 1}}>
          <Image
            source={Images.BlackBackground}
            style={styles.modal_backgroundimage}
          />
          <View style={styles.review_modal}>
            <Text
              style={[
                styles.rbSheet_header_text,
                {fontSize: moderateScale(17)},
              ]}>
              Abadeh Dentals & Teeth Care
            </Text>
            <View style={styles.rating_mainView}>
              <View style={styles.rating_view}>
                <Image source={Icons.star} style={styles.start_image} />
                <Text style={styles.reviewrate_text}>4.5 (12)</Text>
              </View>
              <View
                style={[styles.rating_view, {marginLeft: moderateScale(12)}]}>
                <Image
                  source={Icons.pin}
                  style={[styles.start_image, {width: moderateScale(10)}]}
                />
                <Text style={styles.reviewrate_text}>KM102 | 6 kms away</Text>
              </View>
            </View>
            <View style={styles.rating_mainView}>
              <Text
                style={[
                  styles.reviewrate_text,
                  {
                    fontSize: moderateScale(13),
                    color: Colors.black,
                    fontFamily: Fonts.satoshi_medium,
                  },
                ]}>
                12 Nov 2022
              </Text>
              <Image
                source={Icons.Dote}
                style={{
                  tintColor: Colors.gray[200],
                  marginHorizontal: moderateScale(10),
                }}
              />
              <Text
                style={[
                  styles.reviewrate_text,
                  {
                    fontSize: moderateScale(13),
                    color: Colors.black,
                    fontFamily: Fonts.satoshi_medium,
                  },
                ]}>
                6 Hrs
              </Text>
              <Image
                source={Icons.Dote}
                style={{
                  tintColor: Colors.gray[200],
                  marginHorizontal: moderateScale(10),
                }}
              />
              <Text
                style={[
                  styles.reviewrate_text,
                  {
                    fontSize: moderateScale(13),
                    color: Colors.black,
                    fontFamily: Fonts.satoshi_medium,
                  },
                ]}>
                $50/hr
              </Text>
            </View>
            <View style={styles.review_modal_rating_view}>
              <Text style={styles.review_modal_rating_question}>
                1. How would you rate their work standards?
              </Text>
              <View
                style={{alignItems: 'flex-start', marginTop: moderateScale(3)}}>
                <AirbnbRating
                  count={5}
                  defaultRating={2}
                  size={17}
                  reviews={[]}
                  showRating={false}
                />
              </View>
              <Text
                style={[
                  styles.review_modal_rating_question,
                  {marginTop: moderateScale(13)},
                ]}>
                2. Was the staff polite and professional?
              </Text>
              <View
                style={{alignItems: 'flex-start', marginTop: moderateScale(3)}}>
                <AirbnbRating
                  count={5}
                  defaultRating={2}
                  size={17}
                  reviews={[]}
                  showRating={false}
                />
              </View>
              <Text
                style={[
                  styles.review_modal_rating_question,
                  {marginTop: moderateScale(13)},
                ]}>
                3. How much did you like working there?
              </Text>
              <View
                style={{alignItems: 'flex-start', marginTop: moderateScale(3)}}>
                <AirbnbRating
                  count={5}
                  defaultRating={2}
                  size={17}
                  reviews={[]}
                  showRating={false}
                />
              </View>
            </View>
            <YesNoButton
              first_button_backgroundColor={Colors.borderColor}
              first_button_color={Colors.black}
              first_button_text={'Cancel'}
              second_button_backgroundColor={Colors.sky_color}
              second_button_color={Colors.white}
              second_button_text={'Submit Review'}
              first_button_call={() => setOpenReviewModal(false)}
              second_button_call={() => setOpenReviewModal(false)}
              flex1={1}
              flex2={1}
              second_button_image={false}
            />
          </View>
        </View>
      </Modal>
      <ConformationModal
        NoButton={() => SetOpenConfirmationModal(false)}
        YesButton={() => likeOrdislikeJob()}
        header={
          isItem !== undefined && isItem.isFavourite === true
            ? ' Do you want to remove this job from favorites?'
            : 'Do you want to add this job to favorites?'
        }
        no_text="No"
        openConfirmationModal={openConfirmationModal}
        yes_text="Yes"
      />
    </SafeAreaView>
  );
};
export default Shifts;

const styles = StyleSheet.create({
  calender_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  calender_first_View: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calender_image: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  date_text: {
    color: Colors.gray[700],
    fontFamily: Fonts.satoshi_medium,
    marginLeft: moderateScale(7),
  },
  openJob_text: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.satoshi_regular,
    color: Colors.gray[700],
  },
  openCalender_button: {
    width: moderateScale(60),
    height: moderateScale(4),
    backgroundColor: Colors.gray[300],
    marginTop: moderateScale(25),
    alignSelf: 'center',
    borderRadius: moderateScale(100),
  },
  ///rbSheet
  rbsheet_mainView: {
    backgroundColor: Colors.white,
    padding: moderateScale(15),
  },
  rbSheet_header_text: {
    color: Colors.black,
    fontSize: moderateScale(20),
    fontFamily: Fonts.satoshi_bold,
  },
  textInpute_titlle: {
    color: Colors.black,
    fontSize: moderateScale(14),
    fontFamily: Fonts.satoshi_medium,
    marginTop: moderateScale(15),
  },
  textinpute_view: {
    borderWidth: 1,
    paddingHorizontal: moderateScale(10),
    borderColor: Colors.gray[200],
    borderRadius: moderateScale(4),
    marginTop: moderateScale(7),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textinpute: {
    color: Colors.black,
    flex: 1,
    fontFamily: Fonts.satoshi_regular,
    padding: moderateScale(10),
  },
  hours_text: {
    flex: 0.25,
    color: Colors.gray[500],
    textAlign: 'center',
    fontFamily: Fonts.satoshi_regular,
  },

  // Review modal
  reviewrate_text: {
    color: Colors.gray[500],
    fontSize: moderateScale(12),
    fontFamily: Fonts.satoshi_regular,
    marginLeft: moderateScale(4),
  },
  start_image: {
    width: moderateScale(12),
    height: moderateScale(12),
  },
  rating_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating_mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScale(7),
  },
  review_modal: {
    backgroundColor: Colors.white,
    marginTop: Dimensions.get('window').height / 4,
    marginHorizontal: moderateScale(15),
    padding: moderateScale(20),
  },
  modal_backgroundimage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    opacity: 0.5,
  },
  review_modal_rating_view: {
    backgroundColor: Colors.lightblue,
    marginTop: moderateScale(10),
    padding: moderateScale(10),
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  review_modal_rating_question: {
    marginLeft: moderateScale(4),
    fontSize: moderateScale(13),
    color: Colors.black,
    fontFamily: Fonts.satoshi_medium,
  },

  // button
});
