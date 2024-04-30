import { UserHighscore, UserHighscoreNumber } from "../types";

type Props = {
    rank: number;
    highscore: UserHighscoreNumber;
};

function formatScore(score: string, length: number = 4): string {
    return String(score).padStart(length, "0");
}

const HighscoreItem = ({ rank, highscore }: Props) => {
    return (
        <li id="highscore_element">
            <span id="highscore_element2">
                <span id="hsrank">{rank} </span>
                <span id="hsname">{highscore.name} </span>
                <span id="hsscore">{formatScore(highscore.score)}</span>
            </span>
        </li>
    );
};

export default HighscoreItem;
