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
  const [hits, setHits] = useState(0);
  const [ships, setShips] = useState(0);
  const [bombs, setBombs] = useState(0);
  const [time, setTime] = useState(0);
  const [status, setStatus] = useState('Game has not started');
  const [buttonText, setButtonText] = useState('Start game');
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
    if(gameStarted){
      if(time <= 0){
        gameOver('time');
      }
      if(ships === 0){
        gameOver('win');
      }
      if(bombs === 0 && ships !== 0){
        gameOver('');
      }
    }
  }, [time, ships, bombs])

  function hideShips(){
    let shipPlaced = 0;
    let lista = [];
    while(shipPlaced !== SHIP_AMOUNT){
      let randomNumber = Math.floor(Math.random() * BOARDSIZE);
      if(board[randomNumber].ship === false){
        board[randomNumber].ship = true;
        shipPlaced++;
        lista.push(randomNumber)
      }
    }
    console.log(lista)
  }


  function resetGame(){
    setButtonText('New game');
    plainSea();
    setShips(SHIP_AMOUNT);
    setBombs(BOMB_AMOUNT);
    setHits(0);
    setStatus('Game is on...');
    hideShips();
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
    if(board[number].bombed && board[number].ship){
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

  function plainSea(){
    for(let i = 0; i < board.length; i++){
      board[i].bombed = false;
      board[i].ship = false;
    }
  }

  function drawItem(number){
    if(board[number].bombed === false && gameStarted) {
      board[number].bombed = true;
      setBombs(bombs - 1);
      if(board[number].ship === true){
        board[number].ship = true;
        setHits(hits +1);
        setShips(ships -1);
      }
    } else{
      setStatus('Click the start button first...');
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
        <Text style={styles.buttonText}>{buttonText}</Text>
      </Pressable>
      <Text style={styles.gameinfo}>Hits: {hits} Bombs: {bombs} Ships: {ships}</Text>
      <Text style={styles.gameinfo}>Time: {time} sec</Text>
      <Text style={styles.gameinfo}>Status: {status}</Text>
    </View>
  )
}
