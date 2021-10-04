import React,{useState} from "react";
import { Text, View, Pressable} from "react-native";
import styles from '../style/style';
import Entypo from '@expo/vector-icons/Entypo';


const START = 'plus';
const CROSS = 'cross';
const CIRCLE = 'circle';

const BOARDSIZE = 25;
let initialBoard = Array(BOARDSIZE).fill({symbol: START, ship: false}).map((sea) => sea);
export default function GameBoard() {
  const [board, setBoard] = useState(initialBoard);
  const [hit, setHits] = useState(0);
  const [ships, setShips] = useState(0);
  const [bombs, setBombs] = useState(0);
  const [time, setTime] = useState(0);
  const [status, setStatus] = useState('Game has not started');
  const [gameStarted, setGameStarted] = useState(false);

  function chooseItemColor(number){
    if(board[number] === CROSS) {
      return "#FF3031";
    }
    else if(board[number] === CIRCLE){
      return '#45CE30';
    }
    else{
      return '#74B9FF';
    }
  }

  const NBR_OF_ROWS = initialBoard.length/5;
  const NBR_OF_COLS = initialBoard.length/5;
  const items = [];

  for(let x = 0; x < NBR_OF_ROWS; x++) {
    const cols = [];
    for(let y = 0; y < NBR_OF_COLS; y++){
      cols.push(
        <Pressable
          key={x * NBR_OF_COLS + y}
          style={styles.item}
          onPress={()=> drawItem(x * NBR_OF_COLS + y)}
        >
          <Entypo
            key={x * NBR_OF_COLS + y}
            name={board[x * NBR_OF_COLS + y].symbol}
            size={32}
            color={chooseItemColor(x * NBR_OF_COLS + y)}/> 

        </Pressable>
      );
    console.log(x * NBR_OF_COLS + y)
    }//rivit
    let row = <View key={"row" + x}>{cols.map((item) => item)}</View>
    items.push(row);
    console.log(board)
  }

  return(
    <View style={styles.gameboard}>
      <View style={styles.flex}>{items}</View>
      <Pressable style={styles.button} >
        <Text style={styles.buttonText}>Start game</Text>
      </Pressable>
      <Text style={styles.gameinfo}>Hits: {hit} Bombs: {bombs} Ships: {ships}</Text>
      <Text style={styles.gameinfo}>Time: {time} sec</Text>
      <Text style={styles.gameinfo}>Status: {status}</Text>
    </View>
  )
}
