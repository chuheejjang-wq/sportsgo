import rawSchedule from './npb_schedule.json';
import { stadiums, teams } from '../games';
import { Game, Stadium, Team } from '../types';

type NpbScheduleRow = {
  datetime: string;
  home_team: string;
  away_team: string;
};

const teamMap: Record<string, Team> = {
  巨人: teams.giants,
  阪神: teams.tigers,
  DeNA: teams.baystars,
  ヤクルト: teams.swallows,
  広島: teams.carp,
  中日: teams.dragons,
  ソフトバンク: teams.hawks,
  日本ハム: teams.fighters,
  オリックス: teams.buffaloes,
  楽天: teams.eagles,
  西武: teams.lions,
  ロッテ: teams.marines
};

const defaultHomeStadiumByTeamId: Record<string, Stadium> = {
  giants: stadiums.tokyoDome,
  swallows: stadiums.jingu,
  hawks: stadiums.paypay,
  fighters: stadiums.escon,
  buffaloes: stadiums.kyocera,
  marines: stadiums.marine,
  tigers: {
    id: 'koshien',
    name: '한신 고시엔 구장',
    city: '니시노미야',
    country: 'JP',
    venueType: 'baseball',
    lat: 34.7216,
    lng: 135.3615
  },
  baystars: {
    id: 'yokohamaStadium',
    name: '요코하마 스타디움',
    city: '요코하마',
    country: 'JP',
    venueType: 'baseball',
    lat: 35.4435,
    lng: 139.6401
  },
  carp: {
    id: 'mazdaStadium',
    name: 'MAZDA Zoom-Zoom 스타디움 히로시마',
    city: '히로시마',
    country: 'JP',
    venueType: 'baseball',
    lat: 34.392,
    lng: 132.4846
  },
  dragons: {
    id: 'vantelinDome',
    name: '반테린 돔 나고야',
    city: '나고야',
    country: 'JP',
    venueType: 'baseball',
    lat: 35.1851,
    lng: 136.9475
  },
  eagles: {
    id: 'rakutenMobilePark',
    name: '라쿠텐 모바일 파크 미야기',
    city: '센다이',
    country: 'JP',
    venueType: 'baseball',
    lat: 38.2567,
    lng: 140.9023
  },
  lions: {
    id: 'bellunaDome',
    name: '벨루나 돔',
    city: '도코로자와',
    country: 'JP',
    venueType: 'baseball',
    lat: 35.7687,
    lng: 139.4206
  }
};

function parseDateTime(value: string) {
  const [datePart, timePart] = value.split('. ');

  return {
    date: datePart,
    time: timePart
  };
}

export const npbGames: Game[] = ((rawSchedule as { matches: NpbScheduleRow[] }).matches ?? []).reduce<Game[]>(
  (games, row, index) => {
    const homeTeam = teamMap[row.home_team];
    const awayTeam = teamMap[row.away_team];

    if (!homeTeam || !awayTeam) {
      return games;
    }

    const { date, time } = parseDateTime(row.datetime);
    const stadium = defaultHomeStadiumByTeamId[homeTeam.id];

    if (!stadium) {
      return games;
    }

    games.push({
      id: `npb-regular-${index + 1}`,
      date,
      time,
      league: 'NPB',
      sport: 'baseball',
      homeTeam,
      awayTeam,
      stadium
    });

    return games;
  },
  []
);
