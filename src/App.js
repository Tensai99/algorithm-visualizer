import React from 'react';
import './App.css';
import AlgorithmVisualizer from './components/AlgorithmVisualizer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Algorithm Visualizer</h1>
      </header>
      <main>
        <AlgorithmVisualizer />
      </main>
      <footer className="App-footer">
        <p>© 2024 Developed by Innocent Mtingwi</p>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/innocent-mtingwi" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
          </a>
          <a href="https://web.facebook.com/me/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} /> Facebook
          </a>
          <a href="https://github.com/Tensai99/algorithm-visualizer" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} /> GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
