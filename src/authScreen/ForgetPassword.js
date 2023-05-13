import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Colors from '../theme/Colors';
import AuthHeader from '../Component/AuthComponent/AuthHeader';
import {horizontalScale, moderateScale, verticalScale} from '../theme/scalling';
import {Fonts} from '../theme';
import SigningTextInpute from '../Component/AuthComponent/SigningTextInpute';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {SafeAreaView} from 'react-native-safe-area-context';
import YesNoButton from '../Component/HomeComponent/YesNoButton';

const ForgetPassword = ({navigation}) => {
  const [showOTP, setShowOTP] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader />
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{flex: 1}}>
          <View style={{padding: moderateScale(20)}}>
            <Text style={styles.description_text}>
              Forgot your password? We have got you covered.
            </Text>
            <Text style={styles.change_password_text}>
              Change your password
            </Text>
            <View style={styles.inpute_view}>
              <Text
                style={{
                  color: Colors.black,
                  fontFamily: Fonts.satoshi_medium,
                  fontSize: moderateScale(16),
                }}>
                Enter your registered email
              </Text>
              <SigningTextInpute
                placeholderText={'Enter email here...'}
                iconName={'person-outline'}
                secretText={false}
              />
            </View>
            {/* <YesNoButton
                  first_button_backgroundColor={Colors.borderColor}
                  first_button_color={Colors.black}
                  first_button_text={'Discard'}
                  second_button_backgroundColor={Colors.sky_color}
                  second_button_color={Colors.white}
                  second_button_text={'Send OTP'}
                  first_button_call={() => navigation.goBack()}
                  second_button_call={() => setShowOTP(true)}
                  flex1={1}
                  flex2={1}
                  second_button_image={true}
                  styles={{marginTop: verticalScale(50)}}
                /> */}
            {/* <TouchableOpacity
                  style={styles.getstarted_button}
                  onPress={() => {
                    setShowOTP(true);
                  }}>
                  <Text style={styles.getStarted_text}>Send OTP </Text>
                  <MaterialCommunityIcons
                    name="arrow-right"
                    size={20}
                    color={Colors.white}
                    style={{marginTop: 4}}
                  />
                </TouchableOpacity> */}
            {showOTP && (
              <View style={styles.inpute_view}>
                <Text
                  style={{
                    color: Colors.black,
                    fontFamily: Fonts.satoshi_medium,
                    fontSize: moderateScale(16),
                  }}>
                  Enter the OTP sent on your email
                </Text>
                <OTPInputView
                  pinCount={6}
                  style={{width: '100%', height: 70}}
                  autoFocusOnLoad={false}
                  codeInputFieldStyle={styles.underlineStyleBase}
                />
              </View>
            )}

            <YesNoButton
              first_button_backgroundColor={Colors.borderColor}
              first_button_color={Colors.black}
              first_button_text={'Discard'}
              second_button_backgroundColor={Colors.sky_color}
              second_button_color={Colors.white}
              second_button_text={!showOTP ? 'Send OTP' : 'Continue'}
              first_button_call={() => navigation.goBack()}
              second_button_call={() => {
                setShowOTP(true);
                if (showOTP) {
                  navigation.navigate('ChangePassword');
                }
              }}
              flex1={1}
              flex2={1}
              second_button_image={true}
            />
            {/* <TouchableOpacity
                  style={styles.getstarted_button}
                  onPress={() => navigation.navigate('ChangePassword')}>
                  <Text style={styles.getStarted_text}>Save and Continue </Text>
                  <MaterialCommunityIcons
                    name="arrow-right"
                    size={20}
                    color={Colors.white}
                    style={{marginTop: 4}}
                  />
                </TouchableOpacity> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  underlineStyleBase: {
    width: 50,
    height: 45,
    color: Colors.black,
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FAFF',
  },
  description_text: {
    color: Colors.text,
    fontSize: moderateScale(14),
    marginTop: verticalScale(5),
    fontFamily: Fonts.roboto_Regular,
  },
  change_password_text: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.satoshi_bold,
    color: Colors.black,
  },
  inpute_view: {
    marginTop: verticalScale(40),
    fontSize: moderateScale(16),
    fontFamily: Fonts.satoshi_regular,
  },
  getstarted_button: {
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    padding: moderateScale(10),
    paddingHorizontal: horizontalScale(15),
    backgroundColor: Colors.sky_color,
    borderRadius: moderateScale(5),
    marginTop: verticalScale(50),
  },
  getStarted_text: {
    color: Colors.white,
    fontFamily: Fonts.satoshi_bold,
    fontSize: moderateScale(14),
  },
});
