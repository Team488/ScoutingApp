import React from 'react';
import RN, { StyleProp, StyleSheet, View, AsyncStorage } from 'react-native';
import { Button, Body, Content, Grid, Icon, H2,  Header, Left, Right, Row, Col, Text, Title } from 'native-base';
import { NavigationActions, NavigationScreenProps, createStackNavigator, createAppContainer } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import { connect, ConnectedComponent, MatchList, Match } from '../store';
import { ScoutingAppHeader } from '../ScoutingAppHeader';
import moment from 'moment';

interface Stores {
  matchList: MatchList;
}

@connect("matchList")
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

  render() {
    const { navigate } = this.props.navigation;
    AsyncStorage.getItem('matches', (err, result) => {console.log("Matches: ", result)});
    return (
      <Content>
        <View style={styles.panel}>
          <NextMatch style={styles.nextMatch}
            nextMatch={this.stores.matchList.nextMatch}></NextMatch>
          <Button 
            large bordered
            style={styles.matchButton}
            onPress={() => navigate('Start')}
          >
            <Text>Record a match</Text>
          </Button>
          <Button 
            large bordered
            style={styles.settingsButton}
            onPress={() => navigate("Settings")}>
            <Text>Settings</Text>
          </Button>
        </View>
      </Content>
    );
  }
}

type Props = {
  nextMatch: Match
  style: StyleProp 
}
class NextMatch extends React.Component<Props> {
  render() {
    if (!this.props.nextMatch) {
      return <H2 style={this.props.style}>Match data not loaded</H2>;
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
  nextMatch: {
   marginTop: 30,
   alignSelf: "center"
  },
  matchButton: {
    marginTop: 50,
   alignSelf: "center"
  },
  settingsButton: {
    marginTop: 50,
   alignSelf: "center"
  }
})