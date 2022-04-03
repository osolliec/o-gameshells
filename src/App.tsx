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
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 500px;
  height: 500px;
  background: #96c8a2;

  margin: 0 auto 0 auto;
  border-radius: 5px;
`;

const Row = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const App = () => {
  const shellCount = 3;
  const [ballIndex, setBallIndex] = useState(0);
  const [playCount, setPlaycount] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    // assign a random number between 0 and shellCount
    const randomIdx = Math.floor(Math.random() * shellCount);
    setBallIndex(randomIdx);
  }, [playCount]);

  return (
    <AppContainer>
      <GameBoard shellCount={3} ballIndex={ballIndex} playing={playing} />
      <Row>
        <ClickableCard
          onClick={() => {
            setPlaying(!playing);
            setPlaycount(playCount + 1);
          }}
        >
          {playCount === 0 ? 'Start' : 'Play Again'}
        </ClickableCard>
      </Row>
    </AppContainer>
  );
};

export default App;
