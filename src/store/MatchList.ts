import RNFS from 'react-native-fs';
import { action, computed, observable } from 'mobx';
import { AsyncStorage } from 'react-native';

export enum Position {
  Unset = "None",
  Red1 = "Red 1",
  Red2 = "Red 2",
  Red3 = "Red 3",
  Blue1 = "Blue 1",
  Blue2 = "Blue 2",
  Blue3 = "Blue 3",
}

export class MatchList {
  data = '';

  // Which position this tablet is recording data for
  @observable position = Position.Unset;

  @observable matches = [];
  @observable matchTime = '3:00pm'

  @computed get nextMatch() {
    return this.matchTime;
  }

  @action updatePosition(newPos: Position) {
    this.position = newPos;
    AsyncStorage.setItem('position', newPos);
  }

  @computed get positionColor() {
    if( this.position.includes('Red')) {
      return "red";
    } else {
      return "blue";
    }
  }

  @action update() {
    this.matchTime = `${Math.floor(Math.random()*10)}:00pm`;
    console.log('Setting new time: ', this.matchTime);
  }

  async loadData() {
    const list = await RNFS.readDir(RNFS.ExternalCachesDirectoryPath);
    console.log(list);
    const rawData = await RNFS.readFile(RNFS.ExternalStorageDirectoryPath + '/sample_match_list.csv');
    const rows = rawData.trim().split('\n');
    const headers = rows[0].split(',');
    const data = rows.slice(1).map(r => r.split(','));
    console.log(data);

    const oldPos = await AsyncStorage.getItem('position');
    this.position = (oldPos) ? (oldPos as Position) : Position.Red1;
  }
}