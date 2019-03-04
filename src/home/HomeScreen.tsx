import React from 'react';
import { View} from 'react-native';
import { Button, Content, Grid, Row, Col, Text } from 'native-base';
import { NavigationActions, NavigationScreenProps, createStackNavigator, createAppContainer } from 'react-navigation';
import QRCodeScanner from 'react-native-qrcode-scanner';

export class HomeScreen extends React.Component<NavigationScreenProps> {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Content>

        <Text>Home Screen</Text>
        <Text>Loading match data</Text>
        <Button
          onPress={() => navigate('Start')}
        >
          <Text>Record a match</Text>
        </Button>
      </Content>
    );
  }
}