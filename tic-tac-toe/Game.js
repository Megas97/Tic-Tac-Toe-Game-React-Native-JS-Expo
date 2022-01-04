import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, Image } from 'react-native';

export default function Game() {
  const [activePlayer, setActivePlayer] = useState('X');
  const [status, setStatus] = useState('Player ' + activePlayer + '\'s turn');
  const [gameOutcome, setGameOutcome] = useState('play');
  const [winnerSquares, setWinnerSquares] = useState([]);
  const [markers, setMarkers] = useState([
    null, null, null,
    null, null, null,
    null, null, null
  ]);
  const [history, setHistory] = useState({
    squares: [
      null, null, null,
      null, null, null,
      null, null, null
    ],
    currentIndex: [
      null, null, null,
      null, null, null,
      null, null, null
    ],
  });
  const [stepNumber, setStepNumber] = useState(0);
  const rowCol = {
      0: '1, 1',
      1: '2, 1',
      2: '3, 1',
      3: '1, 2',
      4: '2, 2',
      5: '3, 2',
      6: '1, 3',
      7: '2, 3',
      8: '3, 3',
  };
  const [currentMove, setCurrentMove] = useState(null);
  const [historyOrder, setHistoryOrder] = useState('asc');

  const markPosition = (position) => {
    if (calculateWinner(markers) || markers[position]) {
        return;
    }
    if (!markers[position]) {
      let temp = [...markers];
      temp[position] = activePlayer;
      setMarkers(temp);
      activePlayer === 'X' ? setActivePlayer('O') : setActivePlayer('X');
      let tempHistory = history.squares.slice(0, stepNumber);
      tempHistory[stepNumber] = temp;
      let tempCurrentPosition = history.currentIndex;
      tempCurrentPosition[stepNumber] = position;
      setHistory({
        squares: tempHistory,
        currentIndex: tempCurrentPosition,
      });
      setStepNumber(tempHistory.length);
      setCurrentMove(null);
    }
  }

  const resetMarkers = (keepHistory, buttonName) => {
    setMarkers([
      null, null, null,
      null, null, null,
      null, null, null
    ]);
    setActivePlayer('X');
    setWinnerSquares([]);
    if (!keepHistory) {
      setHistory({
        squares: [
          null, null, null,
          null, null, null,
          null, null, null
        ],
        currentIndex: [
          null, null, null,
          null, null, null,
          null, null, null
        ],
      });
      setHistoryOrder('asc');
    }
    setStepNumber(0);
    buttonName === 'resetGame' ? setCurrentMove(null) : setCurrentMove(-1);
  }

  const reorderHistory = () => {
    historyOrder === 'asc' ? setHistoryOrder('desc') : setHistoryOrder('asc');
  }

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinnerSquares(lines[i]);
        return squares[a];
      }
    }
    let allFull = squares.every(function(e) {
      return e !== null;
    });
    if (allFull) {
        return 'T';
    }
    return null;
  }

  useEffect(() => {
    const winner = calculateWinner(markers);
    if (winner === 'X' || winner === 'O') {
      setStatus('Winner: ' + winner);
      setGameOutcome('won');
    } else if (winner === 'T') {
      setStatus('Draw');
      setGameOutcome('draw');
    } else if (winner === null) {
      setStatus('Player ' + activePlayer + '\'s turn');
      setGameOutcome('play');
    }
  }, [markers])

  const jumpTo = (position) => {
    if (position !== history.squares.length - 1) {
      setWinnerSquares([]);
    }
    setStepNumber(position + 1);
    let prevX = (position % 2) === 0;
    prevX === true ? setActivePlayer('O') : setActivePlayer('X');
    let temp = history.squares[position];
    setMarkers(temp);
    setCurrentMove(position);
  }

  let squares = [];
  for (let i = 0; i < 9; i++) {
    squares[i] = 
      <Pressable key={'cell-' + i} onPress={() => markPosition(i)} style={[styles.cell, {backgroundColor: gameOutcome === 'draw' ? 'lightyellow' : winnerSquares.includes(i) ? 'lightgreen' : 'white'}]}>
        {markers[i] === 'X' && <Image source={require('./assets/img/cross.png')} style={styles.icon}></Image>}
        {markers[i] === 'O' && <Image source={require('./assets/img/zero.png')} style={styles.icon}></Image>}
      </Pressable>
    ;
  }

  let historyButtons = [];
  for (let i = 0; i < history.squares.length; i++) {
    if (history.squares[i] !== null) {
      let title = "Go to move #" + (i+1) + ' (' + rowCol[history.currentIndex[i]] + ')';
      historyButtons[i] = <Pressable key={'history-' + i} onPress={() => jumpTo(i)} style={styles.button}><Text style={[styles.buttonTitle, {fontWeight: currentMove === null ? 'normal' : currentMove === i ? 'bold' : 'normal'}]}>{title}</Text></Pressable>;
    }
  }

  if (historyOrder === 'desc') {
    historyButtons.reverse();
  }
  
  let goToGameStartButton = <Pressable key='history-start' onPress={() => resetMarkers(true, 'goToGameStart')} style={styles.button}><Text style={[styles.buttonTitle, {fontWeight: currentMove === null ? 'normal' : currentMove === -1 ? 'bold' : 'normal'}]}>Go to game start</Text></Pressable>;
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <View style={styles.playerInfo}>
          <Text style={styles.playerText}>{status}</Text>
        </View>
        <View style={styles.boardContainer}>
          {squares}
        </View>
        <Pressable style={styles.replayButton} onPress={() => resetMarkers(false, 'resetGame')}>
          <Image source={require('./assets/img/replay.png')} style={styles.replayIcon}/>
        </Pressable>
        <View style={styles.historyContainer}>
          <Pressable key='history-reorder' onPress={() => reorderHistory()} style={styles.button}><Text style={styles.buttonTitle}>Toggle order</Text></Pressable>
          {historyOrder === 'asc' ? goToGameStartButton : <Text></Text>}
          {historyButtons}
          {historyOrder === 'desc' ? goToGameStartButton : <Text></Text>}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -536
  },

  body: {
    width: 312,
    maxHeight: 400,
    backgroundColor: '#FFFFFF'
  },

  playerInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 20,
    marginTop: 28
  },

  playerText: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: -8
  },

  boardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },

  cell: {
    width: 100,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#999999',
    backgroundColor: 'white'
  },

  icon: {
    width: 70,
    height: 70
  },

  replayButton: {
    marginLeft: 134,
    marginTop: 6,
    marginBottom: 6
  },

  replayIcon: {
    width: 40,
    height: 40
  },

  historyContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },

  button: {
    padding: 10,
    marginBottom: 2,
    backgroundColor: 'grey',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonTitle: {
    color: 'white',
    MozUserSelect: "none",
    WebkitUserSelect: "none",
    msUserSelect: "none"
  }
});