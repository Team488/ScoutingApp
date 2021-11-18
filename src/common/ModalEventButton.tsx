import {StyleSheet} from 'react-native';
import {
    ActionSheet,
  Button,
  Text,
} from 'native-base';
import React from 'react';

import { EventCode } from 'src/record/Events';
import { OnEventHandler, useOnEvent } from './OnEventContext';

type EventOptions = Record<string, EventCode>;

const styles = StyleSheet.create({
  eventButton: {
    margin: 5,
    alignSelf: 'center',
  },
});

const showDialog = (title: string, options: EventOptions, emitEvent: OnEventHandler) => {
  const cancelIdx = Object.keys(options).length;
  const timestamp = Date.now();

  ActionSheet.show(
    {
      options: [...Object.keys(options), "Cancel"],
      cancelButtonIndex: cancelIdx,
      title,
    },
    buttonIndex => {
      if (buttonIndex === cancelIdx) {
        return;
      }
      const label = Object.keys(options)[buttonIndex];
      const code = options[label];
      
      emitEvent({ timestamp, code });
    }
  )
}

export const ModalEventButton = ({
  dialogMessage,
  eventOptions,
  label,
}: {
  dialogMessage: string,
  eventOptions: EventOptions;
  label: string;
}) => {
  const emitEvent = useOnEvent();
  return (
    <Button
      large
      style={styles.eventButton}
      onPress={() => showDialog(dialogMessage, eventOptions, emitEvent)}>
      <Text>{label}</Text>
    </Button>
  );
};
