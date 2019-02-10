import React from 'react';
import { StyleSheet } from 'react-native';
import { Body, Button, Container, Content, Header, Left, Icon, Right, Title, Text, View } from 'native-base';
import { NavigationActions, NavigationScreenProps, createStackNavigator, createAppContainer } from 'react-navigation';
import { EventPanel } from './EventPanel';

type State = {
  events: number[]
}
export class RecordScreen extends React.Component<NavigationScreenProps, State> {
  constructor(props: NavigationScreenProps) {
    super(props);
    this.state = {
      events: []
    }
  }

  static navigationOptions = ({navigation}:any) => ({
    header:
        <Header >
          <Left>
            <Button transparent
              onPress={() => navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Recording Match</Title>
          </Body>
          <Right>
            <Button onPress={() => navigation.state.params.handleSave()}>
            <Text>Finish</Text></Button>
          </Right>
        </Header>
  })

  componentDidMount() {
    this.props.navigation.setParams({ handleSave: this.save.bind(this)});
  }

  save() {
    this.props.navigation.replace('Review');
  }

  // Drop any in-progress recording and go back to start.
  cancel() {
    this.props.navigation.pop();
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <View style={styles.statusBar}>
          <Text>Score</Text>
          <Text>Time</Text>
          <Text>State</Text>
        </View>
        <EventPanel></EventPanel>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
});
