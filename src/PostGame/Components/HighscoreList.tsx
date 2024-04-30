import { useContext } from 'react';
import HighscoreItem from './HighscoreElement';
import dbUtility from '../Database/dbUtility';
import { UserHighscoreNumber } from '../types';
import { UserContext } from '../../UserContext';

type Props = {
  highscores: UserHighscoreNumber[];
};



  const HighscoreList = ({ highscores }: Props) => {
    const userInfo = useContext(UserContext)

  return (
    <div id="highscore">
      <div id="titlecontainer">
                <h2 id="subtitle">
                    SOAPBOX SHOWDOWN
                </h2>

                <p>Your Score</p>
                <h2 id="subtitle">{userInfo.score}</h2>

                <h1 id="title">
                    Leaderboard
                </h1>

            </div>
    <ul id="highscore_list">
      {highscores.map((item, i) => (
        i == 2 ? (
        <div id="highscore_element3"><HighscoreItem key={item.phonenumber} rank={i + 1} highscore={item} />
        <hr id="line_top3"></hr>
        </div>
        ) : (
          <div id="highscore_element3"><HighscoreItem key={item.phonenumber} rank={i + 1} highscore={item} />
          </div>)

      ))}
    </ul>

    
    </div>
  );
};

export default HighscoreList;