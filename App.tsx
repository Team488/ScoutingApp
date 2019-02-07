/**
 * Main app root.
 */

import React, {Component} from 'react';
import { Button, Text, View} from 'react-native';
import Orientation, { orientation } from "react-native-orientation";
import { Root } from 'native-base';
import EventLogger from './components/EventLogger';
import { NavigationActions, NavigationScreenProps, createStackNavigator, createAppContainer } from 'react-navigation';

class HomeScreen extends React.Component<NavigationScreenProps> {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Logger"
          onPress={() => navigate('EventLogger')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  EventLogger: EventLogger 
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
