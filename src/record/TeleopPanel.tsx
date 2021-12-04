import React, { Component } from 'react';
import { StyleSheet, Vibration, View } from 'react-native';
import {
  ActionSheet, Button, Col, Content, Grid, H3, Row, Text
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

  render() {
    return (
      <OnEventContext.Provider value={this.props.onEvent}>
        <View style={{ backgroundColor: "#95e1d3", padding: 5 }}>
          <View>
            <Row style={styles.row}>
              <H3>IN TELEOP</H3>
            </Row>
            <Grid>
              <Row style={styles.row}>
                <Col style={styles.leftColumn}>
                  <ButtonCard title="Scored HATCH on" style={{ backgroundColor: "#f38181" }}>
                    <ModalEventButton
                      label="Rocket"
                      dialogMessage="Where on the ROCKET was the HATCH scored?"
                      eventOptions={{
                        "FRONT TOP": EventCode.HATCH_FRONT_TOP,
                        "FRONT MIDDLE": EventCode.HATCH_FRONT_MID,
                        "FRONT BOTTOM": EventCode.HATCH_FRONT_BOT,
                        "BACK TOP": EventCode.HATCH_BACK_TOP,
                        "BACK MIDDLE": EventCode.HATCH_BACK_MID,
                        "BACK BOTTOM": EventCode.HATCH_BACK_BOT,
                      }}
                    />
                    <ModalEventButton
                      label="Ship"
                      dialogMessage="Where on the SHIP was the HATCH scored?"
                      eventOptions={{
                        "FRONT": EventCode.HATCH_SHIP_FRONT,
                        "SIDE": EventCode.HATCH_SHIP_SIDE
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
                        "TOP": EventCode.CARGO_TOP,
                        "MIDDLE": EventCode.CARGO_MID,
                        "BOTTOM": EventCode.CARGO_BOT
                      }}
                    />
                  
                    <ModalEventButton
                      label="Ship"
                      dialogMessage="Where on the SHIP was the CARGO scored?"
                      eventOptions={{
                        "FRONT": EventCode.CARGO_SHIP_FRONT,
                        "SIDE": EventCode.CARGO_SHIP_SIDE
                      }}
                    />
                  </ButtonCard>
                </Col>
              </Row>
              <Row style={styles.row}>
                <Col style={styles.leftColumn}>
                  <ButtonCard title="Grabbed HATCH from" style={{ backgroundColor: "#f38181" }}>
                    <EventButton label="Floor" eventCode={EventCode.GRAB_HATCH_FLOOR} />
                    <EventButton label="Station" eventCode={EventCode.GRAB_HATCH_STATION} />
                  </ButtonCard>
                </Col>
                <Col style={styles.rightColumn}>
                  <ButtonCard title="Grabbed CARGO from" style={{ backgroundColor: "#eaffd0" }}>
                    <EventButton label="Floor" eventCode={EventCode.GRAB_CARGO_FLOOR} />
                    <EventButton label="Station" eventCode={EventCode.GRAB_CARGO_STATION} />
                  </ButtonCard>
                </Col>
              </Row>
              <Row style={styles.row}>
                <Col style={styles.leftColumn}>
                  <EventButton label="Dropped Hatch" eventCode={EventCode.DROP_HATCH}/>
                </Col>
                <Col style={styles.rightColumn}>
                  <EventButton label="Dropped Cargo" eventCode={EventCode.DROP_CARGO}/>
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