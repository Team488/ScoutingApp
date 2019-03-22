import { Component } from 'react';
import { MatchList } from './MatchList';
import { MatchHistory } from './MatchHistory';
import { inject } from 'mobx-react';

export { Match, MatchList, Position } from './MatchList';
export { MatchHistory, History } from './MatchHistory';

export interface RootStore {
  matchList: MatchList;
  matchHistory: MatchHistory;
}

export class ConnectedComponent<T, S, X = {}> extends Component<T, X> {
  public get stores() {
    return (this.props as any) as S;
  }
}

export const connect = (...args: Array<keyof RootStore>) => inject(...args)
