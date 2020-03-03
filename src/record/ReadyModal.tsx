import React, { Component, ReactPropTypes } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Button, Content, Row, Text, Col } from 'native-base';
import Modal from "react-native-modal";
import { EventCode } from "./Events";

type Props = {
  show: boolean,
  team: string,
  onDone: Function,
}
export class ReadyModal extends Component<Props> {
  state = {
    isModalVisible: false,
    hardClose: false,
    balls: EventCode.START_3
  };

  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  componentWillReceiveProps() {
    this.setState({ hardClose: false });
  }

  componentWillUnmount() {
    this.setState({ hardClose: true });
  }

  radioButton(index: string, code: EventCode) {
    return (
      <View>
        {this.state.balls == code ?
          <View
            style={styles.buttonSelected} >
            <Image source={require('../../img/ball.png')} style={{ width: 50, height: 50 }} />
            <Text style={styles.buttonText}>{index}</Text>
          </View>
          :
          <TouchableOpacity
            onPress={(x) => this.setState({ balls: code })}
            style={styles.squareButton} >
            <Image source={require('../../img/ball.png')} style={{ width: 50, height: 50 }} />
            <Text style={styles.buttonText}>{index}</Text>
          </TouchableOpacity>

        }
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Modal style={{ margin: 60, marginTop: 500 }}
          isVisible={!this.state.hardClose && this.props.show}
          useNativeDriver={true}
          deviceWidth={600}
          deviceHeight={1024}
          onBackButtonPress={() => this.props.onDone()}
          onBackdropPress={() => this.props.onDone()}
        >
          <Content style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={{ margin: 20 }}>
              <Row style={styles.row}>
                <Col style={styles.leftColumn}>
                { this.radioButton("3", EventCode.START_3) }
                { this.radioButton("2", EventCode.START_2) }
                { this.radioButton("1", EventCode.START_1) }
                { this.radioButton("0", EventCode.START_0) }
                </Col>
                <Col style={styles.rightColumn}>
                  <Text style={{ margin: 20 }}>When the match starts, watch Team {this.props.team}!</Text>
                  <Text style={{ margin: 20 }}>Before we start, how many power cells are preloaded?</Text>
                  <Button
                    style={{ alignSelf: "center" }}
                    large
                    onPress={(event) => {
                      this.setState({ hardClose: true });
                      this.props.onDone(this.state.balls);
                    }}>
                    <Text>Ok, let's go!</Text>
                  </Button>
                </Col>
              </Row>
            </View>
          </Content>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-around',
    margin: 5
  },
  leftColumn: {
    justifyContent: 'space-around',
    marginHorizontal: 5,
    alignContent: 'center',
    width: 75
  },
  rightColumn: {
    marginHorizontal: 5,
    alignContent: 'center',
  },
  squareButton: {
    borderRadius: 8,
    borderWidth: 0,
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
    color: 'black',
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  buttonSelected: {
    borderRadius: 8,
    borderWidth: 4,
    borderColor: 'black',
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 60,
    width: 60
  }
})