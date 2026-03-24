import { stadiums, teams } from '../games';
import { Game, Stadium, Team } from '../types';

type ScheduleRow = {
  datetime: string;
  home_team: string;
  away_team: string;
};

type TeamLookup = Record<string, Team>;
type StadiumLookup = Record<string, Stadium>;

const defaultKrFootballStadium = stadiums.seoulWorldCup;
const defaultJpFootballStadium = stadiums.ajinomoto;

export function parseScheduleDateTime(value: string) {
  const match = value.match(/(\d{2})\.(\d{2})\.\s*(\d{2}:\d{2})/);

  if (!match) {
    return { date: '2026-03-01', time: '19:00' };
  }

  const [, day, month, time] = match;

  return {
    date: `2026-${month}-${day}`,
    time
  };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildFallbackTeam(name: string, sport: Team['sport']): Team {
  return {
    id: `${sport}-${slugify(name)}`,
    name,
    shortName: name.replace(/ FC$| CF$| SC$| Utd$| United$| DeNA |도요 |골든이글스/g, '').trim(),
    sport
  };
}

function buildFallbackStadium(name: string, country: Stadium['country']): Stadium {
  return {
    id: `stadium-${slugify(name)}`,
    name: `${name} 홈경기장`,
    city: name,
    country,
    venueType: 'football',
    lat: country === 'KR' ? 37.5665 : 35.6764,
    lng: country === 'KR' ? 126.978 : 139.6500
  };
}

export function teamFromMap(name: string, map: TeamLookup, sport: Team['sport']) {
  return map[name] ?? buildFallbackTeam(name, sport);
}

export function stadiumFromMap(name: string, map: StadiumLookup, country: Stadium['country']) {
  return map[name] ?? buildFallbackStadium(name, country);
}

export function buildFootballGames(
  rows: ScheduleRow[],
  league: Game['league'],
  country: Stadium['country'],
  teamLookup: TeamLookup,
  stadiumLookup: StadiumLookup
): Game[] {
  return rows.map((row, index) => {
    const { date, time } = parseScheduleDateTime(row.datetime);
    const homeTeam = teamFromMap(row.home_team, teamLookup, 'football');
    const awayTeam = teamFromMap(row.away_team, teamLookup, 'football');
    const stadium = stadiumFromMap(row.home_team, stadiumLookup, country);

    return {
      id: `${league.toLowerCase()}-${date}-${index + 1}`,
      date,
      time,
      league,
      sport: 'football',
      homeTeam,
      awayTeam,
      stadium
    };
  });
}

export const kLeagueTeamLookup: TeamLookup = {
  강원: teams.gangwon,
  광주: teams.gwangju,
  김천: teams.gimcheon,
  대전: teams.daejeonCitizen,
  서울: teams.seoul,
  안양: teams.anyang,
  울산: teams.ulsan,
  인천: teams.incheon,
  전북: teams.jeonbuk,
  제주: teams.jeju,
  포항: teams.pohang,
  경남: teams.gyeongnam,
  김포: teams.gimpo,
  김해시청: teams.gimhae,
  대구: teams.daegu,
  부산: teams.busan,
  서울E: teams.seoulE,
  성남: teams.seongnam,
  수원: teams.suwonSamsung,
  수원FC: teams.suwonfc,
  안산: teams.ansan,
  용인: teams.yongin,
  전남: teams.jeonnam,
  천안: teams.cheonanCity,
  충남아산: teams.chungnamAsan,
  충북청주: teams.chungbukCheongju,
  파주: teams.paju,
  화성FC: teams.hwaseong,
  부천: {
    id: 'bucheon',
    name: '부천 FC 1995',
    shortName: '부천',
    sport: 'football'
  }
};

export const kLeagueStadiumLookup: StadiumLookup = {
  강원: stadiums.gangneungComplex,
  광주: stadiums.gwangjuFootballStadium,
  김천: stadiums.gimcheonSportsComplex,
  대전: stadiums.daejeonWorldCup,
  부천: {
    id: 'bucheonStadium',
    name: '부천종합운동장',
    city: '부천',
    country: 'KR',
    venueType: 'football',
    lat: 37.5056,
    lng: 126.7972
  },
  서울: stadiums.seoulWorldCup,
  안양: stadiums.anyangStadium,
  울산: {
    id: 'ulsanMunsu',
    name: '울산문수축구경기장',
    city: '울산',
    country: 'KR',
    venueType: 'football',
    lat: 35.5355,
    lng: 129.2592
  },
  인천: stadiums.incheonFootballStadium,
  전북: stadiums.dgbank,
  제주: stadiums.jejuWorldCup,
  포항: stadiums.steelYard,
  경남: stadiums.changwonFootballCenter,
  김포: stadiums.gimpoSalter,
  김해시청: stadiums.gimhaeSports,
  대구: stadiums.dgbPark,
  부산: stadiums.busanAsiad,
  서울E: stadiums.mokdong,
  성남: stadiums.tancheon,
  수원: stadiums.suwonWorldCup,
  수원FC: stadiums.suwonSports,
  안산: stadiums.ansanWa,
  용인: stadiums.yonginMireu,
  전남: stadiums.gwangyangFootball,
  천안: stadiums.cheonanStadium,
  충남아산: stadiums.yiSunShin,
  충북청주: stadiums.cheongjuStadium,
  파주: stadiums.pajuStadium,
  화성FC: stadiums.hwaseongSports
};

export const jLeagueTeamLookup: TeamLookup = {
  'FC 도쿄': teams.fctokyo,
  '감바 오사카': teams.gamba,
  우라와: teams.reds,
  '요코하마 M.': teams.yokohama,
  '베갈타 센다이': teams.vegalta,
  '주빌로 이와타': teams.iwata
};

export const jLeagueStadiumLookup: StadiumLookup = {
  'FC 도쿄': stadiums.ajinomoto,
  '감바 오사카': stadiums.panasonic,
  우라와: stadiums.saitama,
  '요코하마 M.': stadiums.nissan,
  '베갈타 센다이': stadiums.yurtec,
  '주빌로 이와타': stadiums.ecopa
};

export function fillUnknownJLeagueRows(rows: ScheduleRow[]) {
  return rows.map((row) => ({
    ...row,
    home_team: row.home_team || 'J리그 홈팀',
    away_team: row.away_team || 'J리그 원정팀'
  }));
}

export const defaultFootballStadiumByCountry = {
  KR: defaultKrFootballStadium,
  JP: defaultJpFootballStadium
};
