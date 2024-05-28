import React, { useState, useRef, useEffect, useCallback } from 'react';
import CylinderBlock from './CylinderBlock';
import './CylinderBlock.css';
import './AlgorithmVisualizer.css';

const AlgorithmVisualizer = () => {
  // State to hold the array of blocks
  const [array, setArray] = useState([]);
  // State to track if sorting is in progress
  const [isSorting, setIsSorting] = useState(false);
  // State to store the selected sorting algorithm
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('BubbleSort');
  // State to control the animation speed
  const [animationSpeed, setAnimationSpeed] = useState(600);
  // State to control the block size
  const [blockSize, setBlockSize] = useState(20);
  // State to track if the array has been initialized
  const [initialized, setInitialized] = useState(false);
  // Reference to hold the interval ID for sorting animation
  const intervalRef = useRef(null);

  // Function to initialize the array with random values
  const initializeArray = useCallback(() => {
    if (isSorting) {
      clearInterval(intervalRef.current);
      setIsSorting(false);
    }
    const length = Math.floor(Math.random() * 11) + 15; // Random length between 15 and 25
    const newArray = Array.from({ length }, () => Math.floor(Math.random() * 81) + 20); // Random values between 20 and 100
    setArray(newArray.map(value => ({ value, color: '#ccc' })));
    setInitialized(true); // Set initialized state to true
  }, [isSorting]);

  // useEffect hook to initialize the array when the component mounts
  useEffect(() => {
    if (!isSorting && !initialized) {
      initializeArray();
    }
  }, [initializeArray, isSorting, initialized]);

  // Function to handle the change of sorting algorithm
  const handleAlgorithmChange = (event) => {
    setSelectedAlgorithm(event.target.value);
  };

  // Function to start the sorting process
  const playSorting = () => {
    if (isSorting) {
      clearInterval(intervalRef.current);
      setIsSorting(false);
    }
    setIsSorting(true);
    const animations = getSortingAnimations(array.map(item => item.value));
    animateSorting(animations, animationSpeed);
  };

  // Function to handle the change of animation speed
  const handleSpeedChange = (event) => {
    const newSpeed = parseInt(event.target.value);
    setAnimationSpeed(newSpeed);
    if (isSorting) {
      clearInterval(intervalRef.current);
      const animations = getSortingAnimations(array.map(item => item.value));
      animateSorting(animations, newSpeed);
    }
  };

  // Function to handle the change of block size
  const adjustBlockSize = (event) => {
    const newSize = parseInt(event.target.value);
    setBlockSize(newSize);
  };

  // Function to get the animations for Bubble Sort
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

  // Function to get the animations for Selection Sort
  const getSelectionSortAnimations = (array) => {
    const animations = [];
    const auxArray = array.slice();
    const n = auxArray.length;

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        if (auxArray[j] < auxArray[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        animations.push([minIndex, i, true]);
        [auxArray[minIndex], auxArray[i]] = [auxArray[i], auxArray[minIndex]];
      } else {
        animations.push([minIndex, i, false]);
      }
    }
    return animations;
  };

  // Function to get the animations for Insertion Sort
  const getInsertionSortAnimations = (array) => {
    const animations = [];
    const auxArray = array.slice();
    const n = auxArray.length;

    for (let i = 1; i < n; i++) {
      let key = auxArray[i];
      let j = i - 1;
      while (j >= 0 && auxArray[j] > key) {
        animations.push([j, j + 1, true]);
        auxArray[j + 1] = auxArray[j];
        j--;
      }
      animations.push([j + 1, i, false]);
      auxArray[j + 1] = key;
    }

    return animations;
  };

  // Function to get the animations for Merge Sort
  const getMergeSortAnimations = (array) => {
    const animations = [];
    if (array.length <= 1) return array.slice();
    const auxArray = array.slice();
    mergeSortHelper(auxArray, 0, auxArray.length - 1, animations);
    return animations;
  };

  // Helper function for Merge Sort
  const mergeSortHelper = (mainArray, startIdx, endIdx, animations) => {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(mainArray, startIdx, middleIdx, animations);
    mergeSortHelper(mainArray, middleIdx + 1, endIdx, animations);
    merge(mainArray, startIdx, middleIdx, endIdx, animations);
  };

  // Function to merge two sorted halves
  const merge = (mainArray, startIdx, middleIdx, endIdx, animations) => {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    const auxiliaryArray = mainArray.slice();
    while (i <= middleIdx && j <= endIdx) {
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  };

  // Function to get the animations for Quick Sort
  const getQuickSortAnimations = (array) => {
    const animations = [];
    if (array.length <= 1) return array.slice();
        const auxArray = array.slice();
    quickSortHelper(auxArray, 0, auxArray.length - 1, animations);
    return animations;
  };

  // Helper function for Quick Sort
  const quickSortHelper = (mainArray, low, high, animations) => {
    if (low < high) {
      const pivotIndex = partition(mainArray, low, high, animations);
      quickSortHelper(mainArray, low, pivotIndex - 1, animations);
      quickSortHelper(mainArray, pivotIndex + 1, high, animations);
    }
  };

  // Function to partition the array and find the pivot
  const partition = (mainArray, low, high, animations) => {
    const pivot = mainArray[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (mainArray[j] < pivot) {
        i++;
        animations.push([i, j, true]);
        [mainArray[i], mainArray[j]] = [mainArray[j], mainArray[i]];
      } else {
        animations.push([i, j, false]);
      }
    }
    animations.push([i + 1, high, true]);
    [mainArray[i + 1], mainArray[high]] = [mainArray[high], mainArray[i + 1]];
    return i + 1;
  };

  // Function to get the animations for Heap Sort
  const getHeapSortAnimations = (array) => {
    const animations = [];
    const auxArray = array.slice();
    const n = auxArray.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(auxArray, n, i, animations);
    }
    for (let i = n - 1; i > 0; i--) {
      animations.push([0, i, true]);
      [auxArray[0], auxArray[i]] = [auxArray[i], auxArray[0]];
      heapify(auxArray, i, 0, animations);
    }
    return animations;
  };

  // Function to maintain the heap property
  const heapify = (mainArray, n, i, animations) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && mainArray[left] > mainArray[largest]) {
      largest = left;
    }
    if (right < n && mainArray[right] > mainArray[largest]) {
      largest = right;
    }
    if (largest !== i) {
      animations.push([i, largest, true]);
      [mainArray[i], mainArray[largest]] = [mainArray[largest], mainArray[i]];
      heapify(mainArray, n, largest, animations);
    } else {
      animations.push([i, largest, false]);
    }
  };

  // Function to get the animations for Shell Sort
  const getShellSortAnimations = (array) => {
    const animations = [];
    const auxArray = array.slice();
    const n = auxArray.length;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < n; i++) {
        let temp = auxArray[i];
        let j;
        for (j = i; j >= gap && auxArray[j - gap] > temp; j -= gap) {
          animations.push([j, j - gap, true]);
          auxArray[j] = auxArray[j - gap];
        }
        animations.push([j, i, false]);
        auxArray[j] = temp;
      }
    }
    return animations;
  };

  // Function to get the sorting animations based on the selected algorithm
  const getSortingAnimations = (array) => {
    switch (selectedAlgorithm) {
      case 'BubbleSort':
        return getBubbleSortAnimations(array);
      case 'SelectionSort':
        return getSelectionSortAnimations(array);
      case 'InsertionSort':
        return getInsertionSortAnimations(array);
      case 'MergeSort':
        return getMergeSortAnimations(array);
      case 'QuickSort':
        return getQuickSortAnimations(array);
      case 'HeapSort':
        return getHeapSortAnimations(array);
      case 'ShellSort':
        return getShellSortAnimations(array);
      default:
        return [];
    }
  };

  // Function to animate the sorting process
  const animateSorting = (animations, speed) => {
    let index = 0;
    intervalRef.current = setInterval(() => {
      if (index >= animations.length) {
        clearInterval(intervalRef.current);
        setIsSorting(false);
        // Set array to green only if it's initialized
        if (initialized) {
          setArray((prevArray) => prevArray.map(item => ({
            value: item.value,
            color: 'green'
          })));
        }
        return;
      }

      const animation = animations[index];
      setArray((prevArray) => {
        const newArray = prevArray.map((item, idx) => ({
          value: item.value,
          color: item.color
        }));

        if (animation.length === 3) {
          const [firstIndex, secondIndex, swap] = animation;
          if (swap) {
            [newArray[firstIndex].value, newArray[secondIndex].value] = [newArray[secondIndex].value, newArray[firstIndex].value];
            newArray[firstIndex].color = 'red';
            newArray[secondIndex].color = 'red';
          } else {
            newArray[firstIndex].color = 'red';
            newArray[secondIndex].color = 'red';
          }
        } else if (animation.length === 2) {
          const [position, newValue] = animation;
          newArray[position].value = newValue;
          newArray[position].color = 'red';
        }

        return newArray;
      });

      // Reset colors after a delay
      setTimeout(() => {
        setArray((prevArray) => prevArray.map((item, idx) => ({
          value: item.value,
          color: idx === animation[0] || idx === animation[1] ? '#ccc' : item.color
        })));
      }, 300);

      index++;
    }, speed);
  };

  // Function to handle initialization of another array
  const initializeAnotherArray = () => {
    setInitialized(false); // Set initialized state to false
    initializeArray(); // Initialize a new array
  };

  // render component
  return (
    <div className="algorithm-visualizer">
      {/* Row containing three columns */}
      <div className="row">
        {/* Left column */}
        <div className="column">
          <div className="control-group">
            {/* Conditionally render the "Initialize Array" button based on initialization */}
            {!initialized && <button onClick={initializeArray}>Initialize Array</button>}
            {/* Conditionally render the "Initialize Another Array" button based on initialization */}
            {initialized && <button onClick={initializeAnotherArray}>Initialize Another Array</button>}
            <select value={selectedAlgorithm} onChange={handleAlgorithmChange}>
              <option value="BubbleSort">Bubble Sort</option>
              <option value="SelectionSort">Selection Sort</option>
              <option value="InsertionSort">Insertion Sort</option>
              <option value="MergeSort">Merge Sort</option>
              <option value="QuickSort">Quick Sort</option>
              <option value="HeapSort">Heap Sort</option>
              <option value="ShellSort">Shell Sort</option>
            </select>
            {/* Conditionally render the "Sort" button based on initialization */}
            {initialized && <button onClick={playSorting} disabled={isSorting}>Sort</button>}
          </div>
        </div>
        {/* Middle column */}
        <div className="column">
          {/* Container for the blocks */}
          <div className="cylinder-container">
            {array.map((block, index) => (
              <CylinderBlock key={index} height={block.value} color={block.color} size={blockSize} />
            ))}
          </div>
        </div>
        {/* Right column */}
        <div className="column">
          <div className="control-group">
            <label>Animation Speed</label>
            <input
              type="range"
              min="100"
              max="1000"
              step="100"
              value={animationSpeed}
              onChange={handleSpeedChange}
              />
            <label>Block Size</label>
            <input
              type="range"
              min="10"
              max="50"
              step="5"
              value={blockSize}
              onChange={adjustBlockSize}            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;

