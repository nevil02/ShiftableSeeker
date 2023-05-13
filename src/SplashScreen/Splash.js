import React, {useEffect} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {Images} from '../theme/images';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Splashscreen1');
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={Images.splashscreen}
        style={styles.image}
        resizeMode="stretch"
      />
    </View>
  );
};
export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
