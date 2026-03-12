'use client';

import { useEffect, useState } from 'react';
import { games as seedGames, stadiums as seedStadiumMap } from './games';
import { leagues as seedLeagues } from './leagues';
import { Game, League, Stadium } from './types';

const STORAGE_KEY = 'sportsgo-admin-data-v1';
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

function cloneGame(game: Game): Game {
  return {
    ...game,
    homeTeam: { ...game.homeTeam },
    awayTeam: { ...game.awayTeam },
    stadium: cloneStadium(game.stadium)
  };
}

function buildSeedData(): PlannerData {
  return {
    leagues: seedLeagues.map(cloneLeague),
    stadiums: Object.values(seedStadiumMap).map(cloneStadium),
    games: seedGames.map(cloneGame)
  };
}

function syncGamesWithStadiums(games: Game[], stadiums: Stadium[]): Game[] {
  const stadiumById = Object.fromEntries(stadiums.map((stadium) => [stadium.id, stadium]));
  return games.map((game) => ({
    ...cloneGame(game),
    stadium: stadiumById[game.stadium.id] ? cloneStadium(stadiumById[game.stadium.id]) : cloneStadium(game.stadium)
  }));
}

function normalizeData(input: PlannerData): PlannerData {
  const stadiums = input.stadiums.map(cloneStadium);
  return {
    leagues: input.leagues.map(cloneLeague),
    stadiums,
    games: syncGamesWithStadiums(input.games, stadiums)
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
