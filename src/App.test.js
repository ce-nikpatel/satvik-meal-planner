import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders menu generator header and generates menu', async () => {
  render(<App />);
  const header = screen.getByText(/hindu veg dinner planner/i);
  expect(header).toBeInTheDocument();

  const button = screen.getByRole('button', { name: /generate menu/i });
  userEvent.click(button);

  // after clicking we should see at least one list item (meals or grocery)
  const listItems = await screen.findAllByRole('listitem');
  expect(listItems.length).toBeGreaterThan(0);
});
