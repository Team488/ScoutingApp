import RNFS from 'react-native-fs';
import { action, computed, observable } from 'mobx';
import { AsyncStorage } from 'react-native';
import moment from 'moment';

export enum Position {
  Unset = "None",
  Red1 = "Red 1",
  Red2 = "Red 2",
  Red3 = "Red 3",
  Blue1 = "Blue 1",
  Blue2 = "Blue 2",
  Blue3 = "Blue 3",
}

export interface Match {
  id: number;
  time: Date;
  red1: number;
  red2: number;
  red3: number;
  blue1: number;
  blue2: number;
  blue3: number;
}

export class MatchList {
  data = '';

  // Which position this tablet is recording data for
  @observable position = Position.Unset;

  @observable matches: Match[] = [];
  @observable matchTime = '3:00pm'

  isXbotMatch(match: Match): boolean {
    return match.red1 == 488 ||
      match.red2 == 488  ||
      match.red3 == 488  ||
      match.blue1 == 488  ||
      match.blue2 == 488  ||
      match.blue3 == 488;
  }

  @computed get nextMatch() {
    const now = new Date();
    for(let i = 0; i < this.matches.length; i++) {
      if(this.matches[i].time > now && this.isXbotMatch(this.matches[i])) {
        return this.matches[i];
      }
    }
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

  async loadData() {
    const list = await RNFS.readDir(RNFS.ExternalCachesDirectoryPath);
    console.log(list);
    const rawData = await RNFS.readFile(RNFS.ExternalStorageDirectoryPath + '/sample_match_list.csv');
    const rows = rawData.trim().split('\n');
    const headers = rows[0].split(',');
    this.matches = rows.slice(1).map(r => {
      const item = r.split(',')

      return {
        id: parseInt(item[0]),
        time: moment(`${item[1]} ${item[2]}`, "D-MMM hh:mm a").toDate(),
        red1:  parseInt(item[3]),
        red2:  parseInt(item[4]),
        red3:  parseInt(item[5]),
        blue1:  parseInt(item[6]),
        blue2:  parseInt(item[7]),
        blue3:  parseInt(item[8]),
      }
    });

    const oldPos = await AsyncStorage.getItem('position');
    this.position = (oldPos) ? (oldPos as Position) : Position.Red1;
  }
}