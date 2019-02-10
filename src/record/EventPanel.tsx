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

type State = {
  showDialog: boolean,
  dialogContent: JSX.Element
}

interface Props {

}
export class EventPanel extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showDialog: false,
      dialogContent: <Text>Empty Dialog</Text>
    }
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

  scoreRocket() {
    console.log('Score rocket');
    this.setState({
      dialogContent: <Text>Which Rocket?</Text>,
      showDialog: true
    });
  }

  scoreShip() {
    console.log('Score ship');
    this.setState({
      dialogContent: <Text>Which Ship?</Text>,
      showDialog: true
    });
  }

  dialogDone() {
    this.setState({
      showDialog: false
    })
  }

  render() {
    return (
      <Content>
        <Content>
          <Grid>
            <Col style={styles.leftColumn}>
              <Row style={styles.row}>
                <ButtonCard title="Scored HATCH on" style={{ backgroundColor: "lightyellow" }}>
                  <Button large style={styles.eventButton}
                    onPress={(x) => this.scoreRocket()}>
                    <Text>Rocket</Text>
                  </Button>
                  <Button large style={styles.eventButton}
                    onPress={(x) => this.scoreShip()}>
                    <Text>Ship</Text>
                  </Button>
                </ButtonCard>
              </Row>
              <Row style={styles.row}>
                <ButtonCard title="Grabbed HATCH from" style={{ backgroundColor: "lightyellow" }}>
                  <Button large style={styles.eventButton}
                    onPress={(x) => this.scoreRocket()}>
                    <Text>Floor</Text>
                  </Button>
                  <Button large style={styles.eventButton}
                    onPress={(x) => this.scoreShip()}>
                    <Text>Station</Text>
                  </Button>
                </ButtonCard>
              </Row>
            </Col>
            <Col style={styles.rightColumn}>
              <Row style={styles.row}>
                <ButtonCard title="Scored CARGO on" style={{ backgroundColor: "lightblue" }}>
                  <Button large style={styles.eventButton}
                    onPress={(x) => this.scoreRocket()}>
                    <Text>Rocket</Text>
                  </Button>
                  <Button large style={styles.eventButton}
                    onPress={(x) => this.scoreShip()}>
                    <Text>Ship</Text>
                  </Button>
                </ButtonCard>
              </Row>
              <Row style={styles.row}>
                <ButtonCard title="Grabbed CARGO from" style={{ backgroundColor: "lightblue" }}>
                  <Button large style={styles.eventButton}
                    onPress={(x) => this.scoreRocket()}>
                    <Text>Floor</Text>
                  </Button>
                  <Button large style={styles.eventButton}
                    onPress={(x) => this.scoreShip()}>
                    <Text>Station</Text>
                  </Button>
                </ButtonCard>
              </Row>
            </Col>
          </Grid>
        </Content>
        <Content>
          <Grid>
            <Col style={styles.leftColumn}>
              <Row style={styles.row}>
                <Button large style={styles.eventButton}
                  onPress={(x) => this.scoreRocket()}>
                  <Text>Dropped Hatch</Text>
                </Button>
              </Row>
              <Row style={styles.row}>
                <Button large style={styles.eventButton}
                  onPress={(x) => this.scoreRocket()}>
                  <Text>Disabled</Text>
                </Button>
              </Row>
            </Col>
            <Col style={styles.rightColumn}>
              <Row style={styles.row}>
                <Button large style={styles.eventButton}
                  onPress={(x) => this.scoreShip()}>
                  <Text>Dropped Cargo</Text>
                </Button>
              </Row>
              <Row style={styles.row}>
                <Button large style={styles.eventButton}
                  onPress={(x) => this.scoreShip()}>
                  <Text>Entered OT</Text>
                </Button>
              </Row>
            </Col>
          </Grid>
        </Content>
        <Content>
          {this.renderEvents()}
          <DetailModal
            show={this.state.showDialog}
            onDone={this.dialogDone.bind(this)}
            render={this.state.dialogContent}></DetailModal>
        </Content>
      </Content>
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