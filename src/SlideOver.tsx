import React, { useState, useEffect } from 'react';
import './SlideOver.css'; // Import CSS for styling

interface SlideOverProps {
  isOpen: boolean;
  toggleSlideOver: () => void;
  handleFormSubmit: (data: { income: string; expenditure: string; loanRepayment: string; others: string }) => void; // Pass function to handle form submission
}

const SlideOver: React.FC<SlideOverProps> = ({ isOpen, toggleSlideOver, handleFormSubmit }) => {
  // State for the form
  const [formData, setFormData] = useState({
    income: '',
    expenditure: '',
    loanRepayment: '',
    others: '',
  });

  const [error, setError] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Use effect to calculate balance on every change
  useEffect(() => {
    const { income, expenditure, loanRepayment, others } = formData;

    const incomeValue = parseFloat(income || '0');
    const expenditureValue = parseFloat(expenditure || '0');
    const loanRepaymentValue = parseFloat(loanRepayment || '0');
    const othersValue = parseFloat(others || '0');

    // Check if the total of Expenditure, Loan Repayment, and Others exceeds Income
    const totalExpenses = expenditureValue + loanRepaymentValue + othersValue;

    if (totalExpenses > incomeValue) {
      setError('Total Expenditure, Loan Repayment, and Others cannot be more than Income.');
    } else {
      setError('');
    }

    // Calculate the balance (Income - Total Expenses)
    setBalance(incomeValue - totalExpenses);
  }, [formData]); // Recalculate when formData changes

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (error) {
      // Prevent submission if there's an error
      alert('Please fix the error before submitting.');
    } else {
      // Send the form data to the Dashboard
      handleFormSubmit(formData);
    }
  };

  // Handle clear button
  const handleClear = () => {
    setFormData({
      income: '',
      expenditure: '',
      loanRepayment: '',
      others: '',
    });
    setBalance(0);
    setError('');
  };

  return (
    <div className={`slide-over ${isOpen ? 'open' : ''}`}>
      <div className="slide-over-content">
        <h2>Edit Variables</h2>

        <form onSubmit={handleSubmit} className="form-section">
          <h3>Financial Overview</h3>

          {/* Income */}
          <label>
            Current Month Income:
            <input
              type="number"
              name="income"
              value={formData.income}
              onChange={handleChange}
              placeholder="Enter Income"
            />
          </label>

          {/* Expenditure */}
          <label>
            Expenditure:
            <input
              type="number"
              name="expenditure"
              value={formData.expenditure}
              onChange={handleChange}
              placeholder="Enter Expenditure"
            />
          </label>

          {/* Loan Repayment */}
          <label>
            Loan Repayment:
            <input
              type="number"
              name="loanRepayment"
              value={formData.loanRepayment}
              onChange={handleChange}
              placeholder="Enter Loan Repayment"
            />
          </label>

          {/* Others */}
          <label>
            Others:
            <input
              type="number"
              name="others"
              value={formData.others}
              onChange={handleChange}
              placeholder="Enter Other Expenses"
            />
          </label>

          {/* Error Message */}
          {error && <p className="error-message">{error}</p>}

          {/* Balance */}
          <div className="balance">
            <p>Balance: {balance >= 0 ? balance : 0}</p>
          </div>

          {/* Form buttons */}
          <div className="form-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleClear}>Clear</button>
          </div>
        </form>

        {/* Close Button */}
        <button className="close-btn" onClick={toggleSlideOver}>Close</button>
      </div>
    </div>
  );
};

export default SlideOver;
