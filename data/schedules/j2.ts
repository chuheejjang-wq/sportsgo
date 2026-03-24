import rawSchedule from './j2_j3_league_schedule.json';
import {
  buildFootballGames,
  fillUnknownJLeagueRows,
  jLeagueStadiumLookup,
  jLeagueTeamLookup
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
  jLeagueTeamLookup,
  jLeagueStadiumLookup
);
