import React, { Component } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { StyleSheet, Vibration, View } from 'react-native';
import Modal from "react-native-modal";
import {
  ActionSheet, Button, Body, Left, Card, CardItem, Col,
  Container, Content, Grid, H3, Header, List, ListItem,
  Row, Icon, Title, Text
} from 'native-base';
import ButtonCard from './ButtonCard';
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
export class SandstormPanel extends Component<Props, State> {
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

  renderOTButton() {
    if (this.state.inOpposingTerritory) {
      return (<Button large style={styles.eventButton}
        onPress={(x) => {
          this.setState({ inOpposingTerritory: false });
          this.emitEvent(EventCode.SAND_LEAVE_OT);
        }}>
        <Text>Left OT</Text>
      </Button>)
    }
    return (<Button large style={styles.eventButton}
      onPress={(x) => {
        this.setState({ inOpposingTerritory: true });
        this.emitEvent(EventCode.SAND_ENTER_OT);
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
        "FRONT TOP": EventCode.SAND_HATCH_FRONT_TOP,
        "FRONT MIDDLE": EventCode.SAND_HATCH_FRONT_MID,
        "FRONT BOTTOM": EventCode.SAND_HATCH_FRONT_BOT,
        "BACK TOP": EventCode.SAND_HATCH_BACK_TOP,
        "BACK MIDDLE": EventCode.SAND_HATCH_BACK_MID,
        "BACK BOTTOM": EventCode.SAND_HATCH_BACK_BOT,
      }
    )
  }

  scoreHatchShip() {
    this.showDialog(
      "Where on the SHIP was the HATCH scored?",
      {
        "FRONT": EventCode.SAND_HATCH_SHIP_FRONT,
        "SIDE": EventCode.SAND_HATCH_SHIP_SIDE
      })
  }

  scoreCargoRocket() {
    this.showDialog(
      "Where on the ROCKET was the CARGO scored?",
      {
        "TOP": EventCode.SAND_CARGO_TOP,
        "MIDDLE": EventCode.SAND_CARGO_MID,
        "BOTTOM": EventCode.SAND_CARGO_BOT
      });
  }

  scoreCargoShip() {
    this.showDialog(
      "Where on the SHIP was the CARGO scored?",
      {
        "FRONT": EventCode.SAND_CARGO_SHIP_FRONT,
        "SIDE": EventCode.SAND_CARGO_SHIP_SIDE
      })
  }

  render() {
    return (
      <View style={{ backgroundColor: "#fce38a", padding: 5 }}>
        <View>
          <Row style={styles.row}>
            <H3>IN SANDSTORM</H3>
          </Row>
          <Grid>
            <Col style={styles.leftColumn}>
              <Row style={styles.row}>
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
              </Row>
              <Row style={styles.row}>
                <ButtonCard title="Grabbed HATCH from" style={{ backgroundColor: "#f38181" }}>
                  <Button large style={styles.eventButton}
                    onPress={(x) => this.emitEvent(EventCode.SAND_HATCH_FLOOR)}>
                    <Text>Floor</Text>
                  </Button>
                  <Button large style={styles.eventButton}
                    onPress={(x) => this.emitEvent(EventCode.SAND_HATCH_STATION)}>
                    <Text>Station</Text>
                  </Button>
                </ButtonCard>
              </Row>
            </Col>
            <Col style={styles.rightColumn}>
              <Row style={styles.row}>
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
              </Row>
              <Row style={styles.row}>
                <ButtonCard title="Grabbed CARGO from" style={{ backgroundColor: "#eaffd0" }}>
                  <Button large style={styles.eventButton}
                    onPress={(x) => this.emitEvent(EventCode.SAND_CARGO_FLOOR)}>
                    <Text>Floor</Text>
                  </Button>
                  <Button large style={styles.eventButton}
                    onPress={(x) => this.emitEvent(EventCode.SAND_CARGO_STATION)}>
                    <Text>Station</Text>
                  </Button>
                </ButtonCard>
              </Row>
            </Col>
          </Grid>
        </View>
        <View>
          <Grid>
            <Col style={styles.leftColumn}>
              <Row style={styles.row}>
                <Button large style={styles.eventButton}
                  onPress={(x) => this.emitEvent(EventCode.SAND_DROP_HATCH)}>
                  <Text>Dropped Hatch</Text>
                </Button>
              </Row>
              <Row style={styles.row}>
                <Button large style={styles.eventButton}
                  onPress={(x) => this.emitEvent(EventCode.SAND_CROSS_START)}>
                  <Text>Crossed Start</Text>
                </Button>
              </Row>
            </Col>
            <Col style={styles.rightColumn}>
              <Row style={styles.row}>
                <Button large style={styles.eventButton}
                  onPress={(x) => this.emitEvent(EventCode.SAND_DROP_CARGO)}>
                  <Text>Dropped Cargo</Text>
                </Button>
              </Row>
              <Row style={styles.row}>
                {this.renderOTButton()}
              </Row>
            </Col>
          </Grid>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  eventButton: {
    margin: 5
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