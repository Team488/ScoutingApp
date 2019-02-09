import React from 'react';
import { View, Text} from 'react-native';
import { Button } from 'native-base';
import { NavigationActions, NavigationScreenProps, createStackNavigator, createAppContainer } from 'react-navigation';
import DetailModal from '../record/DetailModal';

/*
TODO:
- Make the color reflect the robot being recorded
- confirm placement and team
- allow selecting the match
*/

export class StartScreen extends React.Component<NavigationScreenProps> {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Recording Match:: 00</Text>
        <Button
          onPress={() => navigate('Record')}>
          <Text>Start</Text>
        </Button>
      </View>
    );
  }
}