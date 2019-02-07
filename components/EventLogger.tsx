import React, {Component} from 'react';
import QRCode from 'react-native-qrcode-svg';
import {StyleSheet, Vibration, View} from 'react-native';
import {ActionSheet, Button, Body, Left, Card, CardItem, Col,
   Container, Content, Grid, Header, List, ListItem, 
   Row, Icon, Title, Text} from 'native-base';
import {AppRegistry, Image} from 'react-native';
import Timer from './Timer';

type Event = "got_hatch" 
  | "got_cargo"
  | "scored_hatch"
  | "scored_cargo"
  | "disabled"
  | "restored"
  | "enter_et"
  | "leave_et"
  | "blocked"
  | "lifted_self"
  | "lifted_team";

interface State {
}

interface Props {

}

const BUTTONS = [
  "Level 1",
  "Level 2",
  "Level 3"
]

export default class EventLogger extends Component<Props, State> {
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

  render() {
    return (
      <Container>
        <Header >
        <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
        </Header>
        <Content>
        <Grid>
          <Col style={styles.leftColumn}>
            <Row style={styles.row}>
              <Button large style={styles.eventButton} 
                  onPress={(x) => this.addEvent('got_hatch')}>
                <Text> Got Hatch</Text>
              </Button>
            </Row>
            <Row style={styles.row}>
              <Button large style={styles.eventButton} 
                  onPress={(x) => this.addEvent('got_cargo')}>
                <Text> Got Cargo</Text>
              </Button>
            </Row>
            <Row style={styles.row}>
              <Button large style={styles.eventButton} 
                  onPress={(x) => this.addEvent('scored_hatch')}>
                <Text> Scored Hatch</Text>
              </Button>
            </Row>
            <Row style={styles.row}>
              <Button large style={styles.eventButton} 
                  onPress={(x) => this.addEvent('scored_cargo')}>
                <Text> Scored Cargo</Text>
              </Button>
            </Row>
            <Row style={styles.row}>
              <Button large style={styles.eventButton} 
                  onPress={(x) => this.addEvent('disabled')}>
                <Text> Disabled </Text>
              </Button>
            </Row>
          </Col>
          <Col style={styles.rightColumn}>
            <Row style={styles.row}>
              <Button large style={styles.eventButton} 
                  onPress={(x) => this.addEvent('enter_et')}>
                <Text>Entered Enemy Territory</Text>
              </Button>
            </Row>
            <Row style={styles.row}>
              <Button large style={styles.eventButton} 
                  onPress={(x) => this.addEvent('blocked')}>
                <Text>Blocked Scoring</Text>
              </Button>
            </Row>
            <Row>
              <Button large style={styles.eventButton} 
                  onPress={(x) => this.addEvent('lifted_self')}>
                <Text> Lifted Self </Text>
              </Button>
            </Row>
            <Row style={styles.row}>
              <Button large style={styles.eventButton} 
                  onPress={(x) => this.addEvent('lifted_team')}>
                <Text>Lifted Teammate</Text>
              </Button>
            </Row>
            <Row style={{height: 75}}></Row>
          </Col>
        </Grid>
         {this.renderEvents()} 
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  eventButton: {
    margin: 5
  },
  row: {
    alignContent: 'center',
    justifyContent: 'space-between'
  },
  leftColumn: {
    marginHorizontal: 5,
    backgroundColor: 'lightgreen'
  },
  rightColumn: {
    marginHorizontal: 5,
    alignItems: 'flex-end',
    backgroundColor: 'yellow'
  }
})