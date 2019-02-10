import React, { Component, ReactPropTypes } from "react";
import { Text, TouchableOpacity, View, GestureResponderEvent } from "react-native";
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
        <TouchableOpacity onPress={this._toggleModal}>
          <Text>Show Modal</Text>
        </TouchableOpacity>
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
            <TouchableOpacity onPress={(event) => {
              this.setState({hardClose: true});
              this.props.onDone(event);
              }}>
              <Text>Close!</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}
