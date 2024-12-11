
**Features**
User Authentication: Users can log in with their email and password using Firebase Authentication.
Financial Data Visualization: Financial data such as income, expenditure, loan repayment, and others are visualized in a bar chart.
Interactive Form: A slide-over form allows users to edit their financial data. The form dynamically calculates the balance and displays error messages when the input is invalid (e.g., total expenses exceed income).
Error Handling: If users enter invalid data (like total expenses exceeding income), an error message is shown.
Responsive Design: The application is designed to be responsive, adjusting well to various screen sizes.

**Technologies Used**
React: A JavaScript library for building user interfaces.
Firebase Authentication: For user authentication (sign in and sign out).
Chart.js: A library for displaying interactive charts.
CSS: For styling the components and pages.
FontAwesome: For icons (e.g., log out icon).

**Setup and Installation**
Create a react application using the command npx create-react-app data-viz-platform --template typescript
Navigate to the folder data-viz-platform 
Copy the src folder from here and paste it in your local
Execute the command npm run dev to run the application

**Code Explanation**
Auth.tsx (Authentication Component)
Functionality: Handles user login and logout.
Methods:
handleLogin: Logs the user in using Firebase Authentication.
handleLogout: Logs the user out of the Firebase Authentication.
UI: Displays the login form when the user is not authenticated and a welcome message with the option to log out when the user is authenticated.

Dashboard.tsx (Main Dashboard Component)
Functionality: Displays the main financial dashboard, including a bar chart of financial data (income, expenditure, loan repayments, others), and a slide-over form to edit those values.
Features:
Displays a Bar Chart that visualizes the financial data using Chart.js.
Handles mouse hover events over the chart to show more information dynamically using the HoverInfo component.
Allows the user to open/close the SlideOver form to edit their financial data.
The logout icon allows users to sign out from the dashboard.

SlideOver.tsx (Slide-Over Form Component)
Functionality: Provides a slide-over form to edit income, expenditure, loan repayment, and other financial data.
Features:
Dynamically calculates the balance as the user enters values.
Displays an error message if total expenses exceed income.
Allows the user to submit or clear the form data.

HoverInfo.tsx (Hover Info Component)
Functionality: Displays additional information when the user hovers over the bar chart in the dashboard. This shows the data associated with the specific section of the chart the user is interacting with.

AuthContext.tsx (Authentication Context)
Functionality: Provides the authentication state (user) to the app using React Context. It uses Firebase's onAuthStateChanged method to monitor the user's login state.
Features:
useAuth hook: Allows any component to access the authentication state (whether the user is logged in or not).


