import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Calculator from '../app/components/Calculator';

// Helper function to get the display value
const getDisplayValue = () => {
  return document.querySelector('.bg-gray-900')?.textContent;
};

describe('Calculator PLUS Functionality', () => {
  beforeEach(() => {
    render(<Calculator />);
  });

  describe('Basic Addition', () => {
    it('should add two positive integers correctly', async () => {
      const user = userEvent.setup();
      
      // Click 5 + 3 = 
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('8');
    });

    it('should add larger numbers correctly', async () => {
      const user = userEvent.setup();
      
      // Click 123 + 456 = 
      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '4' }));
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '6' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('579');
    });

    it('should handle zero addition correctly', async () => {
      const user = userEvent.setup();
      
      // Click 5 + 0 = 
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '0' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('5');
    });
  });

  describe('Positive and Negative Numbers', () => {
    it('should add positive and negative numbers correctly (positive result)', async () => {
      const user = userEvent.setup();
      
      // Click 10 - 3 + 8 = (which is 10 + (-3) + 8 = 15)
      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: '0' }));
      await user.click(screen.getByRole('button', { name: '-' }));
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '8' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('15');
    });

    it('should add positive and negative numbers correctly (negative result)', async () => {
      const user = userEvent.setup();
      
      // Click 5 - 8 = 
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '-' }));
      await user.click(screen.getByRole('button', { name: '8' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('-3');
    });
  });

  describe('Decimal Numbers', () => {
    it('should add decimal numbers correctly', async () => {
      const user = userEvent.setup();
      
      // Click 2.5 + 3.7 = 
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: '.' }));
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: '.' }));
      await user.click(screen.getByRole('button', { name: '7' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('6.2');
    });

    it('should add integer and decimal correctly', async () => {
      const user = userEvent.setup();
      
      // Click 5 + 2.3 = 
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: '.' }));
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('7.3');
    });

    it('should add decimal starting with zero correctly', async () => {
      const user = userEvent.setup();
      
      // Click 0.5 + 0.3 = 
      await user.click(screen.getByRole('button', { name: '0' }));
      await user.click(screen.getByRole('button', { name: '.' }));
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '0' }));
      await user.click(screen.getByRole('button', { name: '.' }));
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('0.8');
    });

    it('should handle decimal point entry correctly', async () => {
      const user = userEvent.setup();
      
      // Test that entering decimal point when waiting for operand shows "0."
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '.' }));
      
      expect(getDisplayValue()).toBe('0.');
    });

    it('should prevent multiple decimal points in same number', async () => {
      const user = userEvent.setup();
      
      // Click 2.5.3 should only show 2.53 (second decimal is ignored)
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: '.' }));
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '.' })); // This should be ignored
      await user.click(screen.getByRole('button', { name: '3' }));
      
      expect(getDisplayValue()).toBe('2.53');
    });
  });

  describe('Chained Operations', () => {
    it('should handle chained addition operations correctly', async () => {
      const user = userEvent.setup();
      
      // Click 2 + 3 + 4 = 
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '4' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('9');
    });

    it('should show intermediate results during chained operations', async () => {
      const user = userEvent.setup();
      
      // Click 2 + 3 + (should show 5)
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      
      expect(getDisplayValue()).toBe('5');
    });
  });

  describe('Clear Functionality', () => {
    it('should clear the calculator and reset to initial state', async () => {
      const user = userEvent.setup();
      
      // Enter some calculation
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '3' }));
      
      // Clear
      await user.click(screen.getByRole('button', { name: 'C' }));
      
      expect(getDisplayValue()).toBe('0');
      
      // Should be able to start fresh calculation
      await user.click(screen.getByRole('button', { name: '7' }));
      expect(getDisplayValue()).toBe('7');
    });
  });

  describe('Edge Cases', () => {
    it('should handle equals button without operation', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('5');
    });

    it('should handle multiple equals presses', async () => {
      const user = userEvent.setup();
      
      // Click 5 + 3 = = =
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      // Should still show 8 (not repeat the operation)
      expect(getDisplayValue()).toBe('8');
    });

    it('should handle operation button pressed multiple times', async () => {
      const user = userEvent.setup();
      
      // Click 5 + + + should still work
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('8');
    });
  });

  describe('UI Elements', () => {
    it('should have all required buttons visible', () => {
      // Number buttons (1-9)
      for (let i = 1; i <= 9; i++) {
        expect(screen.getByRole('button', { name: i.toString() })).toBeInTheDocument();
      }
      
      // Number 0 button specifically
      expect(screen.getByRole('button', { name: '0' })).toBeInTheDocument();
      
      // Operation buttons
      expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '=' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'C' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '.' })).toBeInTheDocument();
    });

    it('should display initial state correctly', () => {
      expect(getDisplayValue()).toBe('0');
    });
  });
});