import { UserHighscore } from "../types";

type Props = {
    rank: number;
    highscore: UserHighscore;
};

function formatScore(score: string, length: number = 4): string {
    return String(score).padStart(length, "0");
}

const HighscoreItem = ({ rank, highscore }: Props) => {
    return (
        <li>
            <span>
                <span>{rank} </span>
                <span>{highscore.name} </span>
            </span>
            <span>{formatScore(highscore.score)}</span>
        </li>
    );
};

export default HighscoreItem;
