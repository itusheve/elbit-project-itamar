const API_URL = 'https://deckofcardsapi.com/api'
export const fetchDeck:any = async () => {
    try {
        const response = await fetch(`${API_URL}/deck/new/shuffle/?deck_count=1`);
        const data = await response.json();
        const deckId = data.deck_id;

        const cardsDeck = await drawnCardsByDeckId(deckId);
        return cardsDeck;
    } catch (error) {
        console.error('Error fetching deck of cards:', error);
        return null;
    }


};

export const drawnCardsByDeckId = async (deckId: any,count:number=2)=>{
    try{
        const drawResponse = await fetch(`${API_URL}/deck/${deckId}/draw/?count=${count}`);
        const drawData = await drawResponse.json();
        const cardsDeck = { cards: drawData.cards, deckId: deckId };
        return cardsDeck;
    }
    catch (error) {
        console.error('Error fetching deck of cards:', error);
        return null;
    }
   
}
export const reshuffleDeck = async (deck_id: string) => {
    try {
        const response = await fetch(`${API_URL}/deck/${deck_id}/shuffle/?remaining=true`);
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error)
    }
}

export const returnCardsToDeck = async (deck_id: string, cards: Array<string>) => {
    try {
        const response = await fetch(`${API_URL}/deck/${deck_id}/return/?cards=${cards.toString()}`)
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
