import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AuthHeader from '../Component/AuthComponent/AuthHeader';
import {Fonts} from '../theme';
import Colors from '../theme/Colors';
import {Icons} from '../theme/icons';
import {Images} from '../theme/images';
import {moderateScale, verticalScale} from '../theme/scalling';
import DropDownComp from '../Component/HomeComponent/DropDown';

import {GraduationYear, profession} from '../theme/ConstantArray';
import ProfileBottomView from '../Component/HomeComponent/ProfileBottomView';
import ProfilePincodeRadius from '../Component/HomeComponent/ProfilePincodeRadius';
import SimpleButton from '../Component/HomeComponent/SimpleButton';

import ImageCropPicker from 'react-native-image-crop-picker';
import CustomeDropdown from '../Component/HomeComponent/CustomeDropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import {SafeAreaView} from 'react-native-safe-area-context';
import YesNoButton from '../Component/HomeComponent/YesNoButton';
import PhoneInput from 'react-native-phone-number-input';
import ConformationModal from '../Component/HomeComponent/ConformationModal';

const EditProfile = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [gender, setGender] = useState(null);
  const [selectRange, setSelectRange] = useState(0);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());
  const [openConfirmationModal, SetOpenConfirmationModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    name: '',
    _id: '',
  });
  const [openDropDownModal, setOpenDropDownModal] = useState(false);
  const [number, setNumber] = useState('');
  const [graduationYear, setGraduationYear] = useState({name: '', _id: ''});
  const [openGraduationYearModal, setOpenGraduationYearModal] = useState(false);
  const [year, setYear] = useState(null);

  useEffect(() => {
    var start_year = 1960;
    var currentYear = new Date().getFullYear();
    var years = [];
    for (var i = start_year; i <= currentYear; i++) {
      years.push({name: i});
    }
    setYear([...years]);
  }, []);

  const imageselect = () => {
    SetOpenConfirmationModal(true);
  };

  const openGallery = async () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      SetOpenConfirmationModal(false);
      setImage(image.path);
    });
  };

  const openCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      SetOpenConfirmationModal(false);
      setImage(image.path);
    });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setBirthDate(date);
    setDatePickerVisibility(false);
  };

  const selectItem = item => {
    setSelectedItem({
      name: item.name,
      _id: item._id,
    });
    setOpenDropDownModal(!openDropDownModal);
  };

  const SelectGraduation = item => {
    setGraduationYear({
      name: item.name,
      _id: item._id,
    });
    setOpenGraduationYearModal(!openGraduationYearModal);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader
        profileTextEnable={true}
        smallText="Tell us more about yourself"
        bigText="Profile Details"
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ScrollView
          style={{
            paddingHorizontal: moderateScale(20),
            marginTop: moderateScale(20),
            flex: 1,
          }}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.profile_view,
              {
                padding: image == null ? moderateScale(30) : 0,
                borderWidth: image == null ? 1 : 0,
              },
            ]}
            onPress={() => imageselect()}>
            <Image
              source={image == null ? Icons.selectImage : {uri: image}}
              style={image !== null ? styles.profile_image : {}}
            />
          </TouchableOpacity>
          {/* )} */}
          <Text style={styles.test_style}>Upload profile photo</Text>

          <Text style={[styles.field_title, {marginTop: moderateScale(20)}]}>
            Full Name
          </Text>
          <TextInput
            style={[styles.textInpute_style, {padding: moderateScale(10)}]}
            placeholder="Enter name here..."
            placeholderTextColor={Colors.gray[400]}
          />
          <Text style={[styles.field_title, {marginTop: moderateScale(20)}]}>
            Phone Number
          </Text>
          <View style={styles.phoneInput}>
            <PhoneInput
              disableArrowIcon={true}
              flagButtonStyle={styles.flagStyle}
            />
            <View style={styles.main}>
              <TextInput
                style={styles.TextInput}
                placeholder={'Enter phone number here...'}
                keyboardType="numeric"
                value={number}
                maxLength={10}
                onChangeText={number => {
                  setNumber(number);
                }}
                placeholderTextColor={Colors.gray[500]}
              />
              {number.length === 0 ? null : (
                <TouchableOpacity
                  style={styles.removeText}
                  onPress={() => setNumber('')}>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                    }}
                    source={Images.TIMES}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <Text style={[styles.field_title, {marginTop: moderateScale(20)}]}>
            Pincode
          </Text>
          <View style={styles.inputeFiled_view}>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: moderateScale(10),
              }}>
              <Image
                source={Icons.pin}
                style={{width: moderateScale(12), height: moderateScale(15)}}
              />
            </View>
            <TextInput
              style={{
                color: Colors.black,
                flex: 1,
                alignSelf: 'flex-start',
                padding: moderateScale(10),
              }}
              placeholder="10 KM"
              placeholderTextColor={Colors.gray[400]}
            />
          </View>
          <Text style={[styles.test_style, {alignSelf: 'flex-start'}]}>
            Ottawa,Canada
          </Text>

          <Text style={[styles.field_title, {marginTop: moderateScale(20)}]}>
            Gender
          </Text>
          <View style={styles.gender_select_view}>
            <TouchableOpacity
              style={styles.selectgender_button}
              onPress={() => setGender('Male')}>
              {gender !== null ? (
                gender === 'Male' ? (
                  <Image
                    source={Icons.check_green}
                    style={styles.check_image}
                  />
                ) : null
              ) : null}
            </TouchableOpacity>
            <Text
              style={[styles.test_style, styles.extra_style]}
              onPress={() => setGender('Male')}>
              Male
            </Text>
            <TouchableOpacity
              style={[
                styles.selectgender_button,
                {marginLeft: moderateScale(15)},
              ]}
              onPress={() => setGender('Female')}>
              {gender !== null ? (
                gender === 'Female' ? (
                  <Image
                    source={Icons.check_green}
                    style={styles.check_image}
                  />
                ) : null
              ) : null}
            </TouchableOpacity>
            <Text
              style={[styles.test_style, styles.extra_style]}
              onPress={() => setGender('Female')}>
              Female
            </Text>
            <TouchableOpacity
              style={[
                styles.selectgender_button,
                {marginLeft: moderateScale(15)},
              ]}
              onPress={() => setGender('Others')}>
              {gender !== null ? (
                gender === 'Others' ? (
                  <Image
                    source={Icons.check_green}
                    style={styles.check_image}
                  />
                ) : null
              ) : null}
            </TouchableOpacity>
            <Text
              style={[styles.test_style, styles.extra_style]}
              onPress={() => setGender('Others')}>
              Others
            </Text>
          </View>
          <Text style={[styles.field_title, {marginTop: moderateScale(20)}]}>
            Date of Birth
          </Text>
          <TouchableOpacity
            style={[styles.textInpute_style, {padding: moderateScale(14)}]}
            onPress={showDatePicker}>
            <Text style={{color: Colors.black}}>
              {Moment(birthDate).format('DD MMM, YYYY')}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={birthDate}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <CustomeDropdown
            selectedProfession={selectedItem.name}
            data={profession}
            title_text="Professional Education"
            excaimination_image={false}
            setOpenDropDownModal={() =>
              setOpenDropDownModal(!openDropDownModal)
            }
            openModal={openDropDownModal}
            selectItem={selectItem}
            placeholder_text="Select Profession"
            closeModal={() => setOpenDropDownModal(!openDropDownModal)}
          />
          <CustomeDropdown
            selectedProfession={graduationYear.name}
            data={year === null ? [] : year}
            title_text="Year of Graduation"
            excaimination_image={false}
            setOpenDropDownModal={() =>
              setOpenGraduationYearModal(!openGraduationYearModal)
            }
            openModal={openGraduationYearModal}
            selectItem={val => SelectGraduation(val)}
            placeholder_text="Select Year"
            closeModal={() =>
              setOpenGraduationYearModal(!openGraduationYearModal)
            }
          />
          <ProfileBottomView />
          <ProfilePincodeRadius
            selectRange={selectRange}
            setSelectRange={val => setSelectRange(val)}
          />
          {/* <SimpleButton
          imagePositio={true}
          image={Icons.completSetup}
          buttonname={"Complete Setup"}
          buttonPress={() => navigation.goBack()}
        /> */}
          <View style={styles.last_button_view}>
            <YesNoButton
              first_button_backgroundColor={Colors.borderColor}
              first_button_color={Colors.black}
              first_button_text={'Discard'}
              second_button_backgroundColor={Colors.sky_color}
              second_button_color={Colors.white}
              second_button_text={'Submit'}
              first_button_call={() => navigation.goBack()}
              second_button_call={() => navigation.goBack()}
              flex1={1}
              flex2={1}
              second_button_image={true}
            />
          </View>
          <ConformationModal
            NoButton={() => openCamera()}
            YesButton={() => openGallery()}
            header={'Select from'}
            no_text="Camera"
            openConfirmationModal={openConfirmationModal}
            yes_text="Gallery"
            closeModal={() => SetOpenConfirmationModal(false)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkWhite,
  },
  header_view: {
    backgroundColor: Colors.white,
    padding: moderateScale(20),
  },
  profile_image: {
    borderRadius: moderateScale(50),
    width: moderateScale(100),
    height: moderateScale(100),
    alignSelf: 'center',
  },
  profile_view: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(50),
    padding: moderateScale(30),
    borderWidth: 1,
    borderColor: Colors.sky_color,
    backgroundColor: Colors.blue[100],
    alignSelf: 'center',
    borderStyle: 'dashed',
  },
  test_style: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.satoshi_regular,
    color: Colors.black,
    alignSelf: 'center',
    marginTop: moderateScale(10),
  },
  field_title: {
    color: Colors.black,
    fontSize: moderateScale(15),
    fontFamily: Fonts.satoshi_medium,
  },
  textInpute_style: {
    color: Colors.black,
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: moderateScale(4),
    marginTop: moderateScale(10),
    padding: moderateScale(13),
    backgroundColor: Colors.white,
  },
  inputeFiled_view: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: moderateScale(5),
    borderColor: Colors.borderColor,
    marginTop: moderateScale(5),
    paddingHorizontal: moderateScale(5),
    backgroundColor: Colors.white,
  },
  extra_style: {
    marginTop: 0,
    marginLeft: moderateScale(5),
    fontSize: moderateScale(14),
  },
  selectgender_button: {
    height: moderateScale(20),
    width: moderateScale(20),
    backgroundColor: Colors.white,
    borderRadius: moderateScale(50),
    borderWidth: 1,
    borderColor: Colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  check_image: {
    width: moderateScale(19),
    height: moderateScale(19),
  },
  gender_select_view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(10),
  },
  dropdown: {
    borderColor: Colors.borderColor,
    borderWidth: 1,
    // marginHorizontal: moderateScale(10),
    marginTop: moderateScale(5),
    borderRadius: moderateScale(4),
    padding: moderateScale(12),
    backgroundColor: Colors.white,
  },
  selectedItem: {
    color: Colors.black,
    fontSize: 12,
  },
  country_dropdown: {
    backgroundColor: Colors.gray[200],
    // paddingVertical: moderateScale(7),
    flex: 1,
    paddingHorizontal: moderateScale(2),
  },
  last_button_view: {
    marginBottom: moderateScale(20),
  },
  phoneInput: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: moderateScale(4),
    borderColor: Colors.borderColor,
    borderWidth: 1,
    marginTop: verticalScale(5),
  },
  flagStyle: {
    backgroundColor: Colors.gray[200],
    flex: 0.7,
  },
  main: {
    flexDirection: 'row',
    // paddingBottom: moderateScale(3),
    marginLeft: moderateScale(8),
    flex: 2,
  },
  TextInput: {
    fontSize: moderateScale(14.5),
    color: Colors.black,
    flex: 1,
  },
  removeText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  TouchableText: {
    fontSize: moderateScale(14),
    color: Colors.black,
  },
});
