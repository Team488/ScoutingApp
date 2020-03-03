import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { H3, Col, Row, Text } from 'native-base';
import { EventCode } from './Events';

export interface TimedEvent {
  timestamp: number,
  code: number
}

type State = {
  crossedLine: boolean,
  innerGoals: number,
  lowerGoals: number,
  outerGoals: number,
  missedGoals: number,
  intake: number
}

interface Props {
  onEvent: (event: TimedEvent) => void
}
export class AutonomousPanel extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      crossedLine: false,
      innerGoals: 0,
      lowerGoals: 0,
      outerGoals: 0,
      missedGoals: 0,
      intake: 0
    }
  }


  emitEvent(event: number, timestamp?: number) {
    if (!timestamp) {
      timestamp = Date.now();
    }
    this.props.onEvent({ timestamp, code: event })

    // set state for each counter
    switch (event) {
      case EventCode.A_SHOT_INNER:
        this.setState(prev => { return { innerGoals: prev.innerGoals + 1 } });
        break;

      case EventCode.A_SHOT_LOW:
        this.setState(prev => { return { lowerGoals: prev.lowerGoals + 1 } });
        break;

      case EventCode.A_SHOT_OUTER:
        this.setState(prev => { return { outerGoals: prev.outerGoals + 1 } });
        break;

      case EventCode.A_MISS_SHOT:
        this.setState(prev => { return { missedGoals: prev.missedGoals + 1 } });
        break;

      case EventCode.A_INTAKE_BALL:
        this.setState(prev => { return { intake: prev.intake + 1 } });
        break;

      case EventCode.CROSS_START:
        this.setState({ crossedLine: true });
        break;

      default:
      // do nothing
    }

  }

  render() {
    return (
      <View style={{ backgroundColor: "#f69679", padding: 0 }}>
        <Row style={styles.row}>
          <H3>AUTONOMOUS</H3>
        </Row>

        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Col>
            <Image source={require('../../img/ScoreTower.png')} style={{ marginLeft: 90, marginTop: 5 }} />
          </Col>
          <Col style={{ justifyContent: 'flex-end' }}>
            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
              <Image source={require('../../img/CrossLine.png')} />
            </View>
          </Col>
        </View>
        {/*Add control for counting goals in the INNER high goal */}
        <TouchableOpacity
          onPress={(x) => this.emitEvent(EventCode.A_SHOT_INNER)}
          style={[styles.eventCard,
          {
            width: 130,
            height: 80,
            top: 65,
            marginLeft: 15,
          }]} >
          <Col style={{ width: 60, justifyContent: 'flex-start', flexDirection: 'column' }}>
            <Text style={styles.eventText}>Inner</Text>
            <Text style={styles.valueText}>{this.state.innerGoals}</Text>
          </Col>
          <Col style={{ width: 60, justifyContent: 'flex-end', flexDirection: 'column' }}>
            <Image source={require('../../img/InnerArrow.png')} />
          </Col>
        </TouchableOpacity>

        {/*Add control for counting goals in the LOWER goal */}
        <TouchableOpacity
          onPress={(x) => this.emitEvent(EventCode.A_SHOT_LOW)}
          style={[styles.eventCard,
          {
            width: 130,
            height: 80,
            top: 265,
            marginLeft: 15,
          }]} >
          <Col style={{ width: 60, justifyContent: 'flex-start', flexDirection: 'column' }}>
            <Text style={styles.eventText}>Lower</Text>
            <Text style={styles.valueText}>{this.state.lowerGoals}</Text>
          </Col>
          <Col style={{ width: 60, justifyContent: 'flex-end', flexDirection: 'column' }}>
            <Image source={require('../../img/LowerArrow.png')} />
          </Col>
        </TouchableOpacity>

        {/*Add control for counting goals in the OUTER goal */}
        <TouchableOpacity
          onPress={(x) => this.emitEvent(EventCode.A_SHOT_OUTER)}
          style={[styles.eventCard,
          {
            width: 150,
            height: 80,
            top: 90,
            marginLeft: 150,
          }]} >
          <Col style={{ width: 60, justifyContent: 'flex-end', flexDirection: 'column' }}>
            <Image source={require('../../img/OuterArrow.png')} />
          </Col>
          <Col style={{ width: 60, justifyContent: 'flex-start', flexDirection: 'column' }}>
            <Text style={styles.eventText}>Outer</Text>
            <Text style={styles.valueText}>{this.state.outerGoals}</Text>
          </Col>
        </TouchableOpacity>

        {/*Add control for counting missed shots */}
        <TouchableOpacity
          onPress={(x) => this.emitEvent(EventCode.A_MISS_SHOT)}
          style={[styles.eventCard,
          {
            width: 150,
            height: 80,
            marginTop: 190,
            marginLeft: 150,
          }]} >
          <Col style={{ width: 60, justifyContent: 'flex-end', flexDirection: 'column' }}>
            <Image source={require('../../img/MissArrow.png')} />
          </Col>
          <Col style={{ width: 70, justifyContent: 'flex-start', flexDirection: 'column' }}>
            <Text style={styles.eventText}>Misses</Text>
            <Text style={styles.valueText}>{this.state.missedGoals}</Text>
          </Col>
        </TouchableOpacity>

        <Image source={require('../../img/RobotIcon.png')} style={{ position: 'absolute', marginTop: 90, marginLeft: 330, width: 150, height: 150 }} />
        <Image source={require('../../img/ball.png')} style={{ position: 'absolute', top: 140, right: 140, width: 40, height: 40 }} />

        {/*Add control for counting balls into robot */}
        <TouchableOpacity
          onPress={(x) => this.emitEvent(EventCode.A_INTAKE_BALL)}
          style={[styles.eventCard,
          {
            width: 240,
            height: 100,
            top: 50,
            right: 10
          }]} >
          <Col style={{ width: 60, justifyContent: 'flex-end', flexDirection: 'column' }}>
            <Image source={require('../../img/IntakeArrow.png')} />
          </Col>
          <Col style={{ width: 70, justifyContent: 'flex-start', flexDirection: 'column' }}>
            <Text style={styles.eventText}>Intake</Text>
            <Text style={styles.valueText}>{this.state.intake}</Text>
          </Col>
        </TouchableOpacity>

        {/*Add control for tracking crossing the start line */}
        <TouchableOpacity
          onPress={(x) => this.emitEvent(EventCode.CROSS_START)}
          style={[styles.eventCard,
          {
            width: 160,
            height: 100,
            right: 10,
            bottom: 0
          }]} >
          <Col style={{ width: 60, justifyContent: 'flex-end', flexDirection: 'column' }}>
            <Image source={require('../../img/CrossLineArrow.png')} />
          </Col>
          <Col style={{ width: 80, justifyContent: 'flex-start', flexDirection: 'column' }}>
            <Text style={styles.eventText}>Crossed</Text>
            <Text style={styles.valueText}>
              {this.state.crossedLine ? "Yes" : "No"}</Text>
          </Col>
        </TouchableOpacity>
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
    backgroundColor: 'transparent',
    height: 60,
    width: 60
  },
  buttonText: {
    fontSize: 20,
    textTransform: 'capitalize',
    textAlign: 'center',
    color: '#FFFFFF'
  },
  valueText: {
    fontSize: 30,
    textAlign: 'center'
  },
  eventCard: {
    position: 'absolute',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  eventText: {
    textAlign: 'center'
  }
})