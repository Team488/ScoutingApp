import React, { Component } from 'react';
import { Dimensions, Text, View, StyleSheet, Switch, TextInput } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Container, Header, Content, Form, Item, Input, Label, Picker } from 'native-base';
import { AppRegistry, Image } from 'react-native';

enum FieldType {
  Number,
  Bool,
  String,
  Choose
}

interface Field {
  id: string;
  name: string;
  description?: string;
  type: FieldType;
  options?: string[]
}

const fields: Field[] = [
  {
    id: "cargo",
    name: "Cargo scored",
    type: FieldType.Number
  },
  {
    id: "hatches",
    name: "Hatches scored",
    type: FieldType.Number
  },
  {
    id: "defense",
    name: "Played defense",
    description: "Entered other alliance's territory for reasonable amount of time",
    type: FieldType.Bool
  },
  {
    id: "level",
    name: "Level climbed",
    description: "Level the robot climbed to at the end of the match.",
    type: FieldType.Choose,
    options: ['Level 1', 'Level 2', 'Level 3'],
  },
  {
    id: "disabled",
    name: "Disabled",
    description: "Includes debilitating connectivity issues, robot tipping, etc",
    type: FieldType.Bool
  },
  {
    id: "notes",
    name: "Additional notes",
    description: "Additional free-form notes",
    type: FieldType.String
  }
];

interface State {
  cargo?: number;
  hatches?: number;
  defense?: boolean;
  disabled?: boolean;
  notes?: string;
}

export interface Props {
  name?: string
  enthusiasmLevel?: number
}

export default class Bananas extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cargo: 0,
      hatches: 0,
      defense: false,
      disabled: false,
      notes: ''
    }
  }

  private renderField(field: Field) {
    switch (field.type) {
      case FieldType.Bool: {
        return (
          <Item inlineLabel
            key={field.id}
            style={{ flex: 1, justifyContent: "space-between" }}
          >
            <Label>{field.name}</Label>
            <Switch
              value={this.state[field.id]}
              onValueChange={(x) => {
                this.setState({ [field.id]: x })
                return x;
              }
              }
            ></Switch>
          </Item>
        );
      }
      case FieldType.Number: {
        return (
          <Item floatingLabel key={field.id}>
            <Label>{field.name}</Label>
            <Input
              onChangeText={(x) => this.setState({ [field.id]: x })}
              keyboardType='number-pad' />
          </Item>
        );
      }
      case FieldType.String: {
        return (
          <Item inlineLabel key={field.id}>
            <Label>{field.name}</Label>
            <TextInput
              onChangeText={(x) => this.setState({ [field.id]: x })}
            ></TextInput>
          </Item>
        );
      }
      case FieldType.Choose: {
        return (
          <Item inlineLabel key={field.id}>
            <Label>{field.name}</Label>
            <TextInput
              onChangeText={(x) => this.setState({ [field.id]: x })}
            ></TextInput>
            <Picker
              mode="dropdown"
              placeholder="Pick one"
              selectedValue={this.state[field.id]}
              onValueChange={(x) => this.setState({ [field.id]: x })}
            >
              <Picker.Item label="" value={-1}></Picker.Item>
              {field.options!.map((val, idx) => <Picker.Item label={val} value={idx}></Picker.Item>)}
            </Picker>
          </Item>
        );
      }
    }
  }
  render() {
    return (
      <Content>
        <Form>
          {fields.map(this.renderField.bind(this))}
        </Form>
        <View style={{ margin: 20 }}>
          <QRCode
            size={this.getQRWidth()}
            value={JSON.stringify(this.state)} />
        </View>
        <Text>{JSON.stringify(this.state)}
          {JSON.stringify(Dimensions.get('window'))}</Text>
      </Content>
    );
  }

  private getQRWidth() {
    return Dimensions.get('window')['width'] * 0.8
  }

}

const styles = StyleSheet.create({
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  field: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});