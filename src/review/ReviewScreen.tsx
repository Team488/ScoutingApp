import React from 'react';
import { AsyncStorage, Button, Text, View } from 'react-native';
import { NavigationActions, NavigationScreenProps, createStackNavigator, createAppContainer } from 'react-navigation';
import { Container, Content, H1, H2, H3, Grid, Icon, Left, List, ListItem, Picker, Right, Row } from 'native-base';
import QRCode from 'react-native-qrcode-svg';
import { MatchEvent, EventList } from '../record/EventList';
import { EventCode } from '../record/Events';
import { connect, ConnectedComponent, MatchHistory, Position } from '../store';
import { observer } from 'mobx-react';

type State = {
  eventData: string,
  ended: number,
  lifted: number
}

type Store = {
  matchHistory: MatchHistory
}

@connect('matchHistory')
@observer
export class ReviewScreen extends ConnectedComponent<NavigationScreenProps, Store, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      eventData: '%',
      ended: EventCode.NO_TRY_CLIMB,
      lifted: 0,
    }
  }

  renderEvents() {
    const team = this.props.navigation.getParam('team');
    const match = this.props.navigation.getParam('match');
    const start = this.props.navigation.getParam('matchStart') as number;
    const finish = this.props.navigation.getParam('matchFinish') as number;
    const events = this.props.navigation.getParam('events') as MatchEvent[];
    // TODO: Process event log for qr code.
    const eventList = events
      .sort((a, b) => a.timestamp! - b.timestamp!)
      .map((e) => {
        // Timestamp is in tenths of a second
        return `${((e.timestamp! - start) / 100).toFixed(0)} ${e.code}`;
      })
      .join('$');

    const lastTimestamp = ((finish - start) / 100).toFixed(0);
    let finishEvents = ''
    if (this.state.lifted > 0) {
      finishEvents += `${lastTimestamp} ${this.state.lifted}$`;
    }
    finishEvents += `${lastTimestamp} ${this.state.ended}`;
    const matchData = `${match} ${team}$${eventList}$${finishEvents}%`;
    this.stores.matchHistory.saveMatch({
      id: match,
      team,
      time: start,
      data: matchData, 
    });
    return matchData;
  }

  render() {
    const { navigate } = this.props.navigation;
    const eventData = this.renderEvents();
    return (
      <Content style={{margin: 20}}>
        <H1>Match Data Recorded</H1>

        <H3 style={{ marginTop: 20 }}>Use the QR code below to scan data into data processing computer.</H3>
        <View style={{ marginTop: 20, alignSelf: "center" }}>
          <QRCode size={500} value={eventData}></QRCode>

          <Text>{eventData}</Text>
        </View>
      </Content>
    );
  }
}