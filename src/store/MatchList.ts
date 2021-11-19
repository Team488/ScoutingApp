import RNFS from 'react-native-fs';
import { action, computed, observable, runInAction } from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';
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

  @observable matches: Map<number, Match> = new Map();
  @observable matchTime = '3:00pm'

  isXbotMatch(match: Match): boolean {
    return match.red1 == 488 ||
      match.red2 == 488 ||
      match.red3 == 488 ||
      match.blue1 == 488 ||
      match.blue2 == 488 ||
      match.blue3 == 488;
  }

  @computed get nextMatch() {
    const now = new Date();

    for (let [i, match] of this.matches) {
      if (match.time > now && this.isXbotMatch(match)) {
        return match;
      }
    }
  }

  @action updatePosition(newPos: Position) {
    this.position = newPos;
    AsyncStorage.setItem('position', newPos);
  }

  @computed get positionColor() {
    if (this.position.includes('Red')) {
      return "red";
    } else {
      return "blue";
    }
  }

  @action
  async loadData() {
    const rawData = await RNFS.readFile(RNFS.ExternalStorageDirectoryPath + '/match_list.csv');
    const rows = rawData.trim().split('\n');
    const headers = rows[0].split(',');

    const matches = rows.slice(1).map((r) => {
      const item = r.split(',')
      return [parseInt(item[0]), {
        id: parseInt(item[0]),
        time: moment(`${item[1]} ${item[2]}`, "D-MMM hh:mm a").toDate(),
        red1: parseInt(item[3]),
        red2: parseInt(item[4]),
        red3: parseInt(item[5]),
        blue1: parseInt(item[6]),
        blue2: parseInt(item[7]),
        blue3: parseInt(item[8]),
      }] as [number, Match]
    }).sort((a,b) => a[1].time.getTime() - b[1].time.getTime());

    // runInAction will update any observers that depend on this data
    runInAction(() => {
      this.matches = new Map([...matches]);
    });

    const oldPos = await AsyncStorage.getItem('position');
    this.position = (oldPos) ? (oldPos as Position) : Position.Red1;
  }
}