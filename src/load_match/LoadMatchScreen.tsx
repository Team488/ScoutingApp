import React from 'react';
import { View} from 'react-native';
import { Button, Content, Grid, Row, Col, Text } from 'native-base';
import { NavigationActions, NavigationScreenProps, createStackNavigator, createAppContainer } from 'react-navigation';
import QRCodeScanner from 'react-native-qrcode-scanner';
import RNFS from 'react-native-fs';

type State = {
  data: string
}
export class LoadMatchScreen extends React.Component<NavigationScreenProps, State> {
  scanner: any;

  constructor(props: any) {
    super(props);
    this.state = {
      data: ''
    };
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Content>
        <QRCodeScanner ref={(node) => { this.scanner = node }} onRead={data => this.setState(data)}></QRCodeScanner>
        <Text>Data: {this.state.data}</Text>
        <Button onPress={() => this.scanner.reactivate()}><Text>Scan Again</Text></Button>
        <Button onPress={() => this.writeFile()}><Text>Write Test File</Text></Button>
        <Button onPress={() => requestCameraPermission()}><Text>Get Permission</Text></Button>
      </Content>
    );
  }
}