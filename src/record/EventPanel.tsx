import React, { Component } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { StyleSheet, Vibration, View } from 'react-native';
import Modal from "react-native-modal";
import {
  ActionSheet, Button, Body, Left, Card, CardItem, Col,
  Container, Content, Grid, Header, List, ListItem,
  Row, Icon, Title, Text
} from 'native-base';
import { AppRegistry, Image } from 'react-native';
import DetailModal from './DetailModal';
import ButtonCard from './ButtonCard';

const BUTTONS = [
  "Level 1",
  "Level 2",
  "Level 3"
]

export interface TimedEvent {
  timestamp: number,
  code: number
}

type State = {
  showDialog: boolean,
  dialogContent: JSX.Element
  isDisabled: boolean,
  inOpposingTerritory: boolean
}

interface Props {
  onEvent: (event: TimedEvent) => void
}
export class EventPanel extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isDisabled: false,
      inOpposingTerritory: false,
      showDialog: false,
      dialogContent: <Text>Empty Dialog</Text>
    }
  }

  emitEvent(event: number) {
    this.props.onEvent({ timestamp: Date.now(), code: event })
  }

  addEvent(x: Event) {
    Vibration.vibrate(2000, false);
    console.log('Got event ', x);
    if (x == 'lifted_self') {
      ActionSheet.show(
        {
          options: BUTTONS,
          cancelButtonIndex: 0,
          destructiveButtonIndex: 0,
          title: "Which level"
        },
        (buttonIndex) => {
          console.log("Got button ", buttonIndex)
        }
      )
    }
  }

  renderEvents() {
    return (
      <List>
        <ListItem></ListItem>
      </List>
    )
  }

  renderDisabledButton() {
    if (this.state.isDisabled) {
      return (<Button large style={styles.eventButton}
        onPress={(x) => {
          this.setState({ isDisabled: false });
          this.emitEvent(6);
        }}>
        <Text>Restored</Text>
      </Button>)
    }
    return (<Button large style={styles.eventButton}
      onPress={(x) => {
        this.setState({ isDisabled: true });
        this.emitEvent(5);
      }}>
      <Text>Disabled</Text>
    </Button>)
  }

  renderOTButton() {
    if (this.state.inOpposingTerritory) {
      return (<Button large style={styles.eventButton}
        onPress={(x) => {
          this.setState({ inOpposingTerritory: false });
          this.emitEvent(4);
        }}>
        <Text>Left OT</Text>
      </Button>)
    }
    return (<Button large style={styles.eventButton}
      onPress={(x) => {
        this.setState({ inOpposingTerritory: true });
        this.emitEvent(1);
      }}>
      <Text>Entered OT</Text>
    </Button>)
  }

  /**
   * This is an example of a relatively complex dialog. We could customize this and
   * add some icons, or even pictures of the rocket and ship to indicate location.
   * Right now, it's just a panel with sizx buttons.
   */
  scoreHatchRocket() {
    // TODO: Capture the timestamp before opening the dialog
    this.setState({
      dialogContent: (
        <Content style={{ margin: 10, padding: 10 }}>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
            <Text>Where and on which side of the ROCKET was the HATCH scored?</Text>
          </View>
          <Grid>
            <Col>
              <Row>
                <Text>BACK</Text>
              </Row>
              <Row>
                <Button large onPress={() => this.dialogDone(28)}>
                  <Text>Back Top</Text>
                </Button>
              </Row>
              <Row>
                <Button large onPress={() => this.dialogDone(26)}>
                  <Text>Back Middle</Text>
                </Button>
              </Row>
              <Row>
                <Button large onPress={() => this.dialogDone(24)}>
                  <Text>Back Bottom</Text>
                </Button>
              </Row>
            </Col>
            <Col>
              <Row style={{ margin: 5 }}>
                <Text>FRONT</Text>
              </Row>
              <Row style={{ margin: 5 }}>
                <Button large onPress={() => this.dialogDone(29)}>
                  <Text>Front Top</Text>
                </Button>
              </Row>
              <Row style={{ margin: 5 }}>
                <Button large onPress={() => this.dialogDone(27)}>
                  <Text>Front Middle</Text>
                </Button>
              </Row>
              <Row style={{ margin: 5 }}>
                <Button large onPress={() => this.dialogDone(25)}>
                  <Text>Front Bottom</Text>
                </Button>
              </Row>
            </Col>
          </Grid>
        </Content>),
      showDialog: true
    });
  }

  scoreHatchShip() {
    this.setState({
      dialogContent: (
        <Content>
          <Text>Where on the SHIP was the HATCH scored?</Text>
          <Button onPress={() => this.dialogDone(23)}>
            <Text>Side</Text>
          </Button>
          <Button onPress={() => this.dialogDone(22)}>
            <Text>Front</Text>
          </Button>
        </Content>),
      showDialog: true
    });
  }

  scoreCargoRocket() {
    this.setState({
      dialogContent: (
        <Content>
          <Text>Where on the ROCKET was the CARGO scored?</Text>
          <Button onPress={() => this.dialogDone(46)}>
            <Text>Top</Text>
          </Button>
          <Button onPress={() => this.dialogDone(45)}>
            <Text>Middle</Text>
          </Button>
          <Button onPress={() => this.dialogDone(44)}>
            <Text>Bottom</Text>
          </Button>
        </Content>),
      showDialog: true
    });
  }

  scoreCargoShip() {
    this.setState({
      dialogContent: (
        <Content>
          <Text>Where on the SHIP was the CARGO scored?</Text>
          <Button onPress={() => this.dialogDone(43)}>
            <Text>Side</Text>
          </Button>
          <Button onPress={() => this.dialogDone(42)}>
            <Text>Front</Text>
          </Button>
        </Content>),
      showDialog: true
    });
  }

  dialogDone(event?: number) {
    if (event != undefined) {
      this.emitEvent(event);
    }
    this.setState({
      showDialog: false
    })
  }

  render() {
    return (
      <View>
        <View>
          <Grid>
            <Col style={styles.leftColumn}>
              <Row style={styles.row}>
                <ButtonCard title="Scored HATCH on" style={{ backgroundColor: "lightyellow" }}>
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
                <ButtonCard title="Grabbed HATCH from" style={{ backgroundColor: "lightyellow" }}>
                  <Button large style={styles.eventButton}
                    onPress={(x) => this.emitEvent(20)}>
                    <Text>Floor</Text>
                  </Button>
                  <Button large style={styles.eventButton}
                    onPress={(x) => this.emitEvent(21)}>
                    <Text>Station</Text>
                  </Button>
                </ButtonCard>
              </Row>
            </Col>
            <Col style={styles.rightColumn}>
              <Row style={styles.row}>
                <ButtonCard title="Scored CARGO on" style={{ backgroundColor: "lightblue" }}>
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
                <ButtonCard title="Grabbed CARGO from" style={{ backgroundColor: "lightblue" }}>
                  <Button large style={styles.eventButton}
                    onPress={(x) => this.emitEvent(40)}>
                    <Text>Floor</Text>
                  </Button>
                  <Button large style={styles.eventButton}
                    onPress={(x) => this.emitEvent(41)}>
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
                  onPress={(x) => this.emitEvent(2)}>
                  <Text>Dropped Hatch</Text>
                </Button>
              </Row>
              <Row style={styles.row}>
                {this.renderDisabledButton()}
              </Row>
            </Col>
            <Col style={styles.rightColumn}>
              <Row style={styles.row}>
                <Button large style={styles.eventButton}
                  onPress={(x) => this.emitEvent(3)}>
                  <Text>Dropped Cargo</Text>
                </Button>
              </Row>
              <Row style={styles.row}>
                {this.renderOTButton()}
              </Row>
            </Col>
          </Grid>
        </View>
        <View>
          <DetailModal
            show={this.state.showDialog}
            onDone={this.dialogDone.bind(this)}
            render={this.state.dialogContent}></DetailModal>
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