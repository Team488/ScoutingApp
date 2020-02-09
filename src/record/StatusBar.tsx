import React, { Component } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { StyleSheet, StyleProp, Vibration, View, ViewStyle } from 'react-native';
import Modal from "react-native-modal";
import {
  ActionSheet, Button, Body, Left, Card, CardItem, Col,
  Container, Content, Grid, Header, List, ListItem,
  Row, Icon, Title, Text
} from 'native-base';
import { AppRegistry, Image } from 'react-native';

type State = {
  time: number
}

type Props = {
  title: string,
  style?: ViewStyle
}
export class StatusBar extends Component<Props, State> {
  private start: number = 0;
  private timer: NodeJS.Timer|null = null;
  constructor(props: any) {
    super(props);
    this.state = {
      time:0
    }
  }

  componentDidMount() {
    this.start = Date.now();
    this.timer = setInterval(() => {
      this.setState({
        time: (Date.now() - this.start)/1000
      })
    }, 100);
  }
  
  componentWillUnmount() {
    clearInterval(this.timer!);
  }

  render() {
    return (
      <View style={{flex:1, flexDirection: "row", margin: 5}}>
        <View style={{flex:1, flexDirection: "column"}}>
        </View>
        <View style={{flex:1, flexDirection: "column"}}>
          <Text>{this.state.time.toFixed(2)}</Text>
        </View>
      </View>)
  }
}


const styles = StyleSheet.create({
  panelTitle: {
    marginHorizontal: 10,
    marginVertical: 5
  },
  panelContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  panel: {
    flex: 1,
    flexDirection: "column",
    borderWidth: 3,
    borderColor: "darkgrey",
    backgroundColor: "lightgrey",
    borderRadius: 10,
    margin: 3
  }
})