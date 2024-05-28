import React from 'react';
import './App.css';
import AlgorithmVisualizer from './components/AlgorithmVisualizer'; // Update import path

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sorting Algorithm Visualizer</h1>
      </header>
      <main>
        <AlgorithmVisualizer />
      </main>
    </div>
  );
}

export default App;

