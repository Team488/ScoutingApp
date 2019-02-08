/**
 * Main app root.
 */

import React, {Component} from 'react';
import { Button, Text, View} from 'react-native';
import Orientation, { orientation } from "react-native-orientation";
import { Root } from 'native-base';
import EventLogger from './src/record/EventPanel';
import { NavigationActions, NavigationScreenProps, createStackNavigator, createAppContainer } from 'react-navigation';
import {HomeScreen} from './src/home/HomeScreen';
import {StartScreen} from './src/start/StartScreen';
import {RecordScreen} from './src/record/RecordScreen';
import {ReviewScreen} from './src/review/ReviewScreen';

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Start: StartScreen,
  Record: RecordScreen,
  Review: ReviewScreen
},
{
  initialRouteName: "Home"
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  componentDidMount() {
    if ( Orientation ) {
      Orientation.lockToPortrait();
    } else {
      console.warn('Orientation not available, unable to lock portrait.');
    }
  };

  render() {
    return (<Root>
      <AppContainer/>
      </Root>);
  }
}
