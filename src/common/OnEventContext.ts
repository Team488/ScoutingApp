import React from 'react';
import { EventCode } from 'src/record/Events';

export interface TimedEvent {
    timestamp: number,
    code: EventCode
  }

export type OnEventHandler = (event: TimedEvent) => void;

export const OnEventContext = React.createContext((event: TimedEvent) => {});

export const useOnEvent: () => OnEventHandler = () => {
    const context = React.useContext(OnEventContext);
    return context;
};