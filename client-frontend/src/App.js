import { Toaster } from 'react-hot-toast';
import './App.css';
import { Router } from './router/router';

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <div className="App">
          App is running...!!!
        </div>
      </Router>
    </>
  );
}

export default App;
