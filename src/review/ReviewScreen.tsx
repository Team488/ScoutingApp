import React from 'react';
import { Button, Text, View } from 'react-native';
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
      ended: EventCode.ENDED_1,
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
        <H1>Review The Match</H1>

        <H3 style={{ marginTop: 20 }}>Did the robot lift a teammate to a finish position?</H3>
        <Picker
          mode="dropdown"
          placeholder="lifted to"
          selectedValue={this.state.lifted}
          onValueChange={(v) => {
            this.setState({ lifted: v })
          }}
        >
          <Picker.Item label="None" value={0} />
          <Picker.Item label="Level 2" value={EventCode.LIFTED_2} />
          <Picker.Item label="Level 3" value={EventCode.LIFTED_3} />
        </Picker>
        <H3 style={{ marginTop: 20 }}>Which level did the robot end on?</H3>
        <Picker
          mode="dropdown"
          placeholder="ending position"
          selectedValue={this.state.ended}
          onValueChange={(v) => {
            this.setState({ ended: v })
          }}
        >
          <Picker.Item label="Level 1" value={EventCode.ENDED_1} />
          <Picker.Item label="Level 2" value={EventCode.ENDED_2} />
          <Picker.Item label="Level 3" value={EventCode.ENDED_3} />
        </Picker>
        <View style={{ marginTop: 20, alignSelf: "center" }}>
          <QRCode size={500} value={eventData}></QRCode>

          <Text>{eventData}</Text>
        </View>
      </Content>
    );
  }
}