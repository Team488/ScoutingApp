import {StyleSheet} from 'react-native';
import {
  Button,
  Text,
} from 'native-base';
import React from 'react';

const styles = StyleSheet.create({
  eventButton: {
    margin: 5,
    alignSelf: 'center',
  },
});

export const EventButton = ({
  eventCode,
  onEvent,
  label,
}: {
  eventCode: number;
  onEvent: any;
  label: string;
}) => {
  return (
    <Button
      large
      style={styles.eventButton}
      onPress={() => onEvent({code: eventCode, timestamp: Date.now()})}>
      <Text>{label}</Text>
    </Button>
  );
};
