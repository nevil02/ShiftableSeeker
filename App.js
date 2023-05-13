import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/route/StackNavigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Platform, StatusBar} from 'react-native';
import Colors from './src/theme/Colors';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={Platform.OS == 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor={Colors.blue[500]}
      />
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
};
export default App;
