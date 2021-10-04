import React from 'react';
import styles from './style/style';
import {View} from 'react-native';
import Header from './components/Header';
import Footer from './components/Footer';
import GameBoard from './components/GameBoard'

export default function App() {
  return (
    <View style={styles.container}>
      <Header/>
      <GameBoard/>
      <Footer/>
    </View>
  );
}