import React, { Component } from "react";
import { View } from "react-native";
import { Button, Content, Picker, Text } from 'native-base';
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
    position: EventCode.START_3
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
              <Text style={{ margin: 20 }}>When the match starts, watch Team {this.props.team}!</Text>
              <Text style={{ margin: 20 }}>Before we start, how many power cells are preloaded?</Text>
              <Picker
                style={{ margin: 20 }}
                mode="dropdown"
                selectedValue={this.state.position}
                onValueChange={(v) => {
                  console.log("Set num power cells ", v)
                  this.setState({ position: v })
                }}
              >
                <Picker.Item label="0 Power Cells" value={EventCode.START_0} />
                <Picker.Item label="1 Power Cell" value={EventCode.START_1} />
                <Picker.Item label="2 Power Cells" value={EventCode.START_2} />
                <Picker.Item label="3 Power Cells" value={EventCode.START_3} />
              </Picker>
              <Button
                style={{ alignSelf: "center" }}
                large
                onPress={(event) => {
                  this.setState({ hardClose: true });
                  this.props.onDone(this.state.position);
                }}>
                <Text>Ok, let's go!</Text>
              </Button>
            </View>
          </Content>
        </Modal>
      </View>
    );
  }
}
