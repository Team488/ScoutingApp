import React, {Component} from 'react';
import {Platform, StyleSheet} from 'react-native';
import { Text, View} from 'native-base';

type State = {
  time: number;
}

export default class Timer extends Component<{}, State> {
  constructor() {
    super({})

    this.state = {
      time: 0
    }
  }

  render() {
    return (
      <View>

        <Text>{this.state.time}</Text>
      </View>
    )
  }
}
