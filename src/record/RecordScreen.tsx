import React from 'react';
import { Body, Button, Container, Header, Left, Icon, Title, Text, View } from 'native-base';
import { NavigationActions, NavigationScreenProps, createStackNavigator, createAppContainer } from 'react-navigation';
import { EventPanel } from './EventPanel';

export class RecordScreen extends React.Component<NavigationScreenProps> {

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
        <Header >
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Recording Match</Title>
          </Body>
        </Header>

      <Button
        onPress={this.save.bind(this)}>
        <Text>Save</Text>
      </Button>
      <Button
        onPress={this.cancel.bind(this)}>
        <Text>Cancel</Text>
      </Button>
      <EventPanel></EventPanel>
      </Container>
    );
  }
}
