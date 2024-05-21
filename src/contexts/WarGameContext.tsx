import { createContext, useState, useEffect } from 'react';
import { fetchDeck, drawnCardsByDeckId, reshuffleDeck, returnCardsToDeck } from '../services/APIDeckService';
import { Card, Deck, GameState, GameStateEnum } from '../interfaces';


const initialState:GameState = {
    deck: null,
    player1Cards: [],
    player2Cards: [],
    player1Card: null,
    player2Card: null,
    gameLog: [],
    gameState:GameStateEnum.notStarted,
    winner:'',
    startGame: () => {},
    drawCards: () => {},
  };

const WarGameContext = createContext(initialState);

const GameProvider = ({ children }:any) => {
  const [_deck, setDeck] = useState<Deck | null>(null);
  const [player1Cards, setPlayer1Cards] = useState<Card[]>([]);
  const [player2Cards, setPlayer2Cards] = useState<Card[]>([]);
  const [player1Card, setPlayer1Card] = useState<any>(null);
  const [player2Card, setPlayer2Card] = useState<any>(null);
  const [winner,setWinner] = useState('');
  const [gameLog, setGameLog] = useState<any>([]);
  const [gameState, setGameState] = useState<GameStateEnum>(GameStateEnum.notStarted);


  useEffect(() => {
    const createDeck = async ()=>{
        const newDeck:Deck = await fetchDeck();
        setDeck(newDeck);
        setPlayer1Cards([]);
        setPlayer2Cards([]);
        setGameLog([]);
        setPlayer1Card(newDeck.cards[0]);
        setPlayer2Card(newDeck.cards[1]);
        resolveRound(newDeck.cards[0],newDeck.cards[1])
    }
    if (gameState === GameStateEnum.inProgress) {
        createDeck();
        setGameLog([]);
        console.log('here')
    }
   
  }, [gameState]);

  const startGame = () => {
    setGameState(GameStateEnum.inProgress);
    setGameLog([]);
    setWinner('');
    
  };


  const drawCards = async () => {
    
    const currentCards:any = await  drawnCardsByDeckId(_deck?.deckId);
    if (currentCards.cards.length==0) {
      endGame();
      return;
    }
    const card1 = currentCards.cards[0];
    const card2 = currentCards.cards[1];
    setDeck(currentCards);
    setPlayer1Card(card1);
    setPlayer2Card(card2);
    resolveRound(card1, card2);
  };

  
  const returnCards = async(card1:string,card2:string)=>{
    if(!_deck){
        return false;
    }
    const returnToDeck = await returnCardsToDeck(_deck.deckId,[card1,card2]);
    const reshuffled:any = await reshuffleDeck(_deck.deckId);
    console.log(reshuffled)
    const reFetchDeck = await drawnCardsByDeckId(_deck.deckId,_deck.cards.length);
    setDeck(reFetchDeck);
    
  }

  const resolveRound = (card1:any, card2:any) => {
    const valueMap:any = {
      '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
      '8': 8, '9': 9, '10': 10, 'JACK': 11, 'QUEEN': 12, 'KING': 13, 'ACE': 14
    };
    let result = '';
    if (valueMap[card1.value] > valueMap[card2.value]) {
        setPlayer1Cards((prevCards) => [...prevCards, card1, card2]);
        result = 'Player 1 wins the round';
    } else if (valueMap[card1.value] < valueMap[card2.value]) {
        setPlayer2Cards((prevCards) => [...prevCards, card1, card2]);
        result = 'Player 2 wins the round';
    } else {
        returnCards(card1.code,card2.code);
        result = 'Round is a draw';
    }
    setGameLog([...gameLog, result]);
    if (_deck?.cards.length === 0) {
      endGame();
    }
  };

  const endGame = () => {
    let finalResult = '';
    if (player1Cards.length > player2Cards.length) {
      finalResult = 'Player 1 wins the game!';
      setWinner('player1')
    } else if (player2Cards.length > player1Cards.length) {
      finalResult = 'Player 2 wins the game!';
      setWinner('player2')
    } else {
      finalResult = 'The game is a draw!';
      setWinner('draw')
    }
    setGameLog((prevLog:any) => [...prevLog, finalResult]);
    setGameState(GameStateEnum.finished);
  };



  return (
    <WarGameContext.Provider
      value={{
        deck: _deck,
        player1Cards,
        player2Cards,
        player1Card,
        player2Card,
        gameLog,
        gameState,
        winner,
        startGame,
        drawCards,
      }}
    >
      {children}
    </WarGameContext.Provider>
  );
};

export { WarGameContext as GameContext, GameProvider };
