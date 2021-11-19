import React from 'react';
import { Text, View } from 'react-native';
import { NavigationActions, NavigationScreenProps, createStackNavigator, createAppContainer } from 'react-navigation';
import { Container, Content, H1, H2, H3, Grid, Icon, Left, List, ListItem, Picker, Right, Row } from 'native-base';
import QRCode from 'react-native-qrcode-svg';
import { MatchEvent, EventList } from '../record/EventList';
import { EventCode } from '../record/Events';
import { connect, ConnectedComponent, MatchHistory, History, Position } from '../store';
import { observer } from 'mobx-react';

type Store = {
  matchHistory: MatchHistory
}

export class ViewMatchScreen extends React.Component<NavigationScreenProps, Store, State> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    const match = this.props.navigation.getParam('match') as History 
    console.log("Got match", match)
    return (
      <Content style={{margin: 20}}>
        <H1>Data for Match #{match.id}</H1>

        <H1>Team #{match.team}</H1>
        <View style={{ marginTop: 20, alignSelf: "center" }}>
          <QRCode size={500} value={match.data}></QRCode>

          <Text>{match.data}</Text>
        </View>
      </Content>
    );
  }
}