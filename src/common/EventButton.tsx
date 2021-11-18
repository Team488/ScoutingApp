import {StyleSheet} from 'react-native';
import {
  Button,
  Text,
} from 'native-base';
import React from 'react';
import { useOnEvent } from './OnEventContext';
import { EventCode } from 'src/record/Events';

const styles = StyleSheet.create({
  eventButton: {
    margin: 5,
    alignSelf: 'center',
  },
});

export const EventButton = ({
  eventCode,
  label,
}: {
  eventCode: EventCode;
  label: string;
}) => {
  const onEvent = useOnEvent();
  return (
    <Button
      large
      style={styles.eventButton}
      onPress={() => onEvent({code: eventCode, timestamp: Date.now()})}>
      <Text>{label}</Text>
    </Button>
  );
};
