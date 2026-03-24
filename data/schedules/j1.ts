import rawSchedule from './j1_league_schedule.json';
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

export const j1Games: Game[] = buildFootballGames(
  fillUnknownJLeagueRows((rawSchedule as { matches: JLeagueRow[] }).matches),
  'J1',
  'JP',
  jLeagueTeamLookup,
  jLeagueStadiumLookup
);
