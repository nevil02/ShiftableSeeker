import React, {useMemo, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import MainHeader from '../Component/HomeComponent/MainHeader';
import {Fonts} from '../theme';
import Colors from '../theme/Colors';
import {moderateScale} from '../theme/scalling';
import ButtonHeader from '../Component/HomeComponent/ButtonHeader';
import {Icons} from '../theme/icons';
import {JobList} from '../theme/ConstantArray';
import JobilstComp from '../Component/HomeComponent/JobDetails';
import ConformationModal from '../Component/HomeComponent/ConformationModal';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import {SafeAreaView} from 'react-native-safe-area-context';

const Jobs = ({navigation}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectButton, setSelectButton] = useState(1);
  const initDate = '2023-02-26';
  const [selected, setSelected] = useState(initDate);
  const [day, setDay] = useState('26');
  const [month, setMonth] = useState('February');
  const [year, setYear] = useState('2023');
  const [openConfirmationModal, SetOpenConfirmationModal] = useState(false);
  const [isItem, setIsItem] = useState();
  const [jobData, setJobData] = useState(JobList);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');

  const marked = useMemo(
    () => ({
      [selected]: {
        selected: true,
        selectedColor: Colors.yellow[400],
      },
    }),
    [selected],
  );
  const showDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#F5F5F5',
      }}>
      <MainHeader
        isShowLogo={true}
        bellAction={() => navigation.navigate('Notification')}
        openProfile={() => navigation.navigate('MyProfile')}
      />
      <ButtonHeader
        first_button="Open Jobs"
        second_button="Appied Jobs"
        selectFirstButton={() => setSelectButton(1)}
        selectsecondButton={() => setSelectButton(2)}
        selectedButton={selectButton}
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
        data={jobData}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <>
              <JobilstComp
                index={index}
                item={item}
                lastView={selectButton === 1 ? 'Openjob' : 'Appliedjobs'}
                arraylength={JobList.length - 1}
                navigation={navigation}
                likePress={() => {
                  SetOpenConfirmationModal(true), setIsItem(item);
                }}
                cancelModal={() => setOpenCancelModal(true)}
              />
            </>
          );
        }}
      />
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
      <ConformationModal
        NoButton={() => setOpenCancelModal(false)}
        YesButton={() => setOpenCancelModal(false)}
        header={'Do you want to Cancel this job?'}
        no_text="No"
        openConfirmationModal={openCancelModal}
        yes_text="Yes"
      />
    </SafeAreaView>
  );
};
export default Jobs;

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
});
