import styled from 'styled-components';
import Shell from './Shell';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  border-radius: 1%;
`;

type GameBoardProps = {
  shellCount: number;
  ballIndex: number;
  playing: boolean;
  onShellClicked: (shellIndex: number) => void;
};

/**
 * Gameboard
 */
const GameBoard = ({ shellCount, ballIndex, playing, onShellClicked }: GameBoardProps) => {
  console.log(ballIndex);
  return (
    <Container>
      {Array.from(Array(shellCount).keys()).map((k) => {
        return (
          <Shell
            key={k}
            containsBall={k === ballIndex}
            startAnimation={playing}
            clickable={playing}
            inverseShuffle={k % 2 === 1}
            onClick={() => onShellClicked(k)}
          ></Shell>
        );
      })}
    </Container>
  );
};

export default GameBoard;
