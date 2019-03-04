import { Component } from 'react';
import { MatchList } from './MatchList';
import {inject } from 'mobx-react';

export { Match, MatchList, Position } from './MatchList';

export interface RootStore {
  matchList: MatchList;
}

export class ConnectedComponent<T, S, X = {}> extends Component<T, X> {
  public get stores() {
    return (this.props as any) as S;
  }
}

export const connect = (...args: Array<keyof RootStore>) => inject(...args)
