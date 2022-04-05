import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App';

describe('Gamestate changes', () => {
  test('Picks difficulty and sees the ball.', async () => {
    render(<App />);

    // ball is not visible
    let ball = await screen.queryByLabelText(/ball/);
    expect(ball).toBeNull();

    // Click button
    fireEvent.click(screen.getByText('Three shells.'));

    // Wait for page to update with query text
    const topRow = await screen.findByText(/Click GO once you are ready ! No going back !!/);
    expect(topRow).toBeDefined();

    // ball is now visible
    ball = await screen.findByLabelText(/ball/);
    expect(ball).toBeDefined();
  });
});
