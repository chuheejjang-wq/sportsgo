import rawSchedule from './kleague2_schedule.json';
import { buildFootballGames, kLeagueStadiumLookup, kLeagueTeamLookup } from './shared';
import { Game } from '../types';

type KLeague2Row = {
  datetime: string;
  home_team: string;
  away_team: string;
};

export const kleague2Games: Game[] = buildFootballGames(
  (rawSchedule as { matches: KLeague2Row[] }).matches,
  'KLEAGUE2',
  'KR',
  kLeagueTeamLookup,
  kLeagueStadiumLookup
);
