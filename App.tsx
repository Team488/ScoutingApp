/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import {Hello} from './components/Hello';
import Bananas from './components/Bananas';
import ScoutingForm from './components/ScoutingForm';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const things = [
  "cat",
  "dog",
  "roller coaster"
]

type Props = {};
export default class App extends Component<Props> {
  listThings() {
    const result = [];
    for (let x of things) {
      result.push(<Text style={styles.welcome}>{x}</Text>)
    }
    return result; 
  }

  render() {
    return (
      <Container>
        <Header>
          <Text
            style={{
              color:"white",
              fontSize: 24
            }}
          >Team xBot Scouting App</Text></Header>
          <Content>
            <ScoutingForm></ScoutingForm>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
