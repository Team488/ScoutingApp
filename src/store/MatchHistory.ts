import RNFS from 'react-native-fs';
import { action, computed, observable, runInAction } from 'mobx';
import { AsyncStorage } from 'react-native';
import { Match } from './MatchList';
import moment from 'moment';

export interface History {
  id: number,
  time: number,
  team: number,
  data: string
}

export class MatchHistory {
  // Map of matches keyed on timestamp
  @observable.shallow history: Map<number, History> = new Map();

  @action
  saveMatch(match: History) {
    this.history.set(match.id, match);
    let data = {} as { [index: number]: History };
    data[match.id] = match;
    console.log("Saving data ", data);
    AsyncStorage.mergeItem('matches', JSON.stringify(data));
  }

  @action
  async loadMatchHistory() {
    const historyJSON = await AsyncStorage.getItem('matches');
    if (historyJSON) {
      const history = Object.values(JSON.parse(historyJSON)).map((v: History) => [v.id, v]) as [number, History][];
      runInAction(() => {
        history.forEach((v) => this.history.set(v[0], v[1]))
      })
    }
  }

  @action
  clearHistory() {
    this.history.clear();
    AsyncStorage.removeItem('matches')
  }
}