import React from 'react';

interface HoverInfoProps {
  formData: {
    income: string;
    expenditure: string;
    loanRepayment: string;
    others: string;
  };
  isVisible: boolean;
  cursorPosition: { x: number; y: number }; // New prop for cursor position
}

const HoverInfo: React.FC<HoverInfoProps> = ({ formData, isVisible, cursorPosition }) => {
  if (!isVisible) return null; // Don't render anything if not visible

  const styles: React.CSSProperties = {
    position: 'absolute', // Position absolutely relative to the screen
    left: cursorPosition.x + 10, // Offset by 10px to avoid overlap with the cursor
    top: cursorPosition.y + 10, // Offset by 10px vertically
    backgroundColor: '#fff',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    zIndex: 999,
    fontSize: '1rem',
    maxWidth: '250px',
    textAlign: 'center',
  };

  return (
    <div className="hover-info" style={styles}>
      <h4>Financial Details</h4>
      <p><strong>Income:</strong> ${formData.income}</p>
      <p><strong>Expenditure:</strong> ${formData.expenditure}</p>
      <p><strong>Loan Repayment:</strong> ${formData.loanRepayment}</p>
      <p><strong>Others:</strong> ${formData.others}</p>
    </div>
  );
};

export default HoverInfo;
