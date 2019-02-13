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
import DetailModal from './DetailModal';

type Props = {
  title: string,
  style?: ViewStyle
}
export class StatusBar extends Component<Props> {
  render() {
    return (
      <View style={{flex:1, flexDirection: "row", margin: 5}}>
        <View style={{flex:1, flexDirection: "column"}}>
          <Text>Hatches:</Text>
          <Text>Cargo:</Text>
        </View>
        <View style={{flex:1, flexDirection: "column"}}>
          <Text> TELEOP </Text>
        </View>
        <View style={{flex:1, flexDirection: "column"}}>
          <Text>Timer</Text>
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