import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../theme/Colors';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AuthHeader from '../Component/AuthComponent/AuthHeader';
import {horizontalScale, moderateScale, verticalScale} from '../theme/scalling';
import {Fonts} from '../theme';
import SigningTextInpute from '../Component/AuthComponent/SigningTextInpute';
import YesNoButton from '../Component/HomeComponent/YesNoButton';

const ChangePassword = ({navigation}) => {
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
                Enter New Password
              </Text>
              <SigningTextInpute
                placeholderText={'Enter password here...'}
                iconName={'lock-open'}
                secretText={false}
              />
            </View>
            <YesNoButton
              first_button_backgroundColor={Colors.borderColor}
              first_button_color={Colors.black}
              first_button_text={'Discard'}
              second_button_backgroundColor={Colors.sky_color}
              second_button_color={Colors.white}
              second_button_text={'Save Password'}
              first_button_call={() => navigation.goBack()}
              second_button_call={() => {
                navigation.navigate('Login');
              }}
              flex1={1}
              flex2={1}
              second_button_image={true}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default ChangePassword;

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
