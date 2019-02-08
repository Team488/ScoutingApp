import React from 'react';
import { Button, Text, View} from 'react-native';
import { NavigationActions, NavigationScreenProps, createStackNavigator, createAppContainer } from 'react-navigation';

export class ReviewScreen extends React.Component<NavigationScreenProps> {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Review The Match</Text>
        <Button
          title="Go to Logger"
          onPress={() => this.props.navigation.popToTop()} 
        />
      </View>
    );
  }
}