import React from 'react';
import {Header} from 'react-navigation';
import { View, Alert} from 'react-native';
import { Button, Content, Grid, Row, Col, Picker, Text } from 'native-base';
import { NavigationActions, NavigationScreenProps, createStackNavigator, createAppContainer } from 'react-navigation';
import { connect, ConnectedComponent, MatchHistory, MatchList, Position } from '../store';
import { observer } from 'mobx-react';
import { ScoutingAppHeader } from '../ScoutingAppHeader';
import RNFS from 'react-native-fs'

type State = {
  data: string
}

type Store = {
  matchList: MatchList
  matchHistory: MatchHistory
}

@connect("matchList", "matchHistory")
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
    const matches = JSON.parse(await AsyncStorage.getItem('matches'));
    const contents = Object.values(matches).map((m) => m.data).join('\n') + '\n';
    const posName = this.stores.matchList.position.toLowerCase().replace(' ','_');
    const filename = `match_data_${posName}.txt`;
    await RNFS.writeFile(`${RNFS.ExternalStorageDirectoryPath}/${filename}`, contents);
  }

  clearMatchData() {
    Alert.alert(
      'Are you sure?',
      'Really delete all the saved match data? This can\'t be undone!',
      [
        { text: 'Cancel', style: 'cancel', },
        {text: 'OK', onPress: () => this.stores.matchHistory.clearHistory()},
      ],
      {cancelable: false},
    );
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

        <Text>Save all match data to a text file. The filename includes the position.</Text>
        <Text>You can grab it with 'adb pull /sdcard/match_data_red_1.txt'</Text>
        <Button onPress={() => this.saveMatchData()}><Text>Save Match Data</Text></Button>      
        <Button onPress={() => this.clearMatchData()}><Text>Clear Match Data</Text></Button>      
      </Content>
    );
  }
}