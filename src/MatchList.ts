import RNFS from 'react-native-fs';
import { computed, observable } from 'mobx';
import { PermissionsAndroid } from 'react-native';

async function requestFilePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'External storage permission',
        message:
          'ScoutingApp needs to access external storage' +
          'to save and read data.'
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('External storage granted');
    } else {
      console.log('External permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

export class MatchList {
  data = '';

  @observable matches = [];

  @computed get nextMatch() {
    return '3:00pm';
  }

  async loadData() {
    await requestFilePermission();
    const list = await RNFS.readDir(RNFS.ExternalCachesDirectoryPath);
    console.log(list);
    const rawData = await RNFS.readFile(RNFS.ExternalStorageDirectoryPath + '/sample_match_list.csv');
    const rows = rawData.trim().split('\n');
    const headers = rows[0].split(',');
    const data = rows.slice(1).map(r => r.split(','));
    console.log(data);
  }
}

const matchListStore = new MatchList();
export default matchListStore;