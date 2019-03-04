import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Content, Grid, Row, Col, Text } from 'native-base';
import { NavigationActions, NavigationScreenProps, createStackNavigator, createAppContainer } from 'react-navigation';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { inject, observer } from 'mobx-react';
import { MatchList } from '../MatchList';

interface RootStore {
  matchList: MatchList;
}

@observer
export class ConnectedComponent<T, S, X = {}> extends Component<T, X> {
  public get stores() {
    return (this.props as any) as S;
  }
}

export const connect = (...args: Array<keyof RootStore>) => inject(...args);

@connect("matchList")
export class HomeScreen extends ConnectedComponent<NavigationScreenProps, RootStore> {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Content>

        <Text>Home Screen</Text>
        <Text>Next match: {this.stores.matchList.matchTime}</Text>
        <Button
          onPress={() => navigate('Start')}
        >
          <Text>Record a match</Text>
        </Button>
        <Button onPress={() => this.stores.matchList.update()}>
          <Text>Confabulate</Text>
        </Button>
      </Content>
    );
  }
}