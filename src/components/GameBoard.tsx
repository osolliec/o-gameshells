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
};

/**
 * Gameboard
 */
const GameBoard = ({ shellCount, ballIndex, playing }: GameBoardProps) => {
  console.log(ballIndex);
  return (
    <Container>
      {Array.from(Array(shellCount).keys()).map((k) => {
        //console.log('abc ' + k);
        //console.log(k);
        if (k === ballIndex) {
          console.log('ballIndex' + k);
        }
        return <Shell key={k} containsBall={k === ballIndex} slideDown={playing}></Shell>;
      })}
    </Container>
  );
};

export default GameBoard;
