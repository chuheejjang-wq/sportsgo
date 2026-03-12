import rawGames from './kbo.json';
import { stadiums, teams } from '../games';
import { Game } from '../types';

type KboSourceRow = {
  date: string;
  weekday: string;
  stadium: string;
  away: string;
  home: string;
};

const teamMap = {
  LG: teams.lg,
  '두산': teams.doosan,
  '키움': teams.kiwoom,
  SSG: teams.ssg,
  KT: teams.kt,
  '한화': teams.hanwha,
  '롯데': teams.lotte,
  '삼성': teams.samsung,
  KIA: teams.kia,
  NC: teams.nc
} as const;

const stadiumMap = {
  '잠실': stadiums.jamsil,
  '고척': stadiums.gocheok,
  '문학': stadiums.incheonLanders,
  '수원': stadiums.suwonBaseball,
  '대전': stadiums.daejeonBaseball,
  '대구': stadiums.daeguPark,
  '광주': stadiums.gwangjuChamp,
  '사직': stadiums.sajik,
  '창원': stadiums.changwonNcPark
} as const;

function inferKboStartTime(weekday: string) {
  return weekday === '토' || weekday === '일' ? '14:00' : '18:30';
}

export const kboGames: Game[] = (rawGames as KboSourceRow[]).map((game, index) => ({
  id: `kbo-2026-${index + 1}`,
  date: game.date,
  time: inferKboStartTime(game.weekday),
  league: 'KBO',
  sport: 'baseball',
  homeTeam: teamMap[game.home as keyof typeof teamMap],
  awayTeam: teamMap[game.away as keyof typeof teamMap],
  stadium: stadiumMap[game.stadium as keyof typeof stadiumMap]
}));
