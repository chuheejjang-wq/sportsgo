import { Game } from '../types';
import { j1Games } from './j1';
import { j2Games } from './j2';
import { kboGames } from './kbo';
import { kleague1Games } from './kleague1';
import { kleague2Games } from './kleague2';
import { npbGames } from './npb';

export const games: Game[] = [...kboGames, ...kleague1Games, ...kleague2Games, ...npbGames, ...j1Games, ...j2Games];
