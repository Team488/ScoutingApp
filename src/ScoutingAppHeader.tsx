import React from 'react';
import RN, { View } from 'react-native';
import { Button, Body, Content, Grid, Icon, Header, Left, Right, Row, Col, Text, Title } from 'native-base';
import { NavigationActions, NavigationScreenProps, createStackNavigator, createAppContainer } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import { connect, ConnectedComponent, MatchList } from './store'

interface Stores {
  matchList: MatchList;
}

type HeaderProps = {
  title: string,
  navigation: any,
  showBack: boolean
}

@connect("matchList")
@observer
export class ScoutingAppHeader extends ConnectedComponent<HeaderProps, Stores> {
  render() {
    return <Header style={{backgroundColor: this.stores.matchList.positionColor}}>
    <Left>
      <Button transparent
        onPress={() => this.props.navigation.goBack()}>
        <Icon name='arrow-back' />
      </Button>
    </Left>
    <Body>
      <Title>{this.props.title} - {this.stores.matchList.position}</Title>
    </Body>
    <Right>
      {this.props.children}
    </Right>
  </Header>
  }
}
