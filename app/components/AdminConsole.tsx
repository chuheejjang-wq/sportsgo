'use client';

import { useEffect, useMemo, useState } from 'react';
import AppNav from './AppNav';
import { teams as teamMap } from '../../data/games';
import { usePlannerData } from '../../data/plannerStore';
import { Game, LeagueCode, SportType, Stadium } from '../../data/types';

function sortGames(games: Game[]) {
  return games.slice().sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
}

function cloneStadium(stadium: Stadium): Stadium {
  return { ...stadium };
}

export default function AdminConsole() {
  const { data, saveData, resetData } = usePlannerData();
  const [selectedLeague, setSelectedLeague] = useState<LeagueCode>('KBO');

  useEffect(() => {
    if (!data.leagues.some((league) => league.code === selectedLeague)) {
      setSelectedLeague(data.leagues[0]?.code ?? 'KBO');
    }
  }, [data.leagues, selectedLeague]);

  const activeLeague = useMemo(
    () => data.leagues.find((league) => league.code === selectedLeague) ?? data.leagues[0] ?? null,
    [data.leagues, selectedLeague]
  );

  const leagueSport = useMemo<SportType>(() => {
    const firstGame = data.games.find((game) => game.league === selectedLeague);
    if (firstGame) return firstGame.sport;
    return selectedLeague === 'KBO' || selectedLeague === 'NPB' ? 'baseball' : 'football';
  }, [data.games, selectedLeague]);

  const teams = useMemo(
    () => Object.values(teamMap).filter((team) => team.sport === leagueSport),
    [leagueSport]
  );

  const games = useMemo(
    () => sortGames(data.games.filter((game) => game.league === selectedLeague)),
    [data.games, selectedLeague]
  );

  const countryStadiums = useMemo(
    () =>
      data.stadiums
        .filter((stadium) => stadium.country === activeLeague?.country)
        .slice()
        .sort((a, b) => `${a.venueType}-${a.city}-${a.name}`.localeCompare(`${b.venueType}-${b.city}-${b.name}`)),
    [activeLeague, data.stadiums]
  );

  const selectableStadiums = useMemo(
    () => countryStadiums.filter((stadium) => stadium.venueType === leagueSport),
    [countryStadiums, leagueSport]
  );

  function updateGame(gameId: string, updater: (game: Game) => Game) {
    saveData((current) => ({
      ...current,
      games: current.games.map((game) => (game.id === gameId ? updater(game) : game))
    }));
  }

  function deleteGame(gameId: string) {
    saveData((current) => ({
      ...current,
      games: current.games.filter((game) => game.id !== gameId)
    }));
  }

  function addGame() {
    const homeTeam = teams[0];
    const awayTeam = teams[1] ?? teams[0];
    const stadium = selectableStadiums[0];
    if (!activeLeague || !homeTeam || !awayTeam || !stadium) return;

    const nextGame: Game = {
      id: `admin-${selectedLeague.toLowerCase()}-${Date.now()}`,
      date: '2026-03-12',
      time: '19:00',
      league: selectedLeague,
      sport: leagueSport,
      homeTeam: { ...homeTeam },
      awayTeam: { ...awayTeam },
      stadium: cloneStadium(stadium)
    };

    saveData((current) => ({
      ...current,
      games: sortGames([...current.games, nextGame])
    }));
  }

  function updateStadium(stadiumId: string, updater: (stadium: Stadium) => Stadium) {
    saveData((current) => ({
      ...current,
      stadiums: current.stadiums.map((stadium) => (stadium.id === stadiumId ? updater(stadium) : stadium))
    }));
  }

  function addStadium() {
    if (!activeLeague) return;

    const nextStadium: Stadium = {
      id: `stadium-${selectedLeague.toLowerCase()}-${Date.now()}`,
      name: '새 경기장',
      city: activeLeague.country === 'KR' ? '서울' : '도쿄',
      country: activeLeague.country,
      venueType: leagueSport,
      lat: 37.5665,
      lng: 126.978
    };

    saveData((current) => ({
      ...current,
      stadiums: [...current.stadiums, nextStadium]
    }));
  }

  function deleteStadium(stadiumId: string) {
    saveData((current) => ({
      ...current,
      stadiums: current.stadiums.filter((stadium) => stadium.id !== stadiumId),
      games: current.games.filter((game) => game.stadium.id !== stadiumId)
    }));
  }

  return (
    <main className="pageShell">
      <AppNav current="admin" />

      <section className="heroCard adminHero">
        <div>
          <p className="eyebrow">로컬 어드민</p>
          <h1>리그별 경기 일정과 경기장 데이터를 수정</h1>
          <p className="heroDesc">이 화면에서 수정한 내용은 브라우저 `localStorage`에 저장되고 플래너 화면에도 바로 반영됩니다.</p>
        </div>
        <button className="secondaryButton" onClick={resetData}>
          기본 데이터로 초기화
        </button>
      </section>

      <section className="panel adminPanel">
        <div className="adminLeagueTabs">
          {data.leagues.map((league) => (
            <button
              key={league.code}
              className={`adminLeagueTab ${selectedLeague === league.code ? 'active' : ''}`}
              onClick={() => setSelectedLeague(league.code)}
            >
              {league.name}
            </button>
          ))}
        </div>

        {activeLeague && (
          <div className="adminSummary">
            <div>
              <strong>{activeLeague.name}</strong>
              <span>{activeLeague.country === 'KR' ? '한국' : '일본'} / {leagueSport === 'baseball' ? '야구' : '축구'}</span>
            </div>
            <div>
              <span>경기 {games.length}개</span>
              <span>경기장 {countryStadiums.length}개</span>
            </div>
          </div>
        )}
      </section>

      <section className="adminGrid">
        <div className="panel adminSection">
          <div className="adminSectionHeader">
            <div>
              <h2>경기 일정</h2>
              <p className="mutedText">날짜, 시간, 팀, 경기장을 리그별로 수정합니다.</p>
            </div>
            <button className="secondaryButton" onClick={addGame} disabled={!selectableStadiums.length || teams.length < 1}>
              경기 추가
            </button>
          </div>

          <div className="adminCardList">
            {games.map((game) => {
              const stadiumOptions = selectableStadiums.some((stadium) => stadium.id === game.stadium.id)
                ? selectableStadiums
                : [game.stadium, ...selectableStadiums];

              return (
                <article key={game.id} className="adminEditCard">
                  <div className="adminRow four">
                    <label>
                      <span>날짜</span>
                      <input type="date" value={game.date} onChange={(event) => updateGame(game.id, (current) => ({ ...current, date: event.target.value }))} />
                    </label>
                    <label>
                      <span>시간</span>
                      <input type="time" value={game.time} onChange={(event) => updateGame(game.id, (current) => ({ ...current, time: event.target.value }))} />
                    </label>
                    <label>
                      <span>홈팀</span>
                      <select
                        value={game.homeTeam.id}
                        onChange={(event) =>
                          updateGame(game.id, (current) => ({
                            ...current,
                            homeTeam: { ...teamMap[event.target.value] }
                          }))
                        }
                      >
                        {teams.map((team) => (
                          <option key={team.id} value={team.id}>
                            {team.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      <span>원정팀</span>
                      <select
                        value={game.awayTeam.id}
                        onChange={(event) =>
                          updateGame(game.id, (current) => ({
                            ...current,
                            awayTeam: { ...teamMap[event.target.value] }
                          }))
                        }
                      >
                        {teams.map((team) => (
                          <option key={team.id} value={team.id}>
                            {team.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="adminRow two">
                    <label>
                      <span>경기장</span>
                      <select
                        value={game.stadium.id}
                        onChange={(event) => {
                          const nextStadium = data.stadiums.find((stadium) => stadium.id === event.target.value);
                          if (!nextStadium) return;
                          updateGame(game.id, (current) => ({
                            ...current,
                            stadium: cloneStadium(nextStadium)
                          }));
                        }}
                      >
                        {stadiumOptions.map((stadium) => (
                          <option key={stadium.id} value={stadium.id}>
                            {stadium.name} ({stadium.city})
                          </option>
                        ))}
                      </select>
                    </label>
                    <div className="adminActions">
                      <span className="statusPill">{game.sport === 'baseball' ? '야구' : '축구'}</span>
                      <button className="dangerButton" onClick={() => deleteGame(game.id)}>
                        삭제
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}

            {games.length === 0 && <div className="emptyState small">이 리그에는 아직 등록된 경기가 없습니다.</div>}
          </div>
        </div>

        <div className="panel adminSection">
          <div className="adminSectionHeader">
            <div>
              <h2>경기장 데이터</h2>
              <p className="mutedText">국가별 경기장을 열고 `야구/축구` 종목 분류까지 수정합니다.</p>
            </div>
            <button className="secondaryButton" onClick={addStadium}>
              경기장 추가
            </button>
          </div>

          <div className="adminCardList">
            {countryStadiums.map((stadium) => (
              <article key={stadium.id} className="adminEditCard">
                <div className="adminRow four">
                  <label>
                    <span>이름</span>
                    <input
                      value={stadium.name}
                      onChange={(event) => updateStadium(stadium.id, (current) => ({ ...current, name: event.target.value }))}
                    />
                  </label>
                  <label>
                    <span>도시</span>
                    <input
                      value={stadium.city}
                      onChange={(event) => updateStadium(stadium.id, (current) => ({ ...current, city: event.target.value }))}
                    />
                  </label>
                  <label>
                    <span>종목</span>
                    <select
                      value={stadium.venueType}
                      onChange={(event) =>
                        updateStadium(stadium.id, (current) => ({
                          ...current,
                          venueType: event.target.value as SportType
                        }))
                      }
                    >
                      <option value="baseball">야구장</option>
                      <option value="football">축구장</option>
                    </select>
                  </label>
                  <label>
                    <span>국가</span>
                    <select
                      value={stadium.country}
                      onChange={(event) =>
                        updateStadium(stadium.id, (current) => ({
                          ...current,
                          country: event.target.value as Stadium['country']
                        }))
                      }
                    >
                      <option value="KR">한국</option>
                      <option value="JP">일본</option>
                    </select>
                  </label>
                </div>

                <div className="adminRow three">
                  <label>
                    <span>위도</span>
                    <input
                      type="number"
                      step="0.00001"
                      value={stadium.lat}
                      onChange={(event) =>
                        updateStadium(stadium.id, (current) => ({
                          ...current,
                          lat: Number(event.target.value)
                        }))
                      }
                    />
                  </label>
                  <label>
                    <span>경도</span>
                    <input
                      type="number"
                      step="0.00001"
                      value={stadium.lng}
                      onChange={(event) =>
                        updateStadium(stadium.id, (current) => ({
                          ...current,
                          lng: Number(event.target.value)
                        }))
                      }
                    />
                  </label>
                  <div className="adminActions">
                    <span className={`statusPill ${stadium.venueType === leagueSport ? 'ok' : ''}`}>
                      {stadium.venueType === 'baseball' ? '야구장' : '축구장'}
                    </span>
                    <button className="dangerButton" onClick={() => deleteStadium(stadium.id)}>
                      삭제
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
