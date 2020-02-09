import React, { Component } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { Button, StyleSheet, TouchableOpacity, Vibration, View } from 'react-native';
import Modal from "react-native-modal";
import {
  ActionSheet, Body, Left, Card, CardItem, Col,
  Container, Content, Grid, H3, Header, List, ListItem,
  Row, Icon, Title, Text
} from 'native-base';
import { EventCode } from './Events';

export interface TimedEvent {
  timestamp: number,
  code: number
}

type State = {
  inOpposingTerritory: boolean
}

interface Props {
  onEvent: (event: TimedEvent) => void
}
export class AutonomousPanel extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inOpposingTerritory: false,
    }
  }

  emitEvent(event: number, timestamp?: number) {
    if (!timestamp) {
      timestamp = Date.now();
    }
    this.props.onEvent({ timestamp, code: event })
  }

  render() {
    return (
      <View style={{ backgroundColor: "#fce38a", padding: 5 }}>
        <View>
          <Grid>
            <Row style={styles.row}>
              <H3>AUTONOMOUS</H3>
            </Row>
            <Row style={styles.row}>
              <TouchableOpacity
                onPress={(x) => this.emitEvent(EventCode.CROSS_START)}
                style={styles.squareButton} >
                <Text style={styles.buttonText}>
                  Crossed{'\n'}Start
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={(x) => this.emitEvent(EventCode.A_INTAKE_BALL)}
                style={styles.squareButton} >
                <Text style={styles.buttonText}>
                  Intake{'\n'}Ball
                  </Text>
              </TouchableOpacity>
            </Row>
            <Row style={styles.row}>
              <TouchableOpacity
                onPress={(x) => this.emitEvent(EventCode.A_MISS_SHOT)}
                style={styles.squareButton} >
                <Text style={styles.buttonText}>
                  Shot{'\n'}Missed
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={(x) => this.emitEvent(EventCode.A_SHOT_LOW)}
                style={styles.squareButton} >
                <Text style={styles.buttonText}>
                  Made{'\n'}Lower
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={(x) => this.emitEvent(EventCode.A_SHOT_OUTER)}
                style={styles.squareButton} >
                <Text style={styles.buttonText}>
                  Made{'\n'}Outer
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={(x) => this.emitEvent(EventCode.A_SHOT_INNER)}
                style={styles.squareButton} >
                <Text style={styles.buttonText}>
                  Made{'\n'}Inner
                  </Text>
              </TouchableOpacity>
            </Row>
          </Grid>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-around',
    margin: 5
  },
  leftColumn: {
    marginHorizontal: 5,
    alignContent: 'center',
  },
  rightColumn: {
    marginHorizontal: 5,
    alignContent: 'center',
  },
  squareButton: {
    borderRadius: 8,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
    height: 100,
    width: 100
  },
  buttonText: {
    fontSize: 20,
    textTransform: 'capitalize',
    textAlign: 'center',
    color: '#FFFFFF'
  }
})