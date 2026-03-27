import { stadiums } from './games';
import { Stadium, Team } from './types';

type JLeagueCode = 'J1' | 'J2' | 'J3';

type JLeagueClubSeed = {
  team: string;
  englishName: string;
  stadium: string;
  region: string;
  logoUrl: string;
  aliases: string[];
};

type LookupBundle = {
  teamLookup: Record<string, Team>;
  stadiumLookup: Record<string, Stadium>;
};

const regionCoords: Record<string, { lat: number; lng: number }> = {
  '가가와': { lat: 34.3401, lng: 134.0434 },
  '가고시마': { lat: 31.5966, lng: 130.5571 },
  '가나가와': { lat: 35.4478, lng: 139.6425 },
  '고치': { lat: 33.5597, lng: 133.5311 },
  '구마모토': { lat: 32.8031, lng: 130.7079 },
  '군마': { lat: 36.3906, lng: 139.0608 },
  '교토': { lat: 35.0116, lng: 135.7681 },
  '기후': { lat: 35.4233, lng: 136.7607 },
  '나가노': { lat: 36.6513, lng: 138.181 },
  '나가사키': { lat: 32.7503, lng: 129.8777 },
  '나라': { lat: 34.6851, lng: 135.8048 },
  '니가타': { lat: 37.9161, lng: 139.0364 },
  '도야마': { lat: 36.6958, lng: 137.2113 },
  '도쿄': { lat: 35.6762, lng: 139.6503 },
  '도쿠시마': { lat: 34.0703, lng: 134.5548 },
  '도치기': { lat: 36.5658, lng: 139.8836 },
  '돗토리': { lat: 35.5011, lng: 134.2351 },
  '미야기': { lat: 38.2682, lng: 140.8694 },
  '미야자키': { lat: 31.9111, lng: 131.4239 },
  '시가': { lat: 35.0045, lng: 135.8686 },
  '시즈오카': { lat: 34.9769, lng: 138.3831 },
  '사가': { lat: 33.2494, lng: 130.2988 },
  '사이타마': { lat: 35.8617, lng: 139.6455 },
  '아오모리': { lat: 40.8222, lng: 140.7474 },
  '아키타': { lat: 39.7186, lng: 140.1024 },
  '아이치': { lat: 35.1802, lng: 136.9066 },
  '야마가타': { lat: 38.2554, lng: 140.3396 },
  '야마구치': { lat: 34.1785, lng: 131.4737 },
  '야마나시': { lat: 35.6639, lng: 138.5684 },
  '에히메': { lat: 33.8416, lng: 132.7657 },
  '오사카': { lat: 34.6937, lng: 135.5023 },
  '오이타': { lat: 33.2396, lng: 131.6093 },
  '오카야마': { lat: 34.6551, lng: 133.9195 },
  '오키나와': { lat: 26.2124, lng: 127.6809 },
  '이바라키': { lat: 36.3418, lng: 140.4468 },
  '이시카와': { lat: 36.5944, lng: 136.6256 },
  '치바': { lat: 35.6074, lng: 140.1065 },
  '홋카이도': { lat: 43.0618, lng: 141.3545 },
  '효고': { lat: 34.6901, lng: 135.1955 },
  '후쿠시마': { lat: 37.7608, lng: 140.4747 },
  '후쿠오카': { lat: 33.5902, lng: 130.4017 },
  '히로시마': { lat: 34.3853, lng: 132.4553 }
};

const exactStadiumCoords: Record<string, { lat: number; lng: number }> = {
  'Uvance 토도로키 스타디움 by Fujitsu': { lat: 35.5867, lng: 139.6507 },
  '닛산 스타디움': { lat: stadiums.nissan.lat, lng: stadiums.nissan.lng },
  '도요타 스타디움': { lat: 35.0843, lng: 137.1708 },
  '마치다 GION 스타디움': { lat: 35.6126, lng: 139.3671 },
  '베스트덴키 스타디움': { lat: 33.5858, lng: 130.4602 },
  '산가 스타디움 by KYOCERA': { lat: 35.0137, lng: 135.5816 },
  '사이타마 스타디움 2002': { lat: stadiums.saitama.lat, lng: stadiums.saitama.lng },
  '산쿄 프론티어 가시와 스타디움': { lat: 35.8488, lng: 139.9755 },
  '아지노모토 스타디움': { lat: stadiums.ajinomoto.lat, lng: stadiums.ajinomoto.lng },
  '에디온 피스 윙 히로시마': { lat: 34.4133, lng: 132.4529 },
  '요도코 사쿠라 스타디움': { lat: 34.6134, lng: 135.5166 },
  '유아텍 스타디움 센다이': { lat: stadiums.yurtec.lat, lng: stadiums.yurtec.lng },
  '야마하 스타디움': { lat: 34.7098, lng: 137.8517 },
  '파나소닉 스타디움 스이타': { lat: stadiums.panasonic.lat, lng: stadiums.panasonic.lng },
  '후쿠다 덴시 아레나': { lat: 35.5826, lng: 140.1301 },
  '가시마 사커 스타디움': { lat: 35.9921, lng: 140.6405 },
  '아시사토 스타디움': { lat: 34.066, lng: 132.9973 },
  'NACK5 스타디움 오미야': { lat: 35.9168, lng: 139.6258 },
  'ND 소프트 스타디움 야마가타': { lat: 38.319, lng: 140.3779 },
  '닛파츠 미쓰자와 구기장': { lat: 35.4741, lng: 139.6001 },
  '레몬가스 스타디움 히라츠카': { lat: 35.3365, lng: 139.3498 },
  '덴카 빅 스완 스타디움': { lat: 37.8826, lng: 139.0594 },
  '소유 스타디움': { lat: 39.7199, lng: 140.1028 },
  '에키마에 부동산 스타디움': { lat: 33.3772, lng: 130.5061 },
  '유다 온천 파크 스타디움': { lat: 34.1729, lng: 131.4738 },
  '이키메노모리 운동공원 육상경기장': { lat: 31.9079, lng: 131.3844 },
  '크라사스 돔 오이타': { lat: 33.2007, lng: 131.657 },
  '큐앤에스 스타디움 미야기': { lat: 38.3361, lng: 140.9507 }
};

function dedupe(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

function idFromLogoPath(logoUrl: string) {
  return logoUrl.split('/').pop()?.replace(/\.[^.]+$/, '') ?? logoUrl;
}

function buildClub(seed: JLeagueClubSeed) {
  const id = idFromLogoPath(seed.logoUrl);
  const coords = exactStadiumCoords[seed.stadium] ?? regionCoords[seed.region] ?? regionCoords['도쿄'];
  const aliases = dedupe([seed.team, ...seed.aliases]);
  const team: Team = {
    id,
    name: seed.team,
    shortName: seed.aliases[0] ?? seed.team,
    sport: 'football',
    logoUrl: seed.logoUrl
  };
  const stadium: Stadium = {
    id: `${id}Stadium`,
    name: seed.stadium,
    city: seed.region,
    country: 'JP',
    venueType: 'football',
    lat: coords.lat,
    lng: coords.lng
  };

  return { aliases, team, stadium };
}

function buildLookups(seeds: JLeagueClubSeed[]): LookupBundle {
  return seeds.reduce<LookupBundle>(
    (acc, seed) => {
      const club = buildClub(seed);

      for (const alias of club.aliases) {
        acc.teamLookup[alias] = club.team;
        acc.stadiumLookup[alias] = club.stadium;
      }

      return acc;
    },
    { teamLookup: {}, stadiumLookup: {} }
  );
}

export const j1ClubSeeds: JLeagueClubSeed[] = [
  { team: '가시마 앤틀러스', englishName: 'Kashima Antlers', stadium: '가시마 사커 스타디움', region: '이바라키', logoUrl: '/logos/j1/kashima.svg', aliases: ['가시마'] },
  { team: '미토 홀리호크', englishName: 'Mito Hollyhock', stadium: '케즈 덴키 스타디움 미토', region: '이바라키', logoUrl: '/logos/j1/mito.svg', aliases: ['미토'] },
  { team: '우라와 레즈', englishName: 'Urawa Reds', stadium: '사이타마 스타디움', region: '사이타마', logoUrl: '/logos/j1/urawa.svg', aliases: ['우라와'] },
  { team: '제프 유나이티드 치바', englishName: 'JEF United Chiba', stadium: '후쿠다 덴시 아레나', region: '치바', logoUrl: '/logos/j1/chiba.svg', aliases: ['지바'] },
  { team: '가시와 레이솔', englishName: 'Kashiwa Reysol', stadium: '가시와 스타디움', region: '치바', logoUrl: '/logos/j1/kashiwa.svg', aliases: ['가시와'] },
  { team: 'FC 도쿄', englishName: 'FC TOKYO', stadium: '아지노모토 스타디움', region: '도쿄', logoUrl: '/logos/j1/ftokyo.svg', aliases: ['FC 도쿄'] },
  { team: '도쿄 베르디', englishName: 'Tokyo Verdy', stadium: '아지노모토 스타디움', region: '도쿄', logoUrl: '/logos/j1/tokyov.svg', aliases: ['베르디'] },
  { team: 'FC 마치다 젤비아', englishName: 'FC Machida Zelvia', stadium: '마치다 GION 스타디움', region: '도쿄', logoUrl: '/logos/j1/machida.svg', aliases: ['마치다'] },
  { team: '가와사키 프론탈레', englishName: 'Kawasaki Frontale', stadium: 'Uvance 토도로키 스타디움', region: '가나가와', logoUrl: '/logos/j1/kawasakif.svg', aliases: ['가와사키'] },
  { team: '요코하마 F.마리노스', englishName: 'Yokohama F･Marinos', stadium: '닛산 스타디움', region: '가나가와', logoUrl: '/logos/j1/yokohamafm.svg', aliases: ['요코하마 M.', '요코하마 F. 마리노스'] },
  { team: '시미즈 에스펄스', englishName: 'Shimizu S-Pulse', stadium: 'IAI 스타디움 니혼다이라', region: '시즈오카', logoUrl: '/logos/j1/shimizu.svg', aliases: ['시미즈'] },
  { team: '나고야 그램퍼스', englishName: 'Nagoya Grampus', stadium: '도요타 스타디움', region: '아이치', logoUrl: '/logos/j1/nagoya.svg', aliases: ['나고야'] },
  { team: '교토 상가', englishName: 'Kyoto Sanga F.C.', stadium: '산가 스타디움', region: '교토', logoUrl: '/logos/j1/kyoto.svg', aliases: ['교토'] },
  { team: '감바 오사카', englishName: 'Gamba Osaka', stadium: '파나소닉 스타디움 스이타', region: '오사카', logoUrl: '/logos/j1/gosaka.svg', aliases: ['감바 오사카'] },
  { team: '세레소 오사카', englishName: 'Cerezo Osaka', stadium: '요도코 사쿠라 스타디움', region: '오사카', logoUrl: '/logos/j1/cosaka.svg', aliases: ['세레소 오사카'] },
  { team: '비셀 고베', englishName: 'Vissel Kobe', stadium: '노에비아 스타디움 고베', region: '효고', logoUrl: '/logos/j1/kobe.svg', aliases: ['고베'] },
  { team: '파지아노 오카야마', englishName: 'Fagiano Okayama', stadium: 'JFE 하루카스 시티 라이트 스타디움', region: '오카야마', logoUrl: '/logos/j1/okayama.svg', aliases: ['오카야마'] },
  { team: '산프레체 히로시마', englishName: 'Sanfrecce Hiroshima', stadium: '에디온 피스 윙 히로시마', region: '히로시마', logoUrl: '/logos/j1/hiroshima.svg', aliases: ['산프레체 히로시마'] },
  { team: '아비스파 후쿠오카', englishName: 'Avispa Fukuoka', stadium: '베스트덴키 스타디움', region: '후쿠오카', logoUrl: '/logos/j1/fukuoka.svg', aliases: ['아비스파 후쿠오카'] },
  { team: 'V-바렌 나가사키', englishName: 'V-Varen Nagasaki', stadium: 'PEACE STADIUM ', region: '나가사키', logoUrl: '/logos/j1/nagasaki.svg', aliases: ['V-바렌 나가사키'] }
];

export const j2ClubSeeds: JLeagueClubSeed[] = [
  { team: '홋카이도 콘사도레 삿포로', englishName: 'Hokkaido Consadole Sapporo', stadium: '다이와하우스 프리미스트 돔', region: '홋카이도', logoUrl: '/logos/j2/sapporo.svg', aliases: ['삿포로'] },
  { team: '반라우레 하치노헤', englishName: 'Vanraure Hachinohe', stadium: '프라이푸즈 스타디움', region: '아오모리', logoUrl: '/logos/j2/hachinohe.svg', aliases: ['반라우레'] },
  { team: '베갈타 센다이', englishName: 'Vegalta Sendai', stadium: '큐앤에스 스타디움 미야기', region: '미야기', logoUrl: '/logos/j2/sendai.svg', aliases: ['베갈타 센다이'] },
  { team: '블라우블리츠 아키타', englishName: 'Blaublitz Akita', stadium: '소유 스타디움', region: '아키타', logoUrl: '/logos/j2/akita.svg', aliases: ['블라우블리츠'] },
  { team: '몬테디오 야마가타', englishName: 'Montedio Yamagata', stadium: 'ND 소프트 스타디움 야마가타', region: '야마가타', logoUrl: '/logos/j2/yamagata.svg', aliases: ['몬테디오 야마가타'] },
  { team: '이와키 FC', englishName: 'Iwaki FC', stadium: '하와이안즈 스타디움 이와키', region: '후쿠시마', logoUrl: '/logos/j2/iwaki.svg', aliases: ['이와키'] },
  { team: '도치기 시티', englishName: 'TOCHIGI CITY', stadium: '시티 풋볼 스테이션', region: '도치기', logoUrl: '/logos/j2/tochigi-city.svg', aliases: ['도치기 시티'] },
  { team: 'RB 오미야 아르디자', englishName: 'RB Omiya Ardija', stadium: 'NACK5 스타디움 오미야', region: '사이타마', logoUrl: '/logos/j2/omiya.svg', aliases: ['오미야 아르디자'] },
  { team: '요코하마 FC', englishName: 'Yokohama FC', stadium: '닛파츠 미쓰자와 구기장', region: '가나가와', logoUrl: '/logos/j2/yokohamafc.svg', aliases: ['요코하마 FC'] },
  { team: '쇼난 벨마레', englishName: 'Shonan Bellmare', stadium: '레몬가스 스타디움 히라츠카', region: '가나가와', logoUrl: '/logos/j2/shonan.svg', aliases: ['쇼난'] },
  { team: '반포레 고후', englishName: 'Ventforet Kofu', stadium: 'JIT 리사이클 잉크 스타디움', region: '야마나시', logoUrl: '/logos/j2/kofu.svg', aliases: ['고후'] },
  { team: '알비렉스 니가타', englishName: 'Albirex Niigata', stadium: '덴카 빅 스완 스타디움', region: '니가타', logoUrl: '/logos/j2/niigata.svg', aliases: ['알비렉스 니가타'] },
  { team: '카탈레 도야마', englishName: 'Kataller Toyama', stadium: '도야마 종합운동공원', region: '도야마', logoUrl: '/logos/j2/toyama.svg', aliases: ['도야마'] },
  { team: '주빌로 이와타', englishName: 'Jubilo Iwata', stadium: '야마하 스타디움', region: '시즈오카', logoUrl: '/logos/j2/iwata.svg', aliases: ['주빌로 이와타'] },
  { team: '후지에다 MYFC', englishName: 'Fujieda MYFC', stadium: '후지에다시 구장', region: '시즈오카', logoUrl: '/logos/j2/fujieda.svg', aliases: ['후지에다 MYFC'] },
  { team: '도쿠시마 보르티스', englishName: 'Tokushima Vortis', stadium: '포카리스웨트 스타디움', region: '도쿠시마', logoUrl: '/logos/j2/tokushima.svg', aliases: ['도쿠시마'] },
  { team: 'FC 이마바리', englishName: 'FC Imabari', stadium: '아시사토 스타디움', region: '에히메', logoUrl: '/logos/j2/imabari.svg', aliases: ['이마바리'] },
  { team: '사간 도스', englishName: 'Sagan Tosu', stadium: '에키마에 부동산 스타디움', region: '사가', logoUrl: '/logos/j2/tosu.svg', aliases: ['사간도스', '사간 도스'] },
  { team: '오이타 트리니타', englishName: 'Oita Trinita', stadium: '크라사스 돔 오이타', region: '오이타', logoUrl: '/logos/j2/oita.svg', aliases: ['오이타'] },
  { team: '테게바자로 미야자키', englishName: 'Tegevajaro Miyazaki', stadium: '이키메노모리 경기장', region: '미야자키', logoUrl: '/logos/j2/miyazaki.svg', aliases: ['미야자키'] }
];

export const j3ClubSeeds: JLeagueClubSeed[] = [
  { team: '후쿠시마 유나이티드 FC', englishName: 'Fukushima United FC', stadium: '토호 스타디움', region: '후쿠시마', logoUrl: '/logos/j3/fukushima.svg', aliases: ['후쿠시마 Utd'] },
  { team: '도치기 SC', englishName: 'Tochigi SC', stadium: '가나세키 스타디움 도치기', region: '도치기', logoUrl: '/logos/j3/tochigi.svg', aliases: ['도치기 SC'] },
  { team: '더스파 군마', englishName: 'Thespa Gunma', stadium: '쇼다 쇼유 스타디움 군마', region: '군마', logoUrl: '/logos/j3/gunma.svg', aliases: ['쿠사츠', '더스파 군마'] },
  { team: 'SC 사가미하라', englishName: 'S.C. Sagamihara', stadium: '사가미하라 기온 스타디움', region: '가나가와', logoUrl: '/logos/j3/sagamihara.svg', aliases: ['사가미하라'] },
  { team: '마쓰모토 야마가 FC', englishName: 'Matsumoto Yamaga F.C.', stadium: '선프로 알윈', region: '나가노', logoUrl: '/logos/j3/matsumoto.svg', aliases: ['야마가'] },
  { team: 'AC 나가노 파르세이루', englishName: 'AC Nagano Parceiro', stadium: '나가노 U 스타디움', region: '나가노', logoUrl: '/logos/j3/nagano.svg', aliases: ['나가노'] },
  { team: '츠바이겐 가나자와', englishName: 'Zweigen Kanazawa', stadium: '가나자와 고세이넨킨 스타디움', region: '이시카와', logoUrl: '/logos/j3/kanazawa.svg', aliases: ['가나자와'] },
  { team: 'FC 기후', englishName: 'FC Gifu', stadium: '나가라가와 경기장', region: '기후', logoUrl: '/logos/j3/gifu.svg', aliases: ['기후'] },
  { team: '레일락 시가 FC', englishName: 'Reilac Shiga FC', stadium: '히라와 육상경기장', region: '시가', logoUrl: '/logos/j3/shiga.svg', aliases: ['레이랙 시가'] },
  { team: 'FC 오사카', englishName: 'FC Osaka', stadium: '하나조노 럭비장', region: '오사카', logoUrl: '/logos/j3/osaka.svg', aliases: ['오사카'] },
  { team: '나라 클럽', englishName: 'Nara Club', stadium: '나라시 쓰루마이 구장', region: '나라', logoUrl: '/logos/j3/nara.svg', aliases: ['나라 클럽'] },
  { team: '가이나레 돗토리', englishName: 'Gainare Tottori', stadium: 'Axis 버드 스타디움', region: '돗토리', logoUrl: '/logos/j3/tottori.svg', aliases: ['가이나레 도토리'] },
  { team: '레노파 야마구치 FC', englishName: 'Renofa Yamaguchi FC', stadium: '유다 온천 파크 스타디움', region: '야마구치', logoUrl: '/logos/j3/yamaguchi.svg', aliases: ['레노파 야마구치'] },
  { team: '카마타마레 사누키', englishName: 'Kamatamare Sanuki', stadium: 'Pikara 스타디움', region: '가가와', logoUrl: '/logos/j3/sanuki.svg', aliases: ['가마타마레'] },
  { team: '에히메 FC', englishName: 'Ehime FC', stadium: '닛진니아 스타디움', region: '에히메', logoUrl: '/logos/j3/ehime.svg', aliases: ['에히메'] },
  { team: '고치 유나이티드 SC', englishName: 'Kochi United SC', stadium: '하루노 육상경기장', region: '고치', logoUrl: '/logos/j3/kochi.svg', aliases: ['고치 유나이티드'] },
  { team: '기라반츠 기타큐슈', englishName: 'Giravanz Kitakyushu', stadium: '미쿠니 월드 스타디움 기타큐슈', region: '후쿠오카', logoUrl: '/logos/j3/kitakyushu.svg', aliases: ['기라반즈 키타큐슈'] },
  { team: '로아소 구마모토', englishName: 'Roasso Kumamoto', stadium: '에가오 건강 스타디움', region: '구마모토', logoUrl: '/logos/j3/kumamoto.svg', aliases: ['구마모토'] },
  { team: '가고시마 유나이티드 FC', englishName: 'Kagoshima United FC', stadium: '시라나미 스타디움', region: '가고시마', logoUrl: '/logos/j3/kagoshima.svg', aliases: ['가고시마 Utd'] },
  { team: 'FC 류큐', englishName: 'FC RYUKYU', stadium: '타픽 켄소 히야곤 스타디움', region: '오키나와', logoUrl: '/logos/j3/ryukyu.svg', aliases: ['류큐'] }
];

export const jLeagueClubData: Record<JLeagueCode, JLeagueClubSeed[]> = {
  J1: j1ClubSeeds,
  J2: j2ClubSeeds,
  J3: j3ClubSeeds
};

const j1Lookups = buildLookups(j1ClubSeeds);
const j2J3Lookups = buildLookups([...j2ClubSeeds, ...j3ClubSeeds]);

export const j1TeamLookup = j1Lookups.teamLookup;
export const j1StadiumLookup = j1Lookups.stadiumLookup;
export const j2J3TeamLookup = j2J3Lookups.teamLookup;
export const j2J3StadiumLookup = j2J3Lookups.stadiumLookup;
