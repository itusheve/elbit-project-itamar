
export interface Card {
    image: string;
    value: string;
    nValue: string;
    suit: string;
    code: string;
  }

export interface Deck{
    cards:Array<Card>;
    deckId:string;
}
  

export interface GameState {
  deck: Deck | null;
  player1Cards: Card[];
  player2Cards: Card[];
  player1Card: Card | null;
  player2Card: Card | null;
  gameLog: string[];
  gameState:GameStateEnum; // 'notStarted' | 'inProgress' | 'finished';
  startGame: () => void;
  winner:string;
  drawCards: () => void;
}
export enum GameStateEnum {
  inProgress,notStarted,finished
}