import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import RN, { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Button, Body, Content, Grid, Icon, H2,  Header, Left, Right, Row, Col, Text, Title } from 'native-base';
import { NavigationScreenProps } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import { connect, ConnectedComponent, MatchList, MatchHistory, Match } from '../store';
import { ScoutingAppHeader } from '../ScoutingAppHeader';
import { ReviewMatchList } from './ReviewMatchList';
import moment from 'moment';

interface Stores {
  matchList: MatchList;
  matchHistory: MatchHistory;
}

@connect("matchList", "matchHistory")
@observer
export class HomeScreen extends ConnectedComponent<NavigationScreenProps, Stores> {
  static navigationOptions = ({navigation}:any) => {
    return {
      header: <ScoutingAppHeader
                hideBack={true}
                navigation={navigation}
                title="Scouting App"></ScoutingAppHeader>
    }
  }

  renderNextMatch() {
    if(this.stores.matchList.matches.size == 0) {
      return <H2 style={styles.nextMatch}>Match data not loaded</H2>;
    } else {
      return <NextMatch style={styles.nextMatch}
        nextMatch={this.stores.matchList.nextMatch}></NextMatch>

    }
  }

  render() {
    const { navigate } = this.props.navigation;
    AsyncStorage.getItem('matches', (err, result) => {console.log("Matches: ", result)});
    return (
      <Content>
        <View style={styles.panel}>
          <H2 style={styles.nextMatch}>Infinite Recharg 2020</H2>
          {this.renderNextMatch()}
          <Button 
            large bordered
            style={styles.matchButton}
            onPress={() => navigate('Start')}>
            <Text>Record a match</Text>
          </Button>
          <Button 
            large bordered
            style={styles.matchButton}
            onPress={() => navigate('StartUnlisted')}>
            <Text>Record unlisted match</Text>
          </Button>
          <Button 
            large bordered
            style={styles.settingsButton}
            onPress={() => navigate("Settings")}>
            <Text>Settings</Text>
          </Button>
          <ReviewMatchList 
            selectedMatch={(match) => {
              console.log('Navigating to match', match);
              navigate("ViewMatch", {match}); }}
            style={styles.reviewList}
            history={[...this.stores.matchHistory.history].map((v) => v[1])}></ReviewMatchList>
        </View>
      </Content>
    );
  }
}

type Props = {
  nextMatch?: Match;
  style: StyleProp<ViewStyle>;
}
class NextMatch extends React.Component<Props> {
  render() {
    if (!this.props.nextMatch) {
      return <H2 style={this.props.style}>No Team 488 matches on the schedule</H2>;
    }

    const time = moment(this.props.nextMatch.time).format("D-MMM hh:mm A")
    return <View style={this.props.style}><H2 style={this.props.style}>Next Team 488 match is Match #{this.props.nextMatch.id}</H2>
    <H2>{time}</H2>
    </View>
    
  }
}

const styles = StyleSheet.create({
  panel: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  reviewList: {
   marginTop: 30,
   margin: 10,
  },
  nextMatch: {
   marginTop: 30,
   alignSelf: "center"
  },
  matchButton: {
    marginTop: 40,
   alignSelf: "center"
  },
  settingsButton: {
    marginTop: 40,
   alignSelf: "center"
  }
})