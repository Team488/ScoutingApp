import React from 'react';
import {Header} from 'react-navigation';
import { View, AsyncStorage} from 'react-native';
import { Button, Content, Grid, Row, Col, Picker, Text } from 'native-base';
import { NavigationActions, NavigationScreenProps, createStackNavigator, createAppContainer } from 'react-navigation';
import { connect, ConnectedComponent, MatchList, Position } from '../store';
import { observer } from 'mobx-react';
import { ScoutingAppHeader } from '../ScoutingAppHeader';
import RNFS from 'react-native-fs'

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

  async saveMatchData() {
    const matches = await AsyncStorage.getItem('matches'); 
    console.log("Saving all match data: ", matches);
    await RNFS.writeFile(RNFS.ExternalStorageDirectoryPath + '/match_data.txt', JSON.stringify(matches));
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Content>
        <Text>Select which position this tablet should monitor.</Text>
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
        <Text>Push the match list to the device with 'adb push match_list.csv /sdcard/match_list.csv'.</Text>
        <Button onPress={() => this.stores.matchList.loadData()}><Text>Load Match List</Text></Button>      

        <Text>Save all match data to a text file.</Text>
        <Text>You can grab it with 'adb pull /sdcard/match_data.txt'</Text>
        <Button onPress={() => this.saveMatchData()}><Text>Save Match Data</Text></Button>      
      </Content>
    );
  }
}