import React,{useState, useEffect} from "react";
import { Text, View, Pressable} from "react-native";
import styles from '../style/style';
import Entypo from '@expo/vector-icons/Entypo';


const START = 'plus';
const CROSS = 'cross';
const CIRCLE = 'circle';

const SHIP_AMOUNT = 3;
const BOMB_AMOUNT = 15;
const BOARDSIZE = 25;
const initialBoard = Array(BOARDSIZE).fill(null).map((_, i) => ({id: i, ship: false, bombed: false}));
export default function GameBoard() {
  const [board, setBoard] = useState(initialBoard);
  const [hit, setHits] = useState(0);
  const [ships, setShips] = useState(0);
  const [bombs, setBombs] = useState(0);
  const [time, setTime] = useState(0);
  const [status, setStatus] = useState('Game has not started');
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if(gameStarted){
      const id = window.setInterval(()=> {
        setTime(time => time-1);
      }, 1000);
      return () => window.clearInterval(id);
    }
  }, [gameStarted])

  useEffect(() => {
    console.log(time)
    if(time <= 0){
      gameOver('time');
    }
  }, [time])

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
  }


  function resetGame(){
    hideShips();
    setShips(SHIP_AMOUNT);
    setBombs(BOMB_AMOUNT);
    setBoard(Array(BOARDSIZE).fill(null).map((_, i) => ({id: i, ship: false, bombed: false})));
    setStatus('Click the start button first...');
    setGameStarted(true);
    setTime(30);
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

  function gameOver(result){
    setGameStarted(false);
    if(result === 'win'){
      setStatus("You sinked all ships.");
    } else if(result === 'time'){
      setStatus("Timeout. Ships remaining");
    } else {
      setStatus("Game over. Ships remaining");
    }
  }

  function drawItem(number){
    if(board[number].bombed === false && gameStarted) {
      setStatus('Game is on...');
      board[number].bombed = true;
      setBombs(bombs - 1);
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
    }
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
