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

type Props = {
  title: string,
  style?: ViewStyle
}
export default class ButtonCard extends Component<Props> {
  render() {
    return (
      <View style={[styles.panel, this.props.style]}>
        <Text style={styles.panelTitle}>{this.props.title}</Text>
        <View style={styles.panelContent}>
          {this.props.children}
        </View>
      </View>
    )
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