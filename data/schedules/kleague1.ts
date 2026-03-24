import rawSchedule from './kleague_schedule.json';
import { buildFootballGames, kLeagueStadiumLookup, kLeagueTeamLookup } from './shared';
import { Game } from '../types';

type KLeagueRow = {
  datetime: string;
  home_team: string;
  away_team: string;
};

export const kleague1Games: Game[] = buildFootballGames(
  (rawSchedule as { matches: KLeagueRow[] }).matches,
  'KLEAGUE1',
  'KR',
  kLeagueTeamLookup,
  kLeagueStadiumLookup
);
