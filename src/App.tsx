import { useEffect, useState } from 'react';
import styled from 'styled-components';

import GameBoard from './components/GameBoard';

type GameState = 'chose-difficulty' | 'view-ball' | 'shuffling' | 'awaiting-input' | 'success' | 'failure';

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
  ['shuffling', 'Please wait while I shuffle the shells.'],
  ['awaiting-input', 'Click on the shell you think contains the ball.'],
  ['success', 'Congratulations ! YOU WON !'],
  ['failure', 'Sorry, you lost. Better luck next time !'],
]);

/**
 * App is the application entry point where the game is controlled:
 * - Pilot game state changes
 * - Show the different difficulty choices
 * - Show the top row text to help the user
 * @returns
 */
const App = () => {
  const [shellCount, setShellCount] = useState(0);
  const [ballIndex, setBallIndex] = useState(0);
  const [gameState, setGameState] = useState('chose-difficulty' as GameState);

  useEffect(() => {
    if (gameState === 'view-ball') {
      // assign a random number between 0 and shellCount - 1
      setBallIndex(Math.floor(Math.random() * shellCount));
    }
  }, [gameState, shellCount]);

  const setDifficulty = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'easy':
        setShellCount(2);
        break;
      case 'hard':
        setShellCount(5);
        break;
      case 'medium':
      default:
        setShellCount(3);
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
        {['view-ball', 'shuffling', 'awaiting-input', 'success', 'failure'].includes(gameState) && (
          <GameBoard
            shellCount={shellCount}
            ballIndex={ballIndex}
            shuffling={gameState !== 'view-ball'}
            awaitingInput={gameState === 'awaiting-input'}
            gameOver={gameState === 'success' || gameState === 'failure'}
            onShellClicked={checkSuccess}
            onShufflingDone={() => {
              setGameState('awaiting-input');
            }}
          />
        )}
      </BoardContainer>

      {gameState === 'chose-difficulty' && (
        <Row>
          {difficulties.map((difficulty) => (
            <ClickableCard
              key={difficulty}
              onClick={() => {
                setDifficulty(difficulty);
              }}
            >
              {difficultyText.get(difficulty)}
            </ClickableCard>
          ))}
        </Row>
      )}
      {gameState === 'view-ball' && (
        <Row>
          <ClickableCard
            onClick={() => {
              setGameState('shuffling');
            }}
          >
            GO
          </ClickableCard>
        </Row>
      )}
      {(gameState === 'success' || gameState === 'failure') && (
        <Row>
          <ClickableCard
            onClick={() => {
              setGameState('view-ball');
            }}
          >
            Play again !
          </ClickableCard>
        </Row>
      )}
    </AppContainer>
  );
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0 5% 0 5%;
  height: 500px;
  background: #96c8a2;

  border-radius: 5px;
`;

const TopRow = styled.div`
  font-size: larger;
  font-weight: 800;

  margin: 50px auto 50px auto;

  padding: 5px 10px;

  background-color: aquamarine;
  border-radius: 5px;
`;

const Row = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const BoardContainer = styled.div`
  height: 180px;
`;

const ClickableCard = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;

  :hover {
    background-color: aliceblue;
  }

  margin: 0 10px;
  padding: 5px 10px;
`;

export default App;
