import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Colors from '../theme/Colors';
import AuthHeader from '../Component/AuthComponent/AuthHeader';
import {moderateScale} from '../theme/scalling';
import {Fonts} from '../theme';
import SigningTextInpute from '../Component/AuthComponent/SigningTextInpute';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Icons} from '../theme/icons';
import {SafeAreaView} from 'react-native-safe-area-context';

const Login = ({navigation}) => {
  const navigationHomeStack = async () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1, marginHorizontal: moderateScale(16)}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}>
            <View style={{padding: moderateScale(20)}}>
              <Text style={styles.enter_credential_text}>
                Enter your credentials
              </Text>
              <Text style={styles.description_text}>
                Or create new ones, our system will guide you.
              </Text>
              <View style={styles.inpute_view}>
                <Text style={{color: Colors.black}}>Username</Text>
                <SigningTextInpute
                  placeholderText={'Enter name here...'}
                  iconName={'person-outline'}
                  secretText={false}
                />
              </View>
              <View style={styles.inpute_view}>
                <Text style={{color: Colors.black}}>Password</Text>
                <SigningTextInpute
                  placeholderText={'Enter password here...'}
                  iconName={'lock-outline'}
                  secretText={true}
                />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgetPassword')}>
                <Text style={styles.forgotpassword_text}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.getstarted_button}
                onPress={() => navigationHomeStack()}>
                <Text style={styles.getStarted_text}>Get Started</Text>
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={20}
                  color={Colors.white}
                  // style={{marginTop: 4}}
                />
              </TouchableOpacity>
              <Text style={[styles.description_text, {textAlign: 'center'}]}>
                or
              </Text>
              <TouchableOpacity
                style={[
                  styles.getstarted_button,
                  {backgroundColor: Colors.white, marginTop: moderateScale(10)},
                ]}>
                <Text style={[styles.getStarted_text, {color: Colors.black}]}>
                  Enter With Google
                </Text>
                <Image source={Icons.Google} style={styles.google_image} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkWhite,
  },
  enter_credential_text: {
    color: Colors.black,
    fontSize: moderateScale(24),
    fontFamily:
      Platform.OS == 'android'
        ? Fonts.notoSerif_Regular
        : Fonts.satoshi_regular,
    marginTop: moderateScale(5),
  },
  description_text: {
    color: Colors.text,
    fontSize: moderateScale(14),
    marginTop: moderateScale(5),
    fontFamily: Fonts.roboto_Regular,
  },
  inpute_view: {
    marginTop: moderateScale(30),
    fontSize: moderateScale(16),
    fontFamily: Fonts.satoshi_regular,
  },
  forgotpassword_text: {
    marginTop: moderateScale(5),
    fontSize: moderateScale(16),
    color: Colors.sky_color,
  },
  getstarted_button: {
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    padding: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    backgroundColor: Colors.sky_color,
    borderRadius: moderateScale(5),
    marginTop: moderateScale(25),
  },
  getStarted_text: {
    color: Colors.white,
    fontFamily: Fonts.satoshi_bold,
    fontSize: moderateScale(14),
  },
  google_image: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginLeft: moderateScale(10),
  },
});
