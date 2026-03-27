import rawSchedule from './j2_j3_league_schedule.json';
import {
  buildFootballGames,
  fillUnknownJLeagueRows,
  j2J3StadiumLookup,
  j2J3TeamLookup
} from './shared';
import { Game } from '../types';

type JLeagueRow = {
  datetime: string;
  home_team: string;
  away_team: string;
};

export const j2Games: Game[] = buildFootballGames(
  fillUnknownJLeagueRows((rawSchedule as { matches: JLeagueRow[] }).matches),
  'J2',
  'JP',
  j2J3TeamLookup,
  j2J3StadiumLookup
);
