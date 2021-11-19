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
import { EventButton } from "../common/EventButton"
import { ModalEventButton } from '../common/ModalEventButton';
import { OnEventContext } from '../common/OnEventContext';

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

  render() {
    return (
      <OnEventContext.Provider value={this.props.onEvent}>
        <View style={{ backgroundColor: "#fce38a", padding: 5 }}>
          <View>
            <Grid>
              <Row style={styles.row}>
                <H3>IN SANDSTORM</H3>
              </Row>
              <Row style={styles.row}>
                <Col style={styles.leftColumn}>
                  <EventButton label="Crossed Start" eventCode={EventCode.SAND_CROSS_START} />
                </Col>
                <Col style={styles.rightColumn}>
                  {this.renderOTButton()}
                </Col>
              </Row>
              <Row style={styles.row}>
                <Col style={styles.leftColumn}>
                  <ButtonCard title="Scored HATCH on" style={{ backgroundColor: "#f38181" }}>
                    <ModalEventButton
                        label="Rocket"
                        dialogMessage="Where on the ROCKET was the HATCH scored?"
                        eventOptions={{
                          "FRONT TOP": EventCode.SAND_HATCH_FRONT_TOP,
                          "FRONT MIDDLE": EventCode.SAND_HATCH_FRONT_MID,
                          "FRONT BOTTOM": EventCode.SAND_HATCH_FRONT_BOT,
                          "BACK TOP": EventCode.SAND_HATCH_BACK_TOP,
                          "BACK MIDDLE": EventCode.SAND_HATCH_BACK_MID,
                          "BACK BOTTOM": EventCode.SAND_HATCH_BACK_BOT,
                        }}
                    />
                    <ModalEventButton
                        label="Ship"
                        dialogMessage="Where on the SHIP was the HATCH scored?"
                        eventOptions={{
                          "FRONT": EventCode.SAND_HATCH_SHIP_FRONT,
                          "SIDE": EventCode.SAND_HATCH_SHIP_SIDE
                        }}
                    />
                  </ButtonCard>
                </Col>
                <Col style={styles.rightColumn}>
                  <ButtonCard title="Scored CARGO on" style={{ backgroundColor: "#eaffd0" }}>
                    <ModalEventButton
                          label="Rocket"
                          dialogMessage="Where on the ROCKET was the CARGO scored?"
                          eventOptions={{
                            "TOP": EventCode.SAND_CARGO_TOP,
                            "MIDDLE": EventCode.SAND_CARGO_MID,
                            "BOTTOM": EventCode.SAND_CARGO_BOT
                          }}
                    />
                    <ModalEventButton
                          label="Ship"
                          dialogMessage="Where on the SHIP was the CARGO scored?"
                          eventOptions={{
                            "FRONT": EventCode.SAND_CARGO_SHIP_FRONT,
                            "SIDE": EventCode.SAND_CARGO_SHIP_SIDE
                          }}
                    />
                  </ButtonCard>
                </Col>
              </Row>
              <Row style={styles.row}>
                <Col style={styles.leftColumn}>
                  <ButtonCard title="Grabbed HATCH from" style={{ backgroundColor: "#f38181" }}>
                    <EventButton label="Floor" eventCode={EventCode.SAND_HATCH_FLOOR} />
                    <EventButton label="Station" eventCode={EventCode.SAND_HATCH_STATION} />
                  </ButtonCard>
                </Col>
                <Col style={styles.rightColumn}>
                  <ButtonCard title="Grabbed CARGO from" style={{ backgroundColor: "#eaffd0" }}>
                    <EventButton label="Floor" eventCode={EventCode.SAND_CARGO_FLOOR} />
                    <EventButton label="Station" eventCode={EventCode.SAND_CARGO_STATION} />
                  </ButtonCard>
                </Col>
              </Row>
              <Row style={styles.row}>
                <Col style={styles.leftColumn}>
                  <EventButton label="Dropped Hatch" eventCode={EventCode.SAND_DROP_HATCH} />
                </Col>
                <Col style={styles.rightColumn}>
                  <EventButton label="Dropped Cargo" eventCode={EventCode.SAND_DROP_CARGO} />
                </Col>
              </Row>
            </Grid>
          </View>
        </View>
      </OnEventContext.Provider>
    )
  }
}

const styles = StyleSheet.create({
  eventButton: {
    margin: 5,
    alignSelf: 'center'
  },
  row: {
    justifyContent: 'space-around',
  },
  leftColumn: {
    marginHorizontal: 5,
    alignContent: 'center',
  },
  rightColumn: {
    marginHorizontal: 5,
    alignContent: 'center',
  }
})