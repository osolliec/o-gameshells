import { useEffect, useState } from 'react';
import styled from 'styled-components';

import GameBoard from './components/GameBoard';

const ClickableCard = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  text-align: center;

  cursor: pointer;

  :hover {
    background-color: aliceblue;
  }

  width: 20%;
  margin-left: 15px;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;

  //width: 500px;
  margin: 0 5% 0 5%;
  height: 500px;
  background: #96c8a2;

  //margin: 0 auto 0 auto;
  border-radius: 5px;
`;

const Row = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

type GameState = 'chose-difficulty' | 'view-ball' | 'playing';

type Difficulty = 'easy' | 'medium' | 'hard';

const difficultyText = new Map<Difficulty, string>([
  ['easy', 'Two shells.'],
  ['medium', 'Three shells.'],
  ['hard', 'Five shells !'],
]);

const difficulties = ['easy', 'medium', 'hard'] as Array<Difficulty>;

const App = () => {
  const [shellCount, setShellCount] = useState(0);
  const [ballIndex, setBallIndex] = useState(0);
  const [gameState, setGameState] = useState('chose-difficulty' as GameState);
  console.log(gameState);

  useEffect(() => {
    // assign a random number between 0 and shellCount
    if (gameState === 'view-ball') {
      const randomIdx = Math.floor(Math.random() * shellCount);
      setBallIndex(randomIdx);
    }
  }, [gameState]);

  const setDifficulty = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'easy':
        setShellCount(2);
        break;
      case 'hard':
        setShellCount(5);
        break;
      case 'medium':
        setShellCount(3);
      default:
        break;
    }

    setGameState('view-ball');
  };

  return (
    <AppContainer>
      {(gameState === 'playing' || gameState === 'view-ball') && (
        <GameBoard shellCount={shellCount} ballIndex={ballIndex} playing={gameState === 'playing'} />
      )}
      {gameState === 'chose-difficulty' && (
        <Row>
          {difficulties.map((difficulty) => {
            return (
              <ClickableCard
                key={difficulty}
                onClick={() => {
                  setDifficulty(difficulty);
                }}
              >
                <p>{difficulty}</p>
                <p>{difficultyText.get(difficulty)}</p>
              </ClickableCard>
            );
          })}
        </Row>
      )}
      {gameState === 'view-ball' && (
        <Row>
          <ClickableCard
            onClick={() => {
              setGameState('playing');
              //setPlaying(true);
            }}
          >
            GO
          </ClickableCard>
        </Row>
      )}
      {gameState === 'playing' && (
        <Row>
          {/* <ClickableCard
            onClick={() => {
              setGameState('start');
            }}
          >
            Restart !
          </ClickableCard> */}
        </Row>
      )}
    </AppContainer>
  );
};

export default App;
