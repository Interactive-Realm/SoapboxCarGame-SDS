import HighscoreItem from './HighscoreElement';
import dbUtility from '../Database/dbUtility';

type Props = {
  highscores: UserHighscore[];
};

type UserHighscore = {
    name: string;
    email: string;
    score: string;
  };

  const HighscoreList = ({ highscores }: Props) => {
    dbUtility.GetHighscore().then((value) => {
      console.log(value.length); 
      highscores = value;
      for (var i = 0; i < 10; i++){
        
      }
     }).catch((reason) =>{
       // Error Solution
 
     });
  return (
    <ul>
      {highscores.map((item, i) => (
        <HighscoreItem key={item.email} rank={i + 1} highscore={item} />
      ))}
    </ul>
  );
};

export default HighscoreList;