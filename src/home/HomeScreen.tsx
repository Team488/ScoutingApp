import React from 'react';
import { View} from 'react-native';
import { Button, Text } from 'native-base';
import { NavigationActions, NavigationScreenProps, createStackNavigator, createAppContainer } from 'react-navigation';

export class HomeScreen extends React.Component<NavigationScreenProps> {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          onPress={() => navigate('Start')}
        >
          <Text>Record a match</Text>
        </Button>
      </View>
    );
  }
}