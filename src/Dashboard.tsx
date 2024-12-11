// src/Dashboard.tsx
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useAuth } from './AuthContext'; // Import the useAuth hook
import { signOut } from 'firebase/auth'; // Import signOut from Firebase
import { auth } from './firebaseConfig'; // Import Firebase auth
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Import the logout icon
import SlideOver from './SlideOver';
import HoverInfo from './HoverInfo';
import './Dashboard.css';
import Auth from './Auth';

// Register the necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // State to track hover status
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 }); // Track cursor position
  const { user, loading } = useAuth(); // Use authentication hook

  // State to hold the form data from SlideOver
  const [formData, setFormData] = useState({
    income: '',
    expenditure: '',
    loanRepayment: '',
    others: '',
  });

  const toggleSlideOver = () => {
    setIsOpen(!isOpen);
  };

  const handleFormSubmit = (data: typeof formData) => {
    setFormData(data); // Update the formData with the data received from SlideOver
    toggleSlideOver(); // Close the SlideOver after submission
  };

  const chartData = {
    labels: ['Income', 'Expenditure', 'Loan Repayment', 'Others'],
    datasets: [
      {
        label: 'Financial Overview',
        data: [
          parseFloat(formData.income || '0'),
          parseFloat(formData.expenditure || '0'),
          parseFloat(formData.loanRepayment || '0'),
          parseFloat(formData.others || '0'),
        ],
        backgroundColor: ['#4CAF50', '#FF9800', '#F44336', '#2196F3'], // Color for each bar
        borderColor: ['#388E3C', '#F57C00', '#D32F2F', '#1976D2'],
        borderWidth: 1,
      },
    ],
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    setCursorPosition({ x: clientX, y: clientY });
  };

  const handleChartHover = (event: any, chartElement: any) => {
    if (chartElement.length > 0) {
      setIsHovered(true); // Set isHovered to true when the chart is hovered
    } else {
      setIsHovered(false); // Set isHovered to false when not hovered
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign the user out from Firebase
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return (
      <div>
        <h2>Login to Data Viz Platform</h2>
        <Auth/>
      </div>
    );
  }

  return (
    
    <div className="dashboard">
      <div>
      <div className="header">
        <h1>Dashboard</h1>
        <button onClick={toggleSlideOver} className="edit-button">
          Edit Variables
        </button>
        <div className="logout-icon" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
        </div>
      </div>
      </div>

      <div className="chart-container" onMouseMove={handleMouseMove}>
        <h3>Financial Overview</h3>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            onHover: handleChartHover,
          }}
        />
      </div>

      {/* HoverInfo Component */}
      <HoverInfo formData={formData} isVisible={isHovered} cursorPosition={cursorPosition} />

      <SlideOver
        isOpen={isOpen}
        toggleSlideOver={toggleSlideOver}
        handleFormSubmit={handleFormSubmit} // Pass the function to SlideOver
      />
    </div>
  );
};

export default Dashboard;
