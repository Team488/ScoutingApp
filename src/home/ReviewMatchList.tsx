import React from 'react';
import RN, { FlatList, ListRenderItemInfo, StyleProp, View, ViewStyle } from 'react-native';
import { Button, Body, Content, Grid, ListItem, Icon, H2, Header, Left, Right, Row, Col, Text, Title } from 'native-base';
import { inject, observer } from 'mobx-react';
import { History } from '../store';
import moment from 'moment';

type Props = {
  history: History[];
  style: StyleProp<ViewStyle>;
  selectedMatch: (match: History) => void;
}

export class ReviewMatchList extends React.Component<Props> {
  renderItem(info: ListRenderItemInfo<History>) {
    return (<ListItem button={true} onPress={() => this.props.selectedMatch(info.item)}>
      <Body>
        <Text>Match #{info.item.id} - Team #{info.item.team}</Text>
        <Text>{moment(info.item.time).format('MMM Do h:mm a')}</Text>
      </Body>
    </ListItem>
    );
  }

  render() {
    return (<View style={this.props.style}><H2>Previous Matches:</H2>
      <FlatList style={{ height: 400, margin: 10 }}
        data={this.props.history}
        renderItem={(item) => this.renderItem(item)}
        keyExtractor={item => item.id.toString()}
      >
      </FlatList></View>)
  }
}