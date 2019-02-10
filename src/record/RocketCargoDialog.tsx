import React, { Component, ReactPropTypes } from "react";
import { Text, TouchableOpacity, View, GestureResponderEvent } from "react-native";
import { NavigationActions, NavigationScreenProps, createStackNavigator, createAppContainer } from 'react-navigation';
import Modal from "react-native-modal";

type Props = {
  show: boolean,
  onDone: (event: GestureResponderEvent) => void,
  render: JSX.Element
}
export class RocketCargoDialog extends Component<NavigationScreenProps> {
  state = {
    isModalVisible: true,
    hardClose: false
  };

  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  componentWillReceiveProps() {
    this.setState({hardClose: false});
  }

  render() {
    return (
          <View style={{ backgroundColor: 'white', flex: 1 }}>
            <TouchableOpacity onPress={(event) => {
              }}>
              <Text>Close!</Text>
            </TouchableOpacity>
          </View>
    );
  }
}
