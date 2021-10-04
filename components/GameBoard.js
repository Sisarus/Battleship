import React,{useState} from "react";
import { Text, View, Pressable} from "react-native";
import styles from '../style/style';
import Entypo from '@expo/vector-icons/Entypo';


const START = 'plus';
const CROSS = 'cross';
const CIRCLE = 'circle';

const SHIP_AMOUNT = 3;
const BOMB_AMOUNT = 15;
const BOARDSIZE = 25;
let initialBoard = Array(BOARDSIZE).fill(null).map((_, i) => ({id: i+1, ship: false, bombed: false}));
export default function GameBoard() {
  const [board, setBoard] = useState(initialBoard);
  const [hit, setHits] = useState(0);
  const [ships, setShips] = useState(0);
  const [bombs, setBombs] = useState(0);
  const [time, setTime] = useState(0);
  const [status, setStatus] = useState('Game has not started');
  const [gameStarted, setGameStarted] = useState(false);

  function hideShips(){
    let shipPlaced = 0;
    while(shipPlaced <= SHIP_AMOUNT){
      let randomNumber = Math.floor(Math.random() * BOARDSIZE);
      for(let i = 0; i < board.length; i++){
        if(board[i].id === randomNumber){
          console.log(randomNumber);
          board[i].ship = true;
          shipPlaced += shipPlaced + 1;
        }
      }
    }
    console.log(shipPlaced)
    console.log(board)
    let count = 0;
    let vaarat = 0;
    for(let i = 0; i < board.length; i++){
      console.log("Laivat " + board[i].ship)
      if(board[i].ship){
        count += count + 1;
      } else {
        console.log("False arvoja " + vaarat)
        vaarat += vaarat + 1;
      }
    }
    console.log("True arvoja " + count)
    console.log("False arvoja " + vaarat)
  }

  function resetGame(){
    setBoard(Array(BOARDSIZE).fill(null).map((_, i) => ({id: i+1, ship: false, bombed: false})));
    hideShips();
    setGameStarted(true);
  }

  function chooseItemColor(number){
    if(board[number].bombed && board[number].ship) {
      return "#FF3031";
    }
    else if(board[number].bombed){
      return '#45CE30';
    }
    else{
      return '#74B9FF';
    }
  }
  function showSea(number){
    if(board[number].ship){
      return CIRCLE;
    } else if(board[number].bombed){
      return CROSS;
    } else{
      return START;
    }
  }

  function drawItem(number){
    if(board[number].bombed === false && gameStarted) {
      board[number].bombed = true;
      if(bombs === BOMB_AMOUNT){
        setStatus("jee");
      } else if(board.indexOf(START) === -1){
        setStatus('No winner');
      }
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
            name={showSea(x * NBR_OF_COLS + y)}
            size={32}
            color={chooseItemColor(x * NBR_OF_COLS + y)}/> 

        </Pressable>
      );
    }//rivit
    let row = <View key={"row" + x}>{cols.map((item) => item)}</View>
    items.push(row);
  }

  return(
    <View style={styles.gameboard}>
      <View style={styles.flex}>{items}</View>
      <Pressable style={styles.button} onPress={() => resetGame()}>
        <Text style={styles.buttonText}>Start game</Text>
      </Pressable>
      <Text style={styles.gameinfo}>Hits: {hit} Bombs: {bombs} Ships: {ships}</Text>
      <Text style={styles.gameinfo}>Time: {time} sec</Text>
      <Text style={styles.gameinfo}>Status: {status}</Text>
    </View>
  )
}
