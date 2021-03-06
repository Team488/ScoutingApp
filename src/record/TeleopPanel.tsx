import React, { Component } from 'react';
import { StyleSheet, Vibration, View } from 'react-native';
import {
  ActionSheet, Button, Col, Content, Grid, H3, Row, Text
} from 'native-base';
import ButtonCard from './ButtonCard';
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

  renderOTButton() {
    if (this.state.inOpposingTerritory) {
      return (<Button large style={styles.eventButton}
        onPress={(x) => {
          this.setState({ inOpposingTerritory: false });
          this.emitEvent(EventCode.LEAVE_OT);
        }}>
        <Text>Left OT</Text>
      </Button>)
    }
    return (<Button large style={styles.eventButton}
      onPress={(x) => {
        this.setState({ inOpposingTerritory: true });
        this.emitEvent(EventCode.ENTER_OT);
      }}>
      <Text>Entered OT</Text>
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

  scoreHatchRocket() {
    this.showDialog(
      "Where on the ROCKET was the HATCH scored?",
      {
        "FRONT TOP": EventCode.HATCH_FRONT_TOP,
        "FRONT MIDDLE": EventCode.HATCH_FRONT_MID,
        "FRONT BOTTOM": EventCode.HATCH_FRONT_BOT,
        "BACK TOP": EventCode.HATCH_BACK_TOP,
        "BACK MIDDLE": EventCode.HATCH_BACK_MID,
        "BACK BOTTOM": EventCode.HATCH_BACK_BOT,
      }
    )
  }

  scoreHatchShip() {
    this.showDialog(
      "Where on the SHIP was the HATCH scored?",
      {
        "FRONT": EventCode.HATCH_SHIP_FRONT,
        "SIDE": EventCode.HATCH_SHIP_SIDE
      })
  }

  scoreCargoRocket() {
    this.showDialog(
      "Where on the ROCKET was the CARGO scored?",
      {
        "TOP": EventCode.CARGO_TOP,
        "MIDDLE": EventCode.CARGO_MID,
        "BOTTOM": EventCode.CARGO_BOT
      });
  }

  scoreCargoShip() {
    this.showDialog(
      "Where on the SHIP was the CARGO scored?",
      {
        "FRONT": EventCode.CARGO_SHIP_FRONT,
        "SIDE": EventCode.CARGO_SHIP_SIDE
      })
  }

  render() {
    return (
      <View style={{ backgroundColor: "#95e1d3", padding: 5 }}>
        <View>
          <Row style={styles.row}>
            <H3>IN TELEOP</H3>
          </Row>
          <Grid>
            <Row style={styles.row}>
              <Col style={styles.leftColumn}>
                <ButtonCard title="Scored HATCH on" style={{ backgroundColor: "#f38181" }}>
                  <Button large style={styles.eventButton}
                    onPress={(x) => this.scoreHatchRocket()}>
                    <Text>Rocket</Text>
                  </Button>
                  <Button large style={styles.eventButton}
                    onPress={(x) => this.scoreHatchShip()}>
                    <Text>Ship</Text>
                  </Button>
                </ButtonCard>
              </Col>
              <Col style={styles.rightColumn}>
                <ButtonCard title="Scored CARGO on" style={{ backgroundColor: "#eaffd0" }}>
                  <Button large style={styles.eventButton}
                    onPress={(x) => this.scoreCargoRocket()}>
                    <Text>Rocket</Text>
                  </Button>
                  <Button large style={styles.eventButton}
                    onPress={(x) => this.scoreCargoShip()}>
                    <Text>Ship</Text>
                  </Button>
                </ButtonCard>
              </Col>
            </Row>
            <Row style={styles.row}>
              <Col style={styles.leftColumn}>
                <ButtonCard title="Grabbed HATCH from" style={{ backgroundColor: "#f38181" }}>
                  <Button large style={styles.eventButton}
                    onPress={(x) => this.emitEvent(EventCode.GRAB_HATCH_FLOOR)}>
                    <Text>Floor</Text>
                  </Button>
                  <Button large style={styles.eventButton}
                    onPress={(x) => this.emitEvent(EventCode.GRAB_HATCH_STATION)}>
                    <Text>Station</Text>
                  </Button>
                </ButtonCard>
              </Col>
              <Col style={styles.rightColumn}>
                <ButtonCard title="Grabbed CARGO from" style={{ backgroundColor: "#eaffd0" }}>
                  <Button large style={styles.eventButton}
                    onPress={(x) => this.emitEvent(EventCode.GRAB_CARGO_FLOOR)}>
                    <Text>Floor</Text>
                  </Button>
                  <Button large style={styles.eventButton}
                    onPress={(x) => this.emitEvent(EventCode.GRAB_CARGO_STATION)}>
                    <Text>Station</Text>
                  </Button>
                </ButtonCard>
              </Col>
            </Row>
            <Row style={styles.row}>
              <Col style={styles.leftColumn}>
                <Button large style={styles.eventButton}
                  onPress={(x) => this.emitEvent(EventCode.DROP_HATCH)}>
                  <Text>Dropped Hatch</Text>
                </Button>
              </Col>
              <Col style={styles.rightColumn}>
                <Button large style={styles.eventButton}
                  onPress={(x) => this.emitEvent(EventCode.DROP_CARGO)}>
                  <Text>Dropped Cargo</Text>
                </Button>
              </Col>
            </Row>
            <Row style={styles.row}>
              <Col style={styles.leftColumn}>
                {this.renderDisabledButton()}
              </Col>
              <Col style={styles.rightColumn}>
                {this.renderOTButton()}
              </Col>
            </Row>
          </Grid>
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
  },
  leftColumn: {
    marginHorizontal: 5,
  },
  rightColumn: {
    marginHorizontal: 5,
    alignContent: 'flex-start'
  }
})