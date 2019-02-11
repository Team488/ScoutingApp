import React, { Component, ReactPropTypes } from "react";
import { Text, TouchableOpacity, View, GestureResponderEvent } from "react-native";
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
  constructor(props: any) {
    super(props);
  }
  state = {
    isModalVisible: true,
    hardClose: false
  };

  private createList() {
    if (!this.props.events || this.props.events.length == 0) {
      return (<Text>No events yet!</Text>)
    }
    return this.props.events.map((e: MatchEvent) => {
      return (<ListItem key={e.id}>
        <Left>
          <Text>{EventTypes[e.code].description}</Text>
        </Left>
        <Right>
          <Button onPress={(event) => this.props.onDeleteEvent(e.id)} icon small><Icon name='beer' /></Button>
        </Right>
      </ListItem>)
    })
  }

  render() {
    return (
      <Content style={{ marginHorizontal: 10, marginVertical: 5 }}>
        <List>
          {this.createList()}
        </List>
      </Content>
    );
  }
}
