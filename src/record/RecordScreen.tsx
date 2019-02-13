import React from 'react';
import { StyleSheet } from 'react-native';
import { Body, Button, Container, Content, Header, Left, Icon, Right, Title, Text, View } from 'native-base';
import { NavigationActions, NavigationScreenProps, createStackNavigator, createAppContainer } from 'react-navigation';
import { EventPanel } from './EventPanel';
import { EventList, MatchEvent } from './EventList';
import { StatusBar } from './StatusBar';

type State = {
  events: MatchEvent[]
}
export class RecordScreen extends React.Component<NavigationScreenProps, State> {
  private nextEventID = 0;

  constructor(props: NavigationScreenProps) {
    super(props);
    this.state = {
      events: []
    }
  }

  static navigationOptions = ({navigation}:any) => ({
    header:
        <Header >
          <Left>
            <Button transparent
              onPress={() => navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Recording Match</Title>
          </Body>
          <Right>
            <Button onPress={() => navigation.state.params.handleSave()}>
            <Text>Finish</Text></Button>
          </Right>
        </Header>
  })

  componentDidMount() {
    this.props.navigation.setParams({ handleSave: this.save.bind(this)});
  }

  save() {
    this.props.navigation.replace('Review');
  }

  // Drop any in-progress recording and go back to start.
  cancel() {
    this.props.navigation.pop();
  }


  newEvent(e: number) {
    const newEvent = {
      code: e,
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
        <StatusBar></StatusBar>
        <EventPanel onEvent={(e) => this.newEvent(e)}></EventPanel>
        <EventList onDeleteEvent={(id:number) => this.deleteEvent(id)} events={this.state.events}></EventList>
        {/* <View>
          <Button><Icon name="play"></Icon></Button>
          <Button><Icon name="pause"></Icon></Button>
          <Button><Icon name="reload"></Icon></Button>
        </View> */}
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
