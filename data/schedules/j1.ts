import rawSchedule from './j1_league_schedule.json';
import {
  buildFootballGames,
  fillUnknownJLeagueRows,
  j1StadiumLookup,
  j1TeamLookup
} from './shared';
import { Game } from '../types';

type JLeagueRow = {
  datetime: string;
  home_team: string;
  away_team: string;
};

export const j1Games: Game[] = buildFootballGames(
  fillUnknownJLeagueRows((rawSchedule as { matches: JLeagueRow[] }).matches),
  'J1',
  'JP',
  j1TeamLookup,
  j1StadiumLookup
);
