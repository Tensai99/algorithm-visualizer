import React, { useState, useRef } from 'react';
import CylinderBlock from './CylinderBlock';
import './CylinderBlock.css'; // Import CSS file for CylinderBlock
import './AlgorithmVisualizer.css'; // Import CSS file for AlgorithmVisualizer

const AlgorithmVisualizer = () => {
  // State variables
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('BubbleSort');
  const intervalRef = useRef(null);

  // Function to initialize the array with random values
  const initializeArray = () => {
    if (isSorting) {
      clearInterval(intervalRef.current);
      setIsSorting(false);
    }
    const length = Math.floor(Math.random() * 11) + 15; // Random length between 15 and 25
    const newArray = Array.from({ length }, () => Math.floor(Math.random() * 81) + 20); // Random height between 20 and 100
    setArray(newArray);
  };

  // Function to handle the change in selected algorithm
  const handleAlgorithmChange = (event) => {
    setSelectedAlgorithm(event.target.value);
  };

  // Function to start sorting
  const playSorting = () => {
    if (isSorting) {
      clearInterval(intervalRef.current);
      setIsSorting(false);
    }
    console.log('Play sorting function called');
    setIsSorting(true);
    const animations = getSortingAnimations(array);
    animateSorting(animations);
  };

  // Function to generate animations for bubble sort
  const getBubbleSortAnimations = (array) => {
    const animations = [];
    const auxArray = array.slice();
    let n = auxArray.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (auxArray[j] > auxArray[j + 1]) {
          animations.push([j, j + 1, true]);
          [auxArray[j], auxArray[j + 1]] = [auxArray[j + 1], auxArray[j]];
        } else {
          animations.push([j, j + 1, false]);
        }
      }
    }
    return animations;
  };
