import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { shuffleArray } from '../utils';
import Shell from './Shell';

type GameBoardProps = {
  shellCount: number;
  ballIndex: number;
  // true to start the shuffling animations. false to reset to the original state.
  shuffling: boolean;
  awaitingInput: boolean;
  gameOver: boolean;
  onShellClicked: (idx: number) => void;
  onShufflingDone: () => void;
};

const timers = {
  switchAnimationTotalTime: 600,
  // switchAnimationStepTime time must be a divider of switchAnimationTotalTime !
  switchAnimationStepTime: 20,
  switchAnimationStartDelay: 1100,
  switchAnimationIntervalDelay: 700,
};

const pixels = {
  leftMargin: 80,
  xSpacing: 160,
};

const totalShuffleCount = 4;

const slowlySwitchPosition = (element: HTMLDivElement, fromX: number, toX: number) => {
  let totalTime = timers.switchAnimationTotalTime;

  const interval = setInterval(() => {
    // a number between [1,0], decreasing over interval iterations
    let percentageFromSource = totalTime / timers.switchAnimationTotalTime;
    totalTime -= timers.switchAnimationStepTime;
    if (totalTime === 0) {
      clearInterval(interval);
      // force set the element completely at destination
      percentageFromSource = 0;
    }

    // at percentageFromSource = 1, left is at margin + fromX
    // at percentageFromSource = 0, left is at margin + toX
    /* eslint-disable no-param-reassign */
    element.style.left = `${pixels.leftMargin + toX + percentageFromSource * (fromX - toX)}px`;
  }, timers.switchAnimationStepTime);
};

/**
 * Gameboard controls the movements of the individual shells.
 */
const GameBoard = ({
  shellCount,
  ballIndex,
  shuffling,
  awaitingInput,
  gameOver,
  onShellClicked,
  onShufflingDone,
}: GameBoardProps) => {
  const shells = useRef<Array<HTMLDivElement>>([]);

  useEffect(() => {
    if (!shuffling) {
      return;
    }
    if (!shells.current) {
      return;
    }

    let source = [...Array(shellCount).keys()];
    let shuffleCount = 0;

    // delay the first animation to wait for the cup slide down animation
    setTimeout(() => {
      // an interval that will trigger `totalShuffleCount` shuffle animations.
      const interval = setInterval(() => {
        if (shuffleCount === totalShuffleCount) {
          clearInterval(interval);
          onShufflingDone();
          return;
        }
        // randomly chose the destination
        const destination = shuffleArray([...Array(shellCount).keys()]);
        source.forEach((idx) => {
          // move the element from source to destination
          slowlySwitchPosition(shells.current[idx], source[idx] * pixels.xSpacing, destination[idx] * pixels.xSpacing);
        });
        // overwrite the destination for next animation
        source = destination;
        shuffleCount++;
      }, timers.switchAnimationIntervalDelay);
    }, timers.switchAnimationStartDelay);
  }, [shuffling, shellCount]);

  return (
    <Container>
      {[...Array(shellCount).keys()].map((k) => (
        // surround the shell with a div to attach ref + set starting absolute style
        <div
          style={{ left: `${pixels.leftMargin + k * pixels.xSpacing}px`, top: 0, position: 'absolute' }}
          key={k}
          ref={(ref) => {
            if (ref) {
              shells.current[k] = ref;
            }
          }}
        >
          <Shell
            containsBall={k === ballIndex}
            startAnimation={shuffling}
            clickable={awaitingInput}
            clicked={gameOver}
            onClick={() => onShellClicked(k)}
          />
        </div>
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

export default GameBoard;
