import React, { Component, ReactPropTypes } from "react";
import { Text, TouchableOpacity, View, GestureResponderEvent, StyleSheet } from "react-native";
import { Button, Content, Icon, Left, List, ListItem, Right } from 'native-base';
import { NavigationActions, NavigationScreenProps, createStackNavigator, createAppContainer } from 'react-navigation';
import Modal from "react-native-modal";
import { EventTypes } from './Events';

export interface MatchEvent {
  id: number;
  code: number;
  timestamp?: number;
}

type Props = {
  events: MatchEvent[],
  onDeleteEvent: (id: number) => void
}
export class EventList extends Component<Props> {
  start = -1;
  constructor(props: any) {
    super(props);
  }
  state = {
    isModalVisible: true,
    hardClose: false
  };

  componentWillMount() {
    this.start = Date.now();
  }

  private createList() {
    if (!this.props.events || this.props.events.length == 0) {
      return (<Text style={styles.placeholder}>No events yet!</Text>)
    }
    return this.props.events.map((e: MatchEvent) => {
      const time = (e.timestamp! - this.start)/1000
      return (<ListItem key={e.id}>
        <Left>
          <Text>{time.toFixed(1)}</Text>
        </Left>
          <Text>{EventTypes[e.code].description}</Text>
        <Right>
          <Button onPress={(event) => this.props.onDeleteEvent(e.id)} icon small><Icon name='beer' /></Button>
        </Right>
      </ListItem>)
    })
  }

  render() {
    return (
      <Content style={styles.container}>
        <List>
          {this.createList()}
        </List>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 3,
    borderColor: "darkgrey",
    borderWidth: 2
  },
  placeholder: {
    alignSelf: "center",
    marginTop: 10
  }
});
