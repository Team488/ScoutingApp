import React from 'react';
import {Header} from 'react-navigation';
import { View} from 'react-native';
import { Button, Content, Grid, Row, Col, Picker, Text } from 'native-base';
import { NavigationActions, NavigationScreenProps, createStackNavigator, createAppContainer } from 'react-navigation';
import { connect, ConnectedComponent, MatchList, Position } from '../store';
import { observer } from 'mobx-react';
import { ScoutingAppHeader } from '../ScoutingAppHeader';

type State = {
  data: string
}

type Store = {
  matchList: MatchList
}

@connect("matchList")
@observer
export class SettingsScreen extends ConnectedComponent<NavigationScreenProps, Store, State> {
  static navigationOptions = ({navigation}:any) => {
    return {
      header: <ScoutingAppHeader navigation={navigation} title="Settings"></ScoutingAppHeader>
    }
  }

  scanner: any;

  constructor(props: any) {
    super(props);
    this.state = {
      data: ''
    };
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Content>
        <Picker 
           mode="dropdown"
           selectedValue={this.stores.matchList.position}
           onValueChange={(v) => this.stores.matchList.updatePosition(v)}
           >
           <Picker.Item label="Red 1" value={Position.Red1}/>
           <Picker.Item label="Red 2" value={Position.Red2}/>
           <Picker.Item label="Red 3" value={Position.Red3}/>
           <Picker.Item label="Blue 1" value={Position.Blue1}/>
           <Picker.Item label="Blue 2" value={Position.Blue2}/>
           <Picker.Item label="Blue 3" value={Position.Blue3}/>
        </Picker>
      </Content>
    );
  }
}