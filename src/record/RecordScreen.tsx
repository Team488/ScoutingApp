import React from 'react';
import { StyleSheet } from 'react-native';
import { Body, Button, Container, Content, Header, Left, Icon, Right, Title, Text, View } from 'native-base';
import { NavigationActions, NavigationScreenProps, createStackNavigator, createAppContainer } from 'react-navigation';
import { EventPanel, TimedEvent } from './EventPanel';
import { EventList, MatchEvent } from './EventList';
import { SandstormPanel } from './SandstormPanel';
import { ScoutingAppHeader } from '../ScoutingAppHeader';
import { ReadyModal } from './ReadyModal';

type State = {
  events: MatchEvent[],
  showDialog: boolean
}
export class RecordScreen extends React.Component<NavigationScreenProps, State> {
  private nextEventID = 0;
  matchStart = 0;

  constructor(props: NavigationScreenProps) {
    super(props);
    this.state = {
      events: [],
      showDialog: true
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
  }

  save() {
    const team = this.props.navigation.getParam('team');
    const match = this.props.navigation.getParam('match');
    this.props.navigation.replace('Review', {events: this.state.events, matchStart: this.matchStart, team, match });
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

  dialogDone(positionEvent: number) {
    this.newEvent({timestamp: Date.now(), code: positionEvent});
    this.setState({showDialog: false});
    // TODO: Pass match start time to children 
    this.matchStart = Date.now();
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Content>
        <SandstormPanel onEvent={(e) => this.newEvent(e)}></SandstormPanel>
        <EventPanel onEvent={(e) => this.newEvent(e)}></EventPanel>
        <EventList onDeleteEvent={(id:number) => this.deleteEvent(id)} events={this.state.events}></EventList>
        <View>
          <ReadyModal
            team={this.props.navigation.getParam('team')}
            show={this.state.showDialog}
            onDone={this.dialogDone.bind(this)}></ReadyModal>
        </View>
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
