import React from 'react';
import { Button, Text, View} from 'react-native';
import { NavigationActions, NavigationScreenProps, createStackNavigator, createAppContainer } from 'react-navigation';
import QRCode from 'react-native-qrcode-svg';
import { MatchEvent, EventList } from '../record/EventList';

type State = {
  eventData: string
}
export class ReviewScreen extends React.Component<NavigationScreenProps, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      eventData: "1"
    }
  }
  componentDidMount() {
    console.log(this.props.navigation.getParam('events'))
    const start = this.props.navigation.getParam('matchStart') as number;
    const events = this.props.navigation.getParam('events') as MatchEvent[];
    console.log("Got events ", events)
    // TODO: Process event log for qr code.
    const eventData = events
      .sort((a, b) => a.timestamp! - b.timestamp!)
      .map((e) => {
        // Timestamp is in tenths of a second
        return `${((e.timestamp! - start)/100).toFixed(0)} ${e.code}`;
      })
      .join('$');
    this.setState({
      eventData
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Review The Match</Text>
        <QRCode size={400} value={this.state.eventData}></QRCode>
        <Text>{this.state.eventData}</Text>
      </View>
    );
  }
}