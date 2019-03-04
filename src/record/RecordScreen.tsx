import React from 'react';
import { StyleSheet } from 'react-native';
import { Body, Button, Container, Content, Header, Left, Icon, Right, Title, Text, View } from 'native-base';
import { NavigationActions, NavigationScreenProps, createStackNavigator, createAppContainer } from 'react-navigation';
import { EventPanel, TimedEvent } from './EventPanel';
import { EventList, MatchEvent } from './EventList';
import { StatusBar } from './StatusBar';
import { ScoutingAppHeader } from '../ScoutingAppHeader';

type State = {
  events: MatchEvent[]
}
export class RecordScreen extends React.Component<NavigationScreenProps, State> {
  private nextEventID = 0;
  matchStart = 0;

  constructor(props: NavigationScreenProps) {
    super(props);
    this.state = {
      events: []
    }
  }

  static navigationOptions = ({navigation}:any) => ({
    header:
      <ScoutingAppHeader navigation={navigation} title="Recording Match">
        <Button onPress={() => navigation.state.params.handleSave()}>
          <Text>Finish</Text>
        </Button>
      </ScoutingAppHeader>
  })

  componentDidMount() {
    this.props.navigation.setParams({ handleSave: this.save.bind(this)});
    // TODO: Pass match start time to children 
    this.matchStart = Date.now();
  }

  save() {
    this.props.navigation.replace('Review', {events: this.state.events, matchStart: this.matchStart});
  }

  // Drop any in-progress recording and go back to start.
  cancel() {
    this.props.navigation.pop();
  }

  newEvent(event: TimedEvent) {
    const newEvent = {
      ...event,
      id: this.nextEventID++
    }
    this.setState({
      events: [newEvent].concat(this.state.events)
    });
  }

  deleteEvent(id: number) {
    this.setState({
      events: this.state.events.filter((x) => x.id !== id)
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Content>
        <StatusBar title="test"></StatusBar>
        <EventPanel onEvent={(e) => this.newEvent(e)}></EventPanel>
        <EventList onDeleteEvent={(id:number) => this.deleteEvent(id)} events={this.state.events}></EventList>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
});
