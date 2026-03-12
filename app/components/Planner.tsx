'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { getMetroStadiums } from '../../data/games';
import { usePlannerData } from '../../data/plannerStore';
import { CountryCode, Game, LeagueCode, Stadium } from '../../data/types';
import AppNav from './AppNav';

declare global {
  interface Window {
    google?: any;
    initSportsTripMap?: () => void;
  }
}

type DayCell = {
  key: string;
  date: Date;
  inMonth: boolean;
};

const sportEmoji = {
  baseball: '⚾',
  football: '⚽'
} as const;

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function toISO(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function getMonthGrid(baseDate: Date): DayCell[] {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());
  const end = new Date(last);
  end.setDate(last.getDate() + (6 - last.getDay()));
  const days: DayCell[] = [];
  const cursor = new Date(start);

  while (cursor <= end) {
    days.push({
      key: toISO(cursor),
      date: new Date(cursor),
      inMonth: cursor.getMonth() === month
    });
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

function formatDateLabel(iso: string) {
  const date = new Date(`${iso}T00:00:00`);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

function formatWeekday(iso: string) {
  const date = new Date(`${iso}T00:00:00`);
  return ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
}

function formatShortDate(iso: string) {
  const date = new Date(`${iso}T00:00:00`);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function countryFlag(country: CountryCode) {
  return country === 'KR' ? '🇰🇷' : '🇯🇵';
}

function useGoogleMaps() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.google?.maps) {
      setReady(true);
      return;
    }
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return;
    const existing = document.getElementById('google-maps-script');
    if (existing) return;

    window.initSportsTripMap = () => setReady(true);
    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initSportsTripMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      delete window.initSportsTripMap;
    };
  }, []);

  return ready;
}

function MapPanel({
  country,
  focusedGame,
  stadiums,
  showOnlySelected
}: {
  country: CountryCode;
  focusedGame: Game | null;
  stadiums: Stadium[];
  showOnlySelected: boolean;
}) {
  const ready = useGoogleMaps();

  useEffect(() => {
    if (!ready || !window.google) return;
    const element = document.getElementById('google-map');
    if (!element) return;

    const defaultCenter = country === 'KR' ? { lat: 36.2, lng: 127.9 } : { lat: 35.7, lng: 139.7 };

    const map = new window.google.maps.Map(element, {
      center: defaultCenter,
      zoom: country === 'KR' ? 7 : 6,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true
    });

    const markers: any[] = [];
    const infoWindow = new window.google.maps.InfoWindow();
    const visibleStadiums = showOnlySelected && focusedGame ? [focusedGame.stadium] : stadiums;

    visibleStadiums.forEach((stadium) => {
      const marker = new window.google.maps.Marker({
        map,
        position: { lat: stadium.lat, lng: stadium.lng },
        title: stadium.name
      });
      marker.addListener('click', () => {
        infoWindow.setContent(`<div style="padding:8px 10px;font-size:14px"><strong>${stadium.name}</strong><br/>${stadium.city}</div>`);
        infoWindow.open({ map, anchor: marker });
      });
      markers.push(marker);
    });

    if (visibleStadiums.length === 1) {
      map.setCenter({ lat: visibleStadiums[0].lat, lng: visibleStadiums[0].lng });
      map.setZoom(13);
    } else if (visibleStadiums.length > 1) {
      const bounds = new window.google.maps.LatLngBounds();
      visibleStadiums.forEach((stadium) => bounds.extend({ lat: stadium.lat, lng: stadium.lng }));
      map.fitBounds(bounds, 50);
    } else if (focusedGame) {
      map.setCenter({ lat: focusedGame.stadium.lat, lng: focusedGame.stadium.lng });
      map.setZoom(12);
    }

    return () => {
      markers.forEach((marker) => marker.setMap(null));
    };
  }, [ready, country, focusedGame, stadiums, showOnlySelected]);

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="mapFallback">
        <strong>Google Maps API 키가 없습니다.</strong>
        <p>.env.local 파일에 NEXT_PUBLIC_GOOGLE_MAPS_API_KEY를 추가해 주세요.</p>
      </div>
    );
  }

  return <div id="google-map" className="mapCanvas" />;
}

export default function Planner() {
  const { data } = usePlannerData();
  const [selectedLeagues, setSelectedLeagues] = useState<LeagueCode[]>(() => data.leagues.map((league) => league.code));
  const [visibleMonth, setVisibleMonth] = useState(new Date(2026, 2, 1));
  const [selectedDates, setSelectedDates] = useState<string[]>(['2026-03-28']);
  const [focusedGameId, setFocusedGameId] = useState<string | null>(null);
  const [showOnlySelectedStadium, setShowOnlySelectedStadium] = useState(false);

  const availableLeagues = data.leagues;
  const leagueByCode = useMemo(() => {
    return Object.fromEntries(data.leagues.map((league) => [league.code, league]));
  }, [data.leagues]);

  const filteredGames = useMemo(() => {
    const result = data.games.filter((game) => selectedLeagues.includes(game.league) && selectedDates.includes(game.date));
    result.sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
    return result;
  }, [data.games, selectedDates, selectedLeagues]);

  const focusedGame = useMemo(
    () => filteredGames.find((game) => game.id === focusedGameId) ?? filteredGames[0] ?? null,
    [filteredGames, focusedGameId]
  );

  useEffect(() => {
    if (!focusedGame && filteredGames[0]) {
      setFocusedGameId(filteredGames[0].id);
    }
    if (focusedGameId && !filteredGames.some((game) => game.id === focusedGameId)) {
      setFocusedGameId(filteredGames[0]?.id ?? null);
    }
  }, [filteredGames, focusedGame, focusedGameId]);

  const groupedByDate = useMemo(() => {
    return selectedDates
      .slice()
      .sort()
      .map((date) => ({ date, items: filteredGames.filter((game) => game.date === date) }));
  }, [filteredGames, selectedDates]);

  const activeCountry = useMemo(() => {
    if (focusedGame) return focusedGame.stadium.country;
    return data.leagues.find((league) => selectedLeagues.includes(league.code))?.country ?? 'KR';
  }, [data.leagues, focusedGame, selectedLeagues]);

  const mapStadiums = useMemo(() => {
    if (!focusedGame) return [];
    return getMetroStadiums(activeCountry, focusedGame.stadium.city, data.stadiums);
  }, [activeCountry, data.stadiums, focusedGame]);

  const monthGrid = useMemo(() => getMonthGrid(visibleMonth), [visibleMonth]);

  function toggleDate(iso: string) {
    setSelectedDates((prev) => {
      const next = prev.includes(iso) ? prev.filter((item) => item !== iso) : [...prev, iso];
      return next.sort();
    });
  }

  function toggleLeague(code: LeagueCode) {
    setSelectedLeagues((prev) => (prev.includes(code) ? prev.filter((item) => item !== code) : [...prev, code]));
  }

  return (
    <main className="pageShell">
      <AppNav current="planner" />

      <section className="heroCard">
        <div>
          <p className="eyebrow">하루 1경기 기준</p>
          <h1>선택한 날짜만 모아 보여주는 스포츠 일정</h1>
          <p className="heroDesc">날짜를 눌러 여러 날짜를 고르면, 고른 날짜의 경기만 결과에 표시됩니다. 어드민에서 수정한 일정과 경기장 정보도 여기서 바로 반영됩니다.</p>
        </div>
      </section>

      <section className="contentWithSidebar">
        <aside className="calendarSidebar">
          <div className="panel calendarPanel">
            <div className="calendarHeader">
              <h2>달력</h2>
              <div className="calendarMove">
                <button onClick={() => setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1))}>
                  {'<'}
                </button>
                <strong>
                  {visibleMonth.getFullYear()}년 {visibleMonth.getMonth() + 1}월
                </strong>
                <button onClick={() => setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1))}>
                  {'>'}
                </button>
              </div>
            </div>
            <div className="weekdayRow">
              {['일', '월', '화', '수', '목', '금', '토'].map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
            <div className="calendarGrid">
              {monthGrid.map((cell) => {
                const iso = toISO(cell.date);
                const selected = selectedDates.includes(iso);
                return (
                  <button
                    key={cell.key}
                    className={`dayCell ${cell.inMonth ? '' : 'muted'} ${selected ? 'selected' : ''}`}
                    onClick={() => toggleDate(iso)}
                  >
                    {cell.date.getDate()}
                  </button>
                );
              })}
            </div>
            <p className="hintText">선택한 날짜 수: {selectedDates.length}</p>
          </div>

          <div className="panel leaguePanel">
            <h2>리그</h2>
            <div className="leagueGrid sidebarLeagueGrid">
              {availableLeagues.map((league) => (
                <button
                  key={league.code}
                  className={`leagueCard ${selectedLeagues.includes(league.code) ? 'active' : ''}`}
                  aria-label={league.name}
                  onClick={() => toggleLeague(league.code)}
                >
                  <div className="leagueImageWrap">
                    <Image src={league.imageUrl} alt={league.name} fill sizes="160px" className="leagueImage" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="mainColumn">
          <section className="resultsGrid">
            <div className="panel resultsPanel">
              <div className="resultsHeader">
                <div>
                  <h2>검색 결과</h2>
                  <p className="mutedText">선택한 날짜별로 경기를 묶어서 보여줍니다.</p>
                </div>
              </div>

              {groupedByDate.map(({ date, items }) => (
                <div key={date} className="dateGroup">
                  <div className="dateHeading">
                    <strong>{formatDateLabel(date)}</strong>
                    <span>{formatWeekday(date)}요일</span>
                  </div>

                  {items.length === 0 ? (
                    <div className="emptyState small">선택한 리그 기준으로 해당 날짜 경기가 없습니다.</div>
                  ) : (
                    <div className="matchList">
                      {items.map((game) => (
                        <button
                          key={game.id}
                          className={`matchCard ${focusedGame?.id === game.id ? 'active' : ''}`}
                          onClick={() => {
                            setFocusedGameId(game.id);
                            setShowOnlySelectedStadium(false);
                          }}
                        >
                          <div className="matchHead">
                            <div className="leagueMeta">
                              <span className="leagueFlag">{countryFlag(leagueByCode[game.league].country)}</span>
                              <span className="matchSport">{sportEmoji[game.sport]}</span>
                              <span className="leagueName">{leagueByCode[game.league].name}</span>
                            </div>
                            <span className="matchDateTime">{formatShortDate(game.date)} {game.time}</span>
                          </div>
                          <div className="matchBodyRow">
                            <div className="teamNameCell">{game.homeTeam.shortName}</div>
                            <div className="teamLogoBox">
                              {game.homeTeam.logoUrl ? (
                                <Image src={game.homeTeam.logoUrl} alt={`${game.homeTeam.shortName} logo`} fill sizes="160px" className="teamLogoImage" />
                              ) : (
                                <span className="teamLogoText">홈팀 로고</span>
                              )}
                            </div>
                            <span className="vsCenter">VS</span>
                            <div className="teamLogoBox">
                              {game.awayTeam.logoUrl ? (
                                <Image src={game.awayTeam.logoUrl} alt={`${game.awayTeam.shortName} logo`} fill sizes="160px" className="teamLogoImage" />
                              ) : (
                                <span className="teamLogoText">원정팀 로고</span>
                              )}
                            </div>
                            <div className="teamNameCell right">{game.awayTeam.shortName}</div>
                          </div>
                          <div className="stadiumLine">{game.stadium.name}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="panel mapPanel">
              <div className="mapHeader">
                <div>
                  <h2>지도</h2>
                  <p className="mutedText">경기를 선택하면 해당 지역 중심으로 지도를 이동합니다.</p>
                </div>
                {focusedGame && <div className="focusedLabel">현재 선택: {focusedGame.stadium.city}</div>}
              </div>

              <MapPanel
                country={activeCountry}
                focusedGame={focusedGame}
                stadiums={mapStadiums}
                showOnlySelected={showOnlySelectedStadium}
              />

              <label className="checkboxRow">
                <input
                  type="checkbox"
                  checked={showOnlySelectedStadium}
                  onChange={(event) => setShowOnlySelectedStadium(event.target.checked)}
                  disabled={!focusedGame}
                />
                해당 경기장만 보기
              </label>

              {focusedGame ? (
                <div className="focusDetail">
                  <strong>
                    {formatDateLabel(focusedGame.date)} {focusedGame.time}
                  </strong>
                  <div>
                    {sportEmoji[focusedGame.sport]} {focusedGame.homeTeam.name} vs {focusedGame.awayTeam.name}
                  </div>
                  <div>{focusedGame.stadium.name}</div>
                </div>
              ) : (
                <div className="emptyState small">경기를 선택하면 지도가 이동합니다.</div>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
