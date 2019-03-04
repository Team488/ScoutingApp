import React from 'react';
import { FlatList, View, ListRenderItemInfo, StyleSheet } from 'react-native';
import { Button, Content, Body, Left, List, ListItem, Icon, Grid, Row, Col, Header, Form, Picker, Right, Text, Title } from 'native-base';
import { NavigationScreenProps } from 'react-navigation';
import { ScoutingAppHeader } from '../ScoutingAppHeader';
import { connect, ConnectedComponent, Match, MatchList, Position } from '../store';
import { observer } from 'mobx-react';
import moment from 'moment';

/*
TODO:
- confirm placement and team
- allow selecting the match
*/

type Store = {
  matchList: MatchList
}

type State = {
  selected: number;
}

@connect("matchList")
@observer
export class StartScreen extends ConnectedComponent<NavigationScreenProps, Store, State> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: <ScoutingAppHeader
        navigation={navigation}
        title="Prepare to Record"></ScoutingAppHeader>
    }
  };

  constructor(props: any) {
    super(props);
    this.state = {
      selected: -1
    }
  }

  selectNextMatch() {
    const now = new Date();
    const matches = this.stores.matchList.matches;
    for (let i = 0; i < matches.length; i++) {
      if (matches[i].time > now) {
        this.setState({ selected: matches[i].id })
        return
      }
    }
  }

  componentWillMount() {
    this.selectNextMatch();
  }

  renderItem(info: ListRenderItemInfo<Match>) {
    const renderSelected = () => {
      if (info.item.id == this.state.selected) {
        return <Right>
          <Icon name="md-arrow-forward"></Icon>
        </Right>
      }
    }
    return (<ListItem selected={info.item.id == this.state.selected}
      button={true}
      onPress={(ev: any) => {
        this.setState({ selected: info.item.id })
      }}>
      <Body>
        <Text>{info.item.id}</Text>
        <Text>{moment(info.item.time).format('MMM Do h:mm a')}</Text>
      </Body>
      {renderSelected()}
    </ListItem>)
  }

  getTeam() {
    const match = this.stores.matchList.matches.filter((m) => m.id === this.state.selected)[0];
    console.log(match);
    switch (this.stores.matchList.position) {
      case Position.Red1: return match.red1
      case Position.Red2: return match.red2
      case Position.Red2: return match.red3
      case Position.Blue1: return match.blue1
      case Position.Blue2: return match.blue2
      case Position.Blue3: return match.blue3
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Content>
        <Grid>
          <Col style={styles.mainCol}>
            <Row style={styles.headerRow}>
              <Text style={styles.header}>Watch the robot in position: <Text style={styles.detail}>{this.stores.matchList.position}</Text></Text>
            </Row>
            <Row style={styles.headerRow}>
              <Text style={styles.header}>Team: <Text style={styles.detail}>{this.getTeam()}</Text></Text>
            </Row>
            <Row>
              <Button block onPress={() => this.selectNextMatch()}>
                <Text>Select Next Match</Text>
              </Button>
              <Right>
                <Button block style={{ alignSelf: "flex-end" }}
                  onPress={() => navigate('Record')}>
                  <Text>Start</Text>
                </Button>
              </Right>
            </Row>
          </Col>
        </Grid>
        <FlatList style={{ height: 500, margin: 10 }}
          data={this.stores.matchList.matches}
          renderItem={(item) => this.renderItem(item)}
          keyExtractor={item => item.id.toString()}
        >
        </FlatList>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  headerRow: {
    margin: 5
  },
  header: {
    fontSize: 27
  },
  detail: {
    fontSize: 27,
    fontWeight: "bold"
  },
  mainCol: {
    margin: 10
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
});
