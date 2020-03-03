import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, H3, Col, Row, Text } from 'native-base';
import { EventCode } from './Events';

export interface TimedEvent {
  timestamp: number,
  code: number
}

type State = {
  isDisabled: boolean,
  crossedLine: boolean,
  innerGoals: number,
  lowerGoals: number,
  outerGoals: number,
  missedGoals: number,
  pass: number,
  intake: number,
  spin: number,
  match: number,
  through: number
}

interface Props {
  onEvent: (event: TimedEvent) => void
}
export class TeleopPanel extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isDisabled: false,
      crossedLine: false,
      innerGoals: 0,
      lowerGoals: 0,
      outerGoals: 0,
      missedGoals: 0,
      pass: 0,
      intake: 0,
      spin: 0,
      match: 0,
      through: 0
    }
  }


  emitEvent(event: number, timestamp?: number) {
    if (!timestamp) {
      timestamp = Date.now();
    }
    this.props.onEvent({ timestamp, code: event })

    // set state for each counter
    switch (event) {
      case EventCode.T_SHOT_INNER:
        this.setState(prev => { return { innerGoals: prev.innerGoals + 1 } });
        break;

      case EventCode.T_SHOT_LOW:
        this.setState(prev => { return { lowerGoals: prev.lowerGoals + 1 } });
        break;

      case EventCode.T_SHOT_OUTER:
        this.setState(prev => { return { outerGoals: prev.outerGoals + 1 } });
        break;

      case EventCode.T_MISS_SHOT:
        this.setState(prev => { return { missedGoals: prev.missedGoals + 1 } });
        break;

        case EventCode.T_SHOT_PASS:
          this.setState(prev => { return { pass: prev.pass + 1 } });
          break;
  
          case EventCode.T_INTAKE_BALL:
            this.setState(prev => { return { intake: prev.intake + 1 } });
            break;
    
            case EventCode.SPIN_WHEEL:
        this.setState(prev => { return { spin: prev.spin + 1 } });
        break;

      case EventCode.SET_WHEEL_COLOR:
        this.setState(prev => { return { match: prev.match + 1 } });
        break;

      default:
      // do nothing
    }

  }

  renderDisabledButton() {
    if (this.state.isDisabled) {
      return (<Button large style={styles.disableButton}
        onPress={(x) => {
          this.setState({ isDisabled: false });
          this.emitEvent(EventCode.RESTORED);
        }}>
        <Text>Restored</Text>
      </Button>)
    }
    return (<Button large style={styles.disableButton}
      onPress={(x) => {
        this.setState({ isDisabled: true });
        this.emitEvent(EventCode.DISABLED);
      }}>
      <Text>Disabled</Text>
    </Button>)
  }


  render() {
    return (
      <View style={{ backgroundColor: "#f77c7c", padding: 0 }}>
        <Row style={styles.row}>
          <H3>TELOP</H3>
        </Row>

        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Col style={{ height: 400, justifyContent: 'flex-start', flexDirection: 'column' }}>
            <Image source={require('../../img/Trench.png')} style={{ left: 60, marginTop: 30 }} />
          </Col>
          <Col style={{ height: 400, justifyContent: 'flex-end', flexDirection: 'row' }}>
            <Image source={require('../../img/ScoreTowerRev.png')} style={{ right: 90, marginTop: 5 }} />
          </Col>
        </View>

        {/*Add control for counting goals in the INNER high goal */}
        <TouchableOpacity
          onPress={(x) => this.emitEvent(EventCode.T_SHOT_INNER)}
          style={[styles.eventCard,
          {
            width: 130,
            height: 80,
            top: 65,
            right: 15,
          }]} >
          <Col style={{ width: 60, justifyContent: 'flex-end', flexDirection: 'column' }}>
            <Image source={require('../../img/InnerArrowRev.png')} />
          </Col>
          <Col style={{ width: 60, justifyContent: 'flex-start', flexDirection: 'column' }}>
            <Text style={styles.eventText}>Inner</Text>
            <Text style={styles.valueText}>{this.state.innerGoals}</Text>
          </Col>
        </TouchableOpacity>

        {/*Add control for counting goals in the LOWER goal */}
        <TouchableOpacity
          onPress={(x) => this.emitEvent(EventCode.T_SHOT_LOW)}
          style={[styles.eventCard,
          {
            width: 130,
            height: 80,
            top: 265,
            right: 15,
          }]} >
          <Col style={{ width: 60, justifyContent: 'flex-end', flexDirection: 'column' }}>
            <Image source={require('../../img/LowerArrowRev.png')} />
          </Col>
          <Col style={{ width: 60, justifyContent: 'flex-start', flexDirection: 'column' }}>
            <Text style={styles.eventText}>Lower</Text>
            <Text style={styles.valueText}>{this.state.lowerGoals}</Text>
          </Col>
        </TouchableOpacity>

        {/*Add control for counting goals in the OUTER goal */}
        <TouchableOpacity
          onPress={(x) => this.emitEvent(EventCode.T_SHOT_OUTER)}
          style={[styles.eventCard,
          {
            width: 150,
            height: 80,
            top: 90,
            right: 150,
          }]} >
          <Col style={{ width: 60, justifyContent: 'flex-start', flexDirection: 'column' }}>
            <Text style={styles.eventText}>Outer</Text>
            <Text style={styles.valueText}>{this.state.outerGoals}</Text>
          </Col>
          <Col style={{ width: 60, justifyContent: 'flex-end', flexDirection: 'column' }}>
            <Image source={require('../../img/OuterArrowRev.png')} />
          </Col>
        </TouchableOpacity>

        {/*Add control for counting missed shots */}
        <TouchableOpacity
          onPress={(x) => this.emitEvent(EventCode.T_MISS_SHOT)}
          style={[styles.eventCard,
          {
            width: 150,
            height: 80,
            top: 190,
            right: 150,
          }]} >
          <Col style={{ width: 70, justifyContent: 'flex-start', flexDirection: 'column' }}>
            <Text style={styles.eventText}>Misses</Text>
            <Text style={styles.valueText}>{this.state.missedGoals}</Text>
          </Col>
          <Col style={{ width: 60, justifyContent: 'flex-end', flexDirection: 'column' }}>
            <Image source={require('../../img/MissArrowRev.png')} />
          </Col>
        </TouchableOpacity>

        <Image source={require('../../img/RobotIcon.png')} style={{ position: 'absolute', bottom: 15, left: 180, width: 150, height: 150 }} />
        <Image source={require('../../img/ball.png')} style={{ position: 'absolute', bottom: 20, left: 70, width: 40, height: 40 }} />

        {/*Add control for counting balls into robot */}
        <TouchableOpacity
          onPress={(x) => this.emitEvent(EventCode.T_INTAKE_BALL)}
          style={[styles.eventCard,
          {
            width: 160,
            height: 80,
            bottom: 65,
            left: 10
          }]} >
          <Col style={{ width: 70, justifyContent: 'flex-start', flexDirection: 'column' }}>
            <Text style={styles.eventText}>Intake</Text>
            <Text style={styles.valueText}>{this.state.intake}</Text>
          </Col>
          <Col style={{ width: 60, justifyContent: 'flex-end', flexDirection: 'column' }}>
            <Image source={require('../../img/IntakeArrowRev.png')} />
          </Col>
        </TouchableOpacity>

        {/*Add control for tracking when wheel is spun */}
        <TouchableOpacity
          onPress={(x) => this.emitEvent(EventCode.SPIN_WHEEL)}
          style={[styles.eventCard,
          {
            width: 160,
            height: 80,
            top: 50,
            left: 30
          }]} >
          <Col style={{ width: 70, justifyContent: 'flex-start', flexDirection: 'column' }}>
            <Text style={styles.eventText}>Spin 5s</Text>
            <Text style={styles.valueText}>{this.state.spin}</Text>
          </Col>
          <Col style={{ width: 60, justifyContent: 'flex-end', flexDirection: 'column' }}>
            <Image source={require('../../img/SpinArrow.png')} />
          </Col>
        </TouchableOpacity>

        {/*Add control for tracking when wheel color matches */}
        <TouchableOpacity
          onPress={(x) => this.emitEvent(EventCode.SET_WHEEL_COLOR)}
          style={[styles.eventCard,
          {
            width: 130,
            height: 100,
            top: 60,
            left: 210,
          }]} >
          <Col style={{ width: 60, justifyContent: 'flex-end', flexDirection: 'column' }}>
            <Image source={require('../../img/MatchArrow.png')} />
          </Col>
          <Col style={{ width: 60, justifyContent: 'flex-start', flexDirection: 'column' }}>
            <Text style={styles.eventText}>Match{'\n'}Color</Text>
            <Text style={styles.valueText}>{this.state.match}</Text>
          </Col>
        </TouchableOpacity>

        {/*Add control for counting times driving under trench */}
        <TouchableOpacity
          onPress={(x) => this.emitEvent(EventCode.THROUGH_TRENCH)}
          style={[styles.eventCard,
          {
            width: 150,
            height: 80,
            top: 175,
            left: 195,
          }]} >
          <Col style={{ width: 60, justifyContent: 'flex-end', flexDirection: 'column' }}>
            <Image source={require('../../img/ThroughArrow.png')} />
          </Col>
          <Col style={{ width: 80, justifyContent: 'flex-start', flexDirection: 'column' }}>
            <Text style={styles.eventText}>Through</Text>
            <Text style={styles.valueText}>{this.state.through}</Text>
          </Col>
        </TouchableOpacity>
        {this.renderDisabledButton()}

        {/*Add control for counting shots that are passes */}
        <TouchableOpacity
          onPress={(x) => this.emitEvent(EventCode.T_SHOT_PASS)}
          style={[styles.eventCard,
          {
            width: 130,
            height: 70,
            bottom: 35,
            left: 340,
          }]} >
          <Col style={{ width: 60, justifyContent: 'flex-end', flexDirection: 'column' }}>
            <Image source={require('../../img/PassArrow.png')} />
          </Col>
          <Col style={{ width: 60, justifyContent: 'flex-start', flexDirection: 'column' }}>
            <Text style={styles.eventText}>Pass</Text>
            <Text style={styles.valueText}>{this.state.pass}</Text>
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
  disableButton: {
    position: 'absolute',
    bottom: 5,
    right: 30
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