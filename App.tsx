/**
 * Main app root.
 */

import React, { Component } from 'react';
import {Provider}  from 'mobx-react';
import { Button, Text, View } from 'react-native';
import { Root } from 'native-base';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen } from './src/home/HomeScreen';
import { StartScreen } from './src/start/StartScreen';
import { StartUnlistedScreen } from './src/start/StartUnlistedScreen';
import { RecordScreen } from './src/record/RecordScreen';
import { ReviewScreen } from './src/review/ReviewScreen';
import { SettingsScreen } from './src/settings/SettingsScreen';
import { ViewMatchScreen } from './src/view_match/ViewMatchScreen';
import { MatchHistory, MatchList } from './src/store';
import { PermissionsAndroid } from 'react-native';

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Start: StartScreen,
  StartUnlisted: StartUnlistedScreen,
  Record: RecordScreen,
  Review: ReviewScreen,
  Settings: SettingsScreen, 
  ViewMatch: ViewMatchScreen, 
},
  {
    initialRouteName: "Home"
  });

const AppContainer = createAppContainer(AppNavigator);

type Stores = {
  matchList?: MatchList
}

// We need the external storage permission so we can read/write match
// data from the SD card.
async function requestFilePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'External storage permission',
        message:
          'ScoutingApp needs to access external storage' +
          'to save and read data.',
        buttonPositive: 'ok, thanks'
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('External storage granted');
    } else {
      console.log('External permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

export default class App extends React.Component {
  stores: Stores = {};
  matchList: MatchList;
  matchHistory: MatchHistory;

  constructor(props: any) {
    super(props);

    this.matchList = new MatchList();
    this.matchHistory = new MatchHistory();
  }

  async componentDidMount() {
    await requestFilePermission();
    this.matchList.loadData();
    this.matchHistory.loadMatchHistory();
  };

  render() {
    return (
    <Root>
      <Provider {...{matchList: this.matchList, matchHistory: this.matchHistory}}>
        <AppContainer persistenceKey={"NavigationState"} />
      </Provider>
    </Root>);
  }
}
