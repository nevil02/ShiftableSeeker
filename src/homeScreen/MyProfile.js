import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../theme/Colors';
import {horizontalScale, moderateScale, verticalScale} from '../theme/scalling';
import {Fonts} from '../theme';
import MainHeader from '../Component/HomeComponent/MainHeader';
import {Icons} from '../theme/icons';
import {Images} from '../theme/images';
import CustomeDropdown from '../Component/HomeComponent/CustomeDropdown';
import {GraduationYear, profession} from '../theme/ConstantArray';
import ProfilePincodeRadius from '../Component/HomeComponent/ProfilePincodeRadius';
import ProfileBottomView from '../Component/HomeComponent/ProfileBottomView';
import SimpleButton from '../Component/HomeComponent/SimpleButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import YesNoButton from '../Component/HomeComponent/YesNoButton';

const MyProfile = ({navigation}) => {
  const [selectedProfession, setSelectedProfession] = useState({
    name: '',
    _id: '',
  });

  const [openProfessionModal, setOpenProfessionModal] = useState(false);
  const [openGraduationYearModal, setOpenGraduationYearModal] = useState(false);
  const [graduationYear, setGraduationYear] = useState({name: '', _id: ''});
  const [selectRange, setSelectRange] = useState(0);
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

  const selectProfession = item => {
    setSelectedProfession({
      name: item.name,
      _id: item._id,
    });
    setOpenProfessionModal(!openProfessionModal);
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
      <MainHeader
        isShowLogo={false}
        text="My Profile"
        bellAction={() => navigation.navigate('Notification')}
        openProfile={() => navigation.navigate('MyProfile')}
      />
      <ScrollView
        style={styles.main_container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: verticalScale(30)}}>
        <Text style={styles.profile_text}>Profile Details</Text>
        <View style={styles.header_view}>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditProfile')}
            style={styles.editButton}>
            <Image source={Icons.edit} style={styles.edit_image} />
          </TouchableOpacity>
          <Image source={Images.extraImage} style={styles.profile_image} />
          <Text style={styles.user_name}>Aryan Abadeh</Text>
          <View style={styles.gender_view}>
            <Image source={Icons.GenderIcon} style={styles.gender_icon} />
            <Text style={styles.gender_text}>Male</Text>
          </View>
          <View style={styles.horizontal_line} />
          <View style={styles.details_view}>
            <Image
              source={Icons.pin}
              style={{width: moderateScale(10), height: moderateScale(12)}}
            />
            <Text style={styles.test_style}>K1A0B1</Text>
            <Image
              source={Icons.Phone}
              style={{
                width: moderateScale(12),
                height: moderateScale(12),
                marginLeft: moderateScale(12),
              }}
            />
            <Text style={styles.test_style}>1 (647) 948-6676</Text>
            <Image
              source={Icons.Calender}
              style={{
                width: moderateScale(10),
                height: moderateScale(12),
                marginLeft: moderateScale(12),
              }}
            />
            <Text style={styles.test_style}>9 Sept, 1998</Text>
          </View>
        </View>

        <CustomeDropdown
          selectedProfession={selectedProfession.name}
          data={profession}
          title_text="Professional Education"
          excaimination_image={false}
          setOpenDropDownModal={() =>
            setOpenProfessionModal(!openProfessionModal)
          }
          openModal={openProfessionModal}
          selectItem={val => selectProfession(val)}
          placeholder_text="Select Profession"
          closeModal={() => setOpenProfessionModal(!openProfessionModal)}
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
        <YesNoButton
          first_button_backgroundColor={Colors.borderColor}
          first_button_color={Colors.black}
          first_button_text={'Discard'}
          second_button_backgroundColor={Colors.sky_color}
          second_button_color={Colors.white}
          second_button_text={'Update'}
          first_button_call={() => navigation.goBack()}
          second_button_call={() => navigation.goBack()}
          flex1={1}
          flex2={1}
          second_button_image={false}
        />
        {/* <SimpleButton
          imagePositio={true}
          image={Icons.completSetup}
          buttonname={"Update"}
          buttonPress={() => navigation.goBack()}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
};
export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main_container: {
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(20),
  },
  profile_text: {
    fontFamily: Fonts.satoshi_bold,
    color: Colors.gray[900],
    fontSize: moderateScale(18),
    marginBottom: verticalScale(10),
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
  gender_view: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  gender_icon: {
    width: moderateScale(12),
    height: moderateScale(12),
  },
  gender_text: {
    color: Colors.black,
    fontFamily: Fonts.satoshi_regular,
    fontSize: moderateScale(14),
    marginLeft: moderateScale(7),
  },
  horizontal_line: {
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: 2,
    padding: moderateScale(10),
  },
  details_view: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(10),
    justifyContent: 'center',
  },
  test_style: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.satoshi_regular,
    color: Colors.black,
    marginLeft: moderateScale(5),
  },
  field_title: {
    color: Colors.black,
    fontSize: moderateScale(15),
    fontFamily: Fonts.satoshi_medium,
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

  editButton: {
    borderRadius: moderateScale(50),
    alignSelf: 'flex-end',
    backgroundColor: Colors.gray[200],
    padding: moderateScale(10),
  },
  edit_image: {
    width: moderateScale(13),
    height: moderateScale(13),
  },
  user_name: {
    alignSelf: 'center',
    fontSize: moderateScale(18),
    fontFamily: Fonts.satoshi_bold,
    color: Colors.black,
    marginVertical: moderateScale(10),
  },
  country_dropdown: {
    backgroundColor: Colors.gray[200],
    // paddingVertical: moderateScale(7),
    flex: 1,
    paddingHorizontal: moderateScale(2),
  },
});
