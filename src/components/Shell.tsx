import styled, { css, keyframes } from 'styled-components';

type ShellProps = {
  containsBall?: boolean;
  slideDown?: boolean;
};

/**
 * A shell is an upside down 'plastic cup'-like object, that can contain a ball.
 * @returns
 */
const Shell = ({ containsBall, slideDown }: ShellProps) => {
  return (
    <CupWithBall>
      <CupContainer slideDown={slideDown}>
        <UpsideDownCup />
      </CupContainer>
      {containsBall && <Ball />}
    </CupWithBall>
  );
};

const CupWithBall = styled.div`
  position: relative;
`;

/**
 * A ball to hide under the cups.
 */
const Ball = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  // Beautiful gradient shamelessly stolen from https://codepen.io/vikas78/pen/vYEymWd
  background: radial-gradient(circle at 65% 15%, white 1px, aqua 3%, darkblue 60%, aqua 100%);

  position: absolute;
  top: 180px;
  left: 50px;

  z-index: 0;
`;

const slideDownAnimation = css`
  animation-name: ${keyframes`
  from {
    transform: translateY(0%);
  }

  to {
    transform: translateY(50%);
  }
`};
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards; // this ensures that the animation stays down
  z-index: 1;
`;

/**
 * This container is the box that contains the trapezoid (and possibly the ball).
 * It's easier to reason about because it's just a rectangle.
 * It also contains the css animation to slide down.
 */
const CupContainer = styled.div<{ slideDown?: boolean }>`
  width: 140px;
  height: 150px;
  border: 1px solid black;
  position: relative;

  ${(props) => props.slideDown && slideDownAnimation}
`;

/**
 * An isosceles trapezoid to represent a Shell.
 * Idea shamelessly stolen from https://stackoverflow.com/questions/7920754/how-to-draw-a-trapezium-trapezoid-with-css3
 */
const UpsideDownCup = styled.div`
  width: 100px;
  height: 140px;
  background: red;
  // added a very specific translateY to align the shell top with parent's top.
  // I think this belongs here and not in the parent component because the parent has no knowledge of the unalignment issue caused by the prespective + rotateX transformations
  transform: translateY(-13px) perspective(10px) rotateX(2deg);

  // Normally I don't put margins in the components themselves, but I think here it makes sense because of the transform above.
  margin: 0 20px 0 20px;
`;

export default Shell;
