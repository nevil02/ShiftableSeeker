import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import MainHeader from '../Component/HomeComponent/MainHeader';
import JobilstComp from '../Component/HomeComponent/JobDetails';
import {JobList} from '../theme/ConstantArray';
import {SafeAreaView} from 'react-native-safe-area-context';
import ConformationModal from '../Component/HomeComponent/ConformationModal';
const Favorites = ({navigation}) => {
  const [openConfirmationModal, SetOpenConfirmationModal] = useState(false);
  const [isItem, setIsItem] = useState();
  const [jobData, setJobData] = useState(JobList);

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
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <MainHeader
        isShowLogo={false}
        text="Favorites"
        bellAction={() => navigation.navigate('Notification')}
        openProfile={() => navigation.navigate('MyProfile')}
      />
      <FlatList
        data={JobList}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <JobilstComp
              index={index}
              item={item}
              lastView={'Favorite'}
              favoritescreen={true}
              arraylength={JobList.length - 1}
              likePress={() => {
                SetOpenConfirmationModal(true), setIsItem(item);
              }}
            />
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
    </SafeAreaView>
  );
};
export default Favorites;
