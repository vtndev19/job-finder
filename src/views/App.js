import logo from './logo.svg';
import './App.scss';
import MyComponent from './example/MyComponent';
import { Header } from './example/MyComponent';
import { BoxChat } from './example/MyComponent';

function App() {
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello World! This is my first React app.
        </p>
        <BoxChat />
      </header>
    </div>
  );
}

export default App; 