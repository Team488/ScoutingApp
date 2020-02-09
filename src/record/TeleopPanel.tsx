import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Vibration, View } from 'react-native';
import {
  ActionSheet, Button, Col, Content, Grid, H3, Row, Text
} from 'native-base';
import { EventCode } from './Events';

export interface TimedEvent {
  timestamp: number,
  code: number
}

type State = {
  isDisabled: boolean,
  inOpposingTerritory: boolean
}

interface Props {
  onEvent: (event: TimedEvent) => void
}
export class TeleopPanel extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isDisabled: false,
      inOpposingTerritory: false,
    }
  }

  emitEvent(event: number, timestamp?: number) {
    if (!timestamp) {
      timestamp = Date.now();
    }
    this.props.onEvent({ timestamp, code: event })
  }

  renderDisabledButton() {
    if (this.state.isDisabled) {
      return (<Button large style={styles.eventButton}
        onPress={(x) => {
          this.setState({ isDisabled: false });
          this.emitEvent(EventCode.RESTORED);
        }}>
        <Text>Restored</Text>
      </Button>)
    }
    return (<Button large style={styles.eventButton}
      onPress={(x) => {
        this.setState({ isDisabled: true });
        this.emitEvent(EventCode.DISABLED);
      }}>
      <Text>Disabled</Text>
    </Button>)
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
            <H3>TELEOP</H3>
          </Row>
          <Row style={styles.row}>
            <TouchableOpacity
              onPress={(x) => this.emitEvent(EventCode.T_MISS_SHOT)}
              style={styles.squareButton} >
              <Text style={styles.buttonText}>
                Shot{'\n'}Missed
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={(x) => this.emitEvent(EventCode.T_SHOT_LOW)}
              style={styles.squareButton} >
              <Text style={styles.buttonText}>
                Made{'\n'}Lower
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={(x) => this.emitEvent(EventCode.T_SHOT_OUTER)}
              style={styles.squareButton} >
              <Text style={styles.buttonText}>
                Made{'\n'}Outer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={(x) => this.emitEvent(EventCode.T_SHOT_INNER)}
              style={styles.squareButton} >
              <Text style={styles.buttonText}>
                Made{'\n'}Inner
              </Text>
            </TouchableOpacity>
          </Row>
          <Row style={styles.row}>
            <TouchableOpacity
              onPress={(x) => this.emitEvent(EventCode.T_INTAKE_BALL)}
              style={styles.squareButton} >
              <Text style={styles.buttonText}>
                Intake{'\n'}Ball
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={(x) => this.emitEvent(EventCode.SPIN_WHEEL)}
              style={styles.squareButton} >
              <Text style={styles.buttonText}>
                Spin{'\n'}Control
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={(x) => this.emitEvent(EventCode.SET_WHEEL_COLOR)}
              style={styles.squareButton} >
              <Text style={styles.buttonText}>
                Set{'\n'}Color
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={(x) => this.emitEvent(EventCode.THROUGH_TRENCH)}
              style={styles.squareButton} >
              <Text style={styles.buttonText}>
                Went{'\n'}Under{'\n'}Trench
              </Text>
            </TouchableOpacity>
          </Row>
          <Row style={styles.row}>
            <TouchableOpacity
              onPress={(x) => this.emitEvent(EventCode.NO_TRY_CLIMB)}
              style={styles.squareButton} >
              <Text style={styles.buttonText}>
                Didn't{'\n'}Try To{'\n'}Climb
              </Text>
            </TouchableOpacity>
            {this.renderDisabledButton()}
          </Row>
          <Row style={styles.row}>
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
                Lifted{'\n'}Robot(s)
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