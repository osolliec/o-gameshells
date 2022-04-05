import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { shuffleArray } from '../utils';
import Shell from './Shell';

type GameBoardProps = {
  shellCount: number;
  ballIndex: number;
  playing: boolean;
  onShellClicked: (shellIndex: number) => void;
};

const timers = {
  switchAnimationTotalTime: 600,
  // switchAnimationStepTime time must be a divider of switchAnimationTotalTime !
  switchAnimationStepTime: 25,
  switchAnimationStartDelay: 1100,
  switchAnimationStepDelay: 700,
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
    totalTime = totalTime - timers.switchAnimationStepTime;
    if (totalTime === 0) {
      clearInterval(interval);
      // force set the element completely at destination
      percentageFromSource = 0;
    }

    // at percentageFromSource = 1, left is at margin + fromX
    // at percentageFromSource = 0, left is at margin + toX
    element.style.left = pixels.leftMargin + toX + percentageFromSource * (fromX - toX) + 'px';
  }, timers.switchAnimationStepTime);
};

/**
 * Gameboard
 */
const GameBoard = ({ shellCount, ballIndex, playing, onShellClicked }: GameBoardProps) => {
  const shells = useRef<Array<HTMLDivElement>>([]);

  useEffect(() => {
    if (!playing) {
      return;
    }
    if (!shells.current) {
      return;
    }

    let source = [...Array(shellCount).keys()];

    let shuffleCount = 0;
    const recursiveShuffleTimeout = () => {
      setTimeout(() => {
        if (shuffleCount === totalShuffleCount) {
          return;
        }
        const destination = shuffleArray([...Array(shellCount).keys()]);
        source.forEach((idx) => {
          slowlySwitchPosition(shells.current[idx], source[idx] * pixels.xSpacing, destination[idx] * pixels.xSpacing);
        });
        source = destination;
        shuffleCount++;
        recursiveShuffleTimeout();
      }, timers.switchAnimationStepDelay);
    };

    // delay the first animation
    setTimeout(() => {
      recursiveShuffleTimeout();
    }, timers.switchAnimationStartDelay);
  }, [playing]);

  return (
    <Container>
      {[...Array(shellCount).keys()].map((k) => {
        return (
          <div
            style={{ left: pixels.leftMargin + k * pixels.xSpacing + 'px', top: 0, position: 'absolute' }}
            key={k}
            ref={(ref) => {
              if (ref) {
                shells.current[k] = ref;
              }
            }}
          >
            <Shell
              containsBall={k === ballIndex}
              startAnimation={playing}
              clickable={playing}
              clicked={true}
              onClick={() => onShellClicked(k)}
            />
          </div>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

export default GameBoard;
