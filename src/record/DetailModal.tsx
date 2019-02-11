import React, { Component, ReactPropTypes } from "react";
import { View, GestureResponderEvent } from "react-native";
import { Button, Text } from 'native-base';
import Modal from "react-native-modal";

type Props = {
  show: boolean,
  onDone: Function,
  render: JSX.Element
}
export default class ModalTester extends Component<Props> {
  state = {
    isModalVisible: false,
    hardClose: false
  };

  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  componentWillReceiveProps() {
    this.setState({hardClose: false});
  }

  componentWillUnmount() {
    this.setState({hardClose: true});
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white'}}>
        <Modal style = {{ margin: 60 }}
            isVisible={!this.state.hardClose && this.props.show}
            useNativeDriver={true}
            deviceWidth={600}
            deviceHeight={1024}
            onBackButtonPress={() => this.props.onDone()}
            onBackdropPress={() => this.props.onDone()}
            >
          <View style={{ backgroundColor: 'white', flex: 1 }}>
            {this.props.render}
            <Button onPress={(event) => {
              this.setState({hardClose: true});
              this.props.onDone();
              }}>
              <Text>Cancel</Text>
            </Button>
          </View>
        </Modal>
      </View>
    );
  }
}
