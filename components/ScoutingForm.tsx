import React, {Component} from 'react';
import {Text, View, StyleSheet, Switch, TextInput} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {AppRegistry, Image} from 'react-native';

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
    switch(field.type) {
      case FieldType.Bool: {
        return (
          <View style={styles.fieldContainer}>
            <Text>{field.name}</Text>
            <Text>{field.description}</Text>
            <Switch
              value={this.state[field.id]}
              onValueChange={(x) => {
                this.setState({[field.id]: x})
                return x;
              }
              }
            ></Switch>
          </View>
        );
      }
      case FieldType.Number: {
        return (
          <View style={styles.fieldContainer}>
            <Text>{field.name}</Text>
            <Text>{field.description}</Text>
            <TextInput 
              onChangeText={(x) => this.setState({[field.id]: x})}
              keyboardType='number-pad'></TextInput>
          </View>
        );
      }
      case FieldType.String: {
        return (
          <View style={styles.fieldContainer}>
            <Text>{field.name}</Text>
            <Text>{field.description}</Text>
            <TextInput 
              onChangeText={(x) => this.setState({[field.id]: x})}
              ></TextInput>
          </View>
        );
      }
    }
  }
  render() {
    return (
      <View>
        {fields.map(this.renderField.bind(this))}
        <Text>{JSON.stringify(this.state)}</Text>
        <QRCode
          value={JSON.stringify(this.state)}/>
      </View>
    );
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