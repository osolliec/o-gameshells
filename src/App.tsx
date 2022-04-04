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

  margin-left: 15px;
  padding: 5px 10px;
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

const TopRow = styled.div`
  display: flex;
  flex-direction: row;

  font-size: larger;
  font-weight: 800;

  margin: 50px auto 50px auto;

  padding: 5px 10px;
  justify-content: center;

  background-color: aquamarine;
  border-radius: 5px;
`;

const BoardContainer = styled.div`
  height: 180px;
`;

type GameState = 'chose-difficulty' | 'view-ball' | 'playing' | 'success' | 'failure';

type Difficulty = 'easy' | 'medium' | 'hard';

const difficulties = ['easy', 'medium', 'hard'] as Array<Difficulty>;

const difficultyText = new Map<Difficulty, string>([
  ['easy', 'Two shells.'],
  ['medium', 'Three shells.'],
  ['hard', 'Five shells !'],
]);

const topRowText = new Map<GameState, string>([
  ['chose-difficulty', 'Pick a difficulty.'],
  ['view-ball', 'Click GO once you are ready ! No going back !!'],
  ['playing', 'Click on the shell you think contains the pearl.'],
  ['success', 'Congratulations ! YOU WON !'],
  ['failure', 'Sorry, you lost. Better luck next time !'],
]);

const App = () => {
  const [shellCount, setShellCount] = useState(0);
  const [ballIndex, setBallIndex] = useState(0);
  const [gameState, setGameState] = useState('chose-difficulty' as GameState);
  console.log(gameState);

  useEffect(() => {
    if (gameState === 'view-ball') {
      // assign a random number between 0 and shellCount
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

  const checkSuccess = (index: number) => {
    if (index === ballIndex) {
      setGameState('success');
      return;
    }
    setGameState('failure');
  };

  return (
    <AppContainer>
      <TopRow>{topRowText.get(gameState)}</TopRow>
      <BoardContainer>
        {(gameState === 'playing' || gameState === 'view-ball') && (
          <GameBoard
            shellCount={shellCount}
            ballIndex={ballIndex}
            playing={gameState === 'playing'}
            onShellClicked={checkSuccess}
          />
        )}
      </BoardContainer>

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
                {difficultyText.get(difficulty)}
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
            }}
          >
            GO
          </ClickableCard>
        </Row>
      )}
      {gameState === 'success' ||
        (gameState === 'failure' && (
          <Row>
            <ClickableCard
              onClick={() => {
                setGameState('view-ball');
              }}
            >
              Play again !
            </ClickableCard>
          </Row>
        ))}
    </AppContainer>
  );
};

export default App;
