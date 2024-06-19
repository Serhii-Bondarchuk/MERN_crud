import { Toaster } from 'react-hot-toast';
import './App.css';
import { Router } from './router/router';
import { createContext } from 'react';

export const UrlContext = createContext(process.env.REACT_APP_URL_DEPLOY);

function App() {
  return (
    <>
      <UrlContext.Provider value={process.env.REACT_APP_URL_DEPLOY}>
        <Toaster position="top-right" reverseOrder={false} />
        <Router>
          <div className="App">
            App is running...!!!
          </div>
        </Router>
      </UrlContext.Provider>
    </>
  );
}

export default App;
