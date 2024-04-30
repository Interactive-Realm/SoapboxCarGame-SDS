import HighscoreItem from './HighscoreElement';
import dbUtility from '../Database/dbUtility';
import { UserHighscoreNumber } from '../types';

type Props = {
  highscores: UserHighscoreNumber[];
};



  const HighscoreList = ({ highscores }: Props) => {
    // dbUtility.GetHighscore().then((value) => {
    //   console.log(value.length); 
    //   highscores = value;
    //   for (var i = 0; i < 10; i++){
        
    //   }
    //  }).catch((reason) =>{
    //    // Error Solution
 
    //  });
  return (
    <div>

    <ul>
      {highscores.map((item, i) => (
        <HighscoreItem key={item.phonenumber} rank={i + 1} highscore={item} />
      ))}
    </ul>
    </div>
  );
};

export default HighscoreList;