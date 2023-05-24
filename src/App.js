import DashWrapper from './components/dashboardWrapper';
import AuthProvider from './components/authProvider';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './styles/App.css';

function App() {
  const navigate = useNavigate()
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState()
  const [state, setState] = useState(0)
  async function handleUserLoggedIn(user) {
    setCurrentUser(user)
    setState(2)
  }
  function handleUserNotRegister() {
    navigate("/login")
  }
  function handleUserNotLoggedIn() {
    navigate("/login")
  }


  if (state === 0) {
    return (
      <>
        <AuthProvider
          onUserLoggedIn={handleUserLoggedIn}
          onUserNotRegister={handleUserNotRegister}
          onUserNotLoggedIn={handleUserNotLoggedIn}>
        </AuthProvider>
      </>
    )
  }

  return (

    <DashWrapper user={currentUser}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </DashWrapper>
  );
}

export default App;
