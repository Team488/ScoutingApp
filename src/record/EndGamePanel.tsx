import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Vibration, View } from 'react-native';
import { ActionSheet, Button, Col, Content, Grid, H3, Row, Text } from 'native-base';
import { EventCode } from './Events';

export interface TimedEvent {
  timestamp: number,
  code: number
}

type State = {
}

interface Props {
  onEvent: (event: TimedEvent) => void
}
export class EndGamePanel extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
    }
  }

  emitEvent(event: number, timestamp?: number) {
    if (!timestamp) {
      timestamp = Date.now();
    }
    this.props.onEvent({ timestamp, code: event })
  }

  showDialog(title: string, options: { [index: string]: number }) {
    const cancelIdx = Object.keys(options).length;
    const timestamp = Date.now();
    ActionSheet.show(
      {
        options: [...Object.keys(options), "Cancel"],
        cancelButtonIndex: cancelIdx,
        title,
      },
      buttonIndex => {
        if (buttonIndex === cancelIdx) {
          return;
        }
        const i = Object.keys(options)[buttonIndex];
        this.emitEvent(options[i], timestamp);
      }
    )
  }

  robotClimbed() {
    this.showDialog(
      "What was the state of the bar when the robot climbed?",
      {
        "Level": EventCode.CLIMB_LEVEL,
        "Tilted": EventCode.CLIMB_TILTED
      }
    )
  }

  robotFailedClimb() {
    this.showDialog(
      "What was the state of the bar when the robot failed to climb?",
      {
        "Level": EventCode.FAILED_LEVEL,
        "Tilted": EventCode.FAILED_TILTED
      }
    )
  }

  robotLifted() {
    this.showDialog(
      "How many robots were lifted?",
      {
        "1 Robot": EventCode.LIFTED_1,
        "2 Robots": EventCode.LIFTED_2
      }
    )
  }


  render() {
    return (
      <View style={{ backgroundColor: "#95e1d3", padding: 5 }}>
        <View>
          <Row style={styles.row}>
            <H3>END GAME</H3>
          </Row>
          <Row style={styles.row}>
          <TouchableOpacity
              onPress={(x) => this.emitEvent(EventCode.NO_TRY_CLIMB)}
              style={styles.squareButton} >
              <Text style={styles.buttonText}>
                Didn't{'\n'}Try To{'\n'}Climb
              </Text>
            </TouchableOpacity>
          <TouchableOpacity
              onPress={(x) => this.robotFailedClimb()}
              style={styles.squareButton} >
              <Text style={styles.buttonText}>
                Failed{'\n'}Climb
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={(x) => this.robotClimbed()}
              style={styles.squareButton} >
              <Text style={styles.buttonText}>
                Climbed
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={(x) => this.robotLifted()}
              style={styles.squareButton} >
              <Text style={styles.buttonText}>
                Lifted{'\n'}Robots
              </Text>
            </TouchableOpacity>
          </Row>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  eventButton: {
    margin: 5,
    alignSelf: 'center'
  },
  row: {
    alignContent: 'center',
    justifyContent: 'space-around',
    margin: 5
  },
  leftColumn: {
    marginHorizontal: 5,
  },
  rightColumn: {
    marginHorizontal: 5,
    alignContent: 'flex-start'
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