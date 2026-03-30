'use client';

import { useEffect, useState } from 'react';
import { teams as seedTeamMap } from './games';
import { stadiums as seedStadiumMap } from './games';
import { leagues as seedLeagues } from './leagues';
import { games as seedGames } from './schedules';
import { Game, League, Stadium, Team } from './types';

const STORAGE_KEY = 'sportsgo-admin-data-v2';
const STORAGE_EVENT = 'sportsgo-admin-data-updated';

export type PlannerData = {
  leagues: League[];
  games: Game[];
  stadiums: Stadium[];
};

type PlannerDataUpdater = PlannerData | ((current: PlannerData) => PlannerData);

function cloneLeague(league: League): League {
  return { ...league };
}

function cloneStadium(stadium: Stadium): Stadium {
  return { ...stadium };
}

function cloneTeam(team: Team): Team {
  return { ...team };
}

function cloneGame(game: Game): Game {
  return {
    ...game,
    homeTeam: cloneTeam(game.homeTeam),
    awayTeam: cloneTeam(game.awayTeam),
    stadium: cloneStadium(game.stadium)
  };
}

function buildSeedData(): PlannerData {
  const scheduleStadiums = seedGames.map((game) => cloneStadium(game.stadium));
  const mergedStadiums = Array.from(
    new Map(
      [...Object.values(seedStadiumMap).map(cloneStadium), ...scheduleStadiums].map((stadium) => [
        stadium.id,
        stadium
      ])
    ).values()
  );

  return {
    leagues: seedLeagues.map(cloneLeague),
    stadiums: mergedStadiums,
    games: seedGames.map(cloneGame)
  };
}

function syncGamesWithReferenceData(games: Game[], stadiums: Stadium[]): Game[] {
  const stadiumById = Object.fromEntries(stadiums.map((stadium) => [stadium.id, stadium]));
  const teamById = Object.fromEntries(Object.values(seedTeamMap).map((team) => [team.id, team]));

  return games.map((game) => ({
    ...cloneGame(game),
    homeTeam: teamById[game.homeTeam.id] ? cloneTeam(teamById[game.homeTeam.id]) : cloneTeam(game.homeTeam),
    awayTeam: teamById[game.awayTeam.id] ? cloneTeam(teamById[game.awayTeam.id]) : cloneTeam(game.awayTeam),
    stadium: stadiumById[game.stadium.id] ? cloneStadium(stadiumById[game.stadium.id]) : cloneStadium(game.stadium)
  }));
}

function normalizeData(input: PlannerData): PlannerData {
  const stadiums = input.stadiums.map(cloneStadium);
  return {
    leagues: input.leagues.map(cloneLeague),
    stadiums,
    games: syncGamesWithReferenceData(input.games, stadiums)
  };
}

export function getSeedPlannerData(): PlannerData {
  return buildSeedData();
}

export function readPlannerData(): PlannerData {
  if (typeof window === 'undefined') {
    return buildSeedData();
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return buildSeedData();
  }

  try {
    return normalizeData(JSON.parse(raw) as PlannerData);
  } catch {
    return buildSeedData();
  }
}

function writePlannerData(next: PlannerData) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(STORAGE_EVENT));
}

export function usePlannerData() {
  const [data, setData] = useState<PlannerData>(() => buildSeedData());

  useEffect(() => {
    setData(readPlannerData());

    const sync = () => setData(readPlannerData());
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        sync();
      }
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener(STORAGE_EVENT, sync);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(STORAGE_EVENT, sync);
    };
  }, []);

  function saveData(updater: PlannerDataUpdater) {
    setData((current) => {
      const next = normalizeData(typeof updater === 'function' ? updater(current) : updater);
      writePlannerData(next);
      return next;
    });
  }

  function resetData() {
    const next = buildSeedData();
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT));
    setData(next);
  }

  return { data, saveData, resetData };
}
