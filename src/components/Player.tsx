
import { Card } from "../interfaces"
interface PlayerProps {
    card: Card
    name: string;
    winner:boolean;
}

export const Player = ({ card, name,winner }: PlayerProps) => {
    return (<div className={winner?'winner-class':''}>
        <h2>{name} {winner ? 'is the WINNER!!!':''}</h2>
        <img src={card.image} />
    </div>);
}