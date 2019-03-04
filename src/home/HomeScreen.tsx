import React from 'react';
import RN, { View } from 'react-native';
import { Button, Body, Content, Grid, Icon, Header, Left, Right, Row, Col, Text, Title } from 'native-base';
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
    console.log(navigation);
    return {
      header: <ScoutingAppHeader
                hideBack={true}
                navigation={navigation}
                title="Scouting App"></ScoutingAppHeader>
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Content>
        <Grid>
          <Col>
            <Row>
              <Text>Home Screen { this.stores.matchList.position}</Text>
            </Row><Row>
              <NextMatch nextMatch={this.stores.matchList.nextMatch}></NextMatch>
            </Row><Row>
              <Button
                onPress={() => navigate('Start')}
              >
                <Text>Record a match</Text>
              </Button>
            </Row><Row>
              <Button onPress={() => navigate("Settings")}>
                <Text>Settings</Text>
              </Button>
            </Row>
          </Col>
        </Grid>
      </Content>
    );
  }
}

type Props = {
  nextMatch: Match
}
class NextMatch extends React.Component<Props> {
  render() {
    if (!this.props.nextMatch) {
      return null;
    }

    const time = moment(this.props.nextMatch.time).format("D-MMM hh:mm A")
    return <Text>The next Team 488 match is Match #{this.props.nextMatch.id} at: {time}</Text>
  }
}