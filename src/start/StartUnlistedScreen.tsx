import React, { Ref } from 'react';
import { FlatList, View, Alert, ListRenderItemInfo, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { Button, Content, Body, H1, H2, Left, List, ListItem, Icon, Grid, Row, Col, Input, Item, Label, Header, Form, Picker, Right, Text, Title } from 'native-base';
import { NavigationActions, NavigationScreenProps, createStackNavigator, createAppContainer } from 'react-navigation';
import { ScoutingAppHeader } from '../ScoutingAppHeader';
import { inject, observer } from 'mobx-react';
import { connect, ConnectedComponent, MatchList, MatchHistory, Match } from '../store';

type State = {
  id: string;
  team: string;
}

interface Stores {
  matchList: MatchList;
  matchHistory: MatchHistory;
}

@connect("matchList", "matchHistory")
@observer
export class StartUnlistedScreen extends ConnectedComponent<NavigationScreenProps, Stores, State> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: <ScoutingAppHeader
        navigation={navigation}
        title="Scouting App"></ScoutingAppHeader>
    }
  }

  constructor(props: any) {
    super(props);
    this.state = {
      id: "",
      team: "",
    }
  }

  startMatch() {
    const allRecorded = [...this.stores.matchHistory.history.values()].map((h) => h.id);
    const allScheduled = [...this.stores.matchList.matches.values()].map((m) => m.id);
    const { navigate } = this.props.navigation;

    const match = parseInt(this.state.id);
    const team = parseInt(this.state.team);
    if (allRecorded.indexOf(match) > -1 || allScheduled.indexOf(match) > -1) {
      Alert.alert(
        'Are you sure?',
        `The match ${match} is already recorded or on the schedule!`,
        [
          { text: 'Cancel', style: 'cancel', },
          { text: 'OK', onPress: () => navigate('Record', { match, team }) },
        ],
        { cancelable: false },
      );
    } else {
      navigate('Record', { match, team });
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const allRecorded = [...this.stores.matchHistory.history.values()].map((h) => h.id);
    const maxRecorded = Math.max(...allRecorded);
    const allScheduled = [...this.stores.matchList.matches.values()].map((m) => m.id);
    const maxScheduled = Math.max(...allScheduled);

    let suggestedID = 0;
    if (maxRecorded > maxScheduled) {
      suggestedID = maxRecorded + 1;
    } else {
      suggestedID = maxScheduled + 100 - (maxScheduled % 100);
    }
    console.log("Suggested", suggestedID);

    return <View>
      <H1>Record unlisted match</H1>
      <H2>Only use this to record matches not on the schedule</H2>
      <H2>Next free match ID: {suggestedID}</H2>
      <Form>
        <Item floatingLabel last>
          <Label>Match ID</Label>
          <Input keyboardType="numeric"
            onChangeText={(id) => this.setState({ id })}
          />
        </Item>
        <Item floatingLabel last>
          <Label>Team</Label>
          <Input keyboardType="numeric"
            onChangeText={(team) => this.setState({ team })}
          />
        </Item>
      </Form>

      <Button disabled={!this.state.team} large block style={{ alignSelf: "flex-end" }}
        onPress={() => this.startMatch()}>
        <Text>Ready</Text>
      </Button>
    </View>
  }
}