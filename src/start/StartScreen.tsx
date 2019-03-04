import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Content, Body, Left, Icon, Grid, Row, Col, Header, Form, Picker, Right, Text, Title } from 'native-base';
import { NavigationScreenProps } from 'react-navigation';
import { ScoutingAppHeader } from '../ScoutingAppHeader';

/*
TODO:
- confirm placement and team
- allow selecting the match
*/

export class StartScreen extends React.Component<NavigationScreenProps> {
  static navigationOptions = ({navigation}:any) => {
    return {
      header: <ScoutingAppHeader 
                  navigation={navigation}
                  title="Prepare to Record"></ScoutingAppHeader>
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Content>
        <Grid>
          <Col style={styles.mainCol}>
            <Row style={styles.headerRow}>
              <Text style={styles.header}>Alliance: <Text style={styles.detail}>BLUE</Text></Text>
            </Row>
            <Row style={styles.headerRow}>
              <Text style={styles.header}>Team: <Text style={styles.detail}>Team 1732</Text></Text>
            </Row>
            <Row style={styles.headerRow}>
              <Text style={styles.header}>Position: <Text style={styles.detail}>Far</Text></Text>
            </Row>
            <Row style={styles.headerRow}>
              <Text style={styles.header}>Recording Match:</Text>
              <Picker mode="dropdown" placeholder="Choose a match">
                <Picker.Item label="Match 1" value="1" />
                <Picker.Item label="Match 2" value="2" />
                <Picker.Item label="Match 3" value="3" />
                <Picker.Item label="Match 4" value="4" />
                <Picker.Item label="Match 5" value="5" />
              </Picker>
            </Row>
            <Row>
              <Button block
                onPress={() => navigate('Record')}>
                <Text>Start</Text>
              </Button>
            </Row>
          </Col>
        </Grid>
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
