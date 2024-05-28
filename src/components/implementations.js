import { useState } from 'react';

const Implementations = () => {
  const [language, setLanguage] = useState('javascript');

  const toggleLanguage = () => {
    setLanguage((prevLanguage) =>
      prevLanguage === 'javascript' ? 'python' : 'javascript'
    );
  };

  const getAlgorithmImplementation = (selectedAlgorithm, language) => {
    // Define implementations of algorithms in JavaScript or Python
    const implementations = {
      BubbleSort: {
        javascript: `function bubbleSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return array;
}`,
        python: `def bubble_sort(arr):
  n = len(arr)
  for i in range(n):
    for j in range(0, n - i - 1):
      if arr[j] > arr[j + 1]:
        arr[j], arr[j + 1] = arr[j + 1], arr[j]
  return arr;`,
      },
      SelectionSort: {
        javascript: `function selectionSort(array) {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }
  return array;
}`,
        python: `def selection_sort(arr):
  n = len(arr)
  for i in range(n):
    min_idx = i
    for j in range(i + 1, n):
      if arr[min_idx] > arr[j]:
        min_idx = j
    arr[i], arr[min_idx] = arr[min_idx], arr[i]
  return arr;`,
      },
      InsertionSort: {
        javascript: `function insertionSort(array) {
  const n = array.length;
  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = key;
  }
  return array;
}`,
        python: `def insertion_sort(arr):
  n = len(arr)
  for i in range(1, n):
    key = arr[i]
    j = i - 1
    while j >= 0 and key < arr[j]:
      arr[j + 1] = arr[j]
      j -= 1
    arr[j + 1] = key
  return arr;`,
      },
      MergeSort: {
        javascript: `function mergeSort(array) {
  if (array.length <= 1) return array;
  const mid = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, mid));
  const right = mergeSort(array.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0,
    j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
        python: `def merge_sort(arr):
  if len(arr) > 1:
    mid = len(arr) // 2
    left_half = arr[:mid]
    right_half = arr[mid:]
    merge_sort(left_half)
    merge_sort(right_half)

    i = j = k = 0

    while i < len(left_half) and j < len(right_half):
      if left_half[i] < right_half[j]:
        arr[k] = left_half[i]
        i += 1
      else:
        arr[k] = right_half[j]
        j += 1
      k += 1

    while i < len(left_half):
      arr[k] = left_half[i]
      i += 1
      k += 1

    while j < len(right_half):
      arr[k] = right_half[j]
      j += 1
      k += 1
  return arr;`,
      },
      QuickSort: {
        javascript: `function quickSort(array) {
  if (array.length <= 1) return array;
  const pivot = array[array.length - 1];
  const left = [];
  const right = [];
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] < pivot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
        python: `def quick_sort(arr):
  if len(arr) <= 1:
    return arr
  pivot = arr[-1]
  left, right = [], []
  for x in arr[:-1]:
    if x < pivot:
      left.append(x)
    else:
      right.append(x)
  return quick_sort(left) + [pivot] + quick_sort(right)`,
      },
      HeapSort: {
        javascript: `function heapSort(array) {
  buildMaxHeap(array);
  let end = array.length - 1;
  while (end > 0) {
    [array[0], array[end]] = [array[end], array[0]];
    end--;
    heapify(array, 0, end);
  }
  return array;
}

function buildMaxHeap(array) {
  const len = array.length;
  for (let i = Math.floor(len / 2); i >= 0; i--) {
    heapify(array, i, len - 1);
  }
}

function heapify(array, start, end) {
  let root = start;
  while (root * 2 + 1 <= end) {
    let child = root * 2 + 1;
    let swap = root;
    if (array[swap] < array[child]) {
      swap = child;
    }
    if (child + 1 <= end && array[swap] < array[child + 1]) {
      swap = child + 1;
    }
    if (swap !== root) {
      [array[root], array[swap]] = [array[swap], array[root]];
      root = swap;
    } else {
      return;
    }
  }
}`,
        python: `def heapify(arr, n, i):
  largest = i
  left = 2 * i + 1
  right = 2 * i + 2

  if left < n and arr[i] < arr[left]:
    largest = left

  if right < n and arr[largest] < arr[right]:
    largest = right

  if largest != i:
    arr[i], arr[largest] = arr[largest], arr[i]
    heapify(arr, n, largest)

def heap_sort(arr):
  n = len(arr)
  for i in range(n // 2 - 1, -1, -1):
    heapify(arr, n, i)
  for i in range(n - 1, 0, -1):
    arr[i], arr[0] = arr[0], arr[i]
    heapify(arr, i, 0)
  return arr`,
      },
      ShellSort: {
        javascript: `function shellSort(array) {
  const len = array.length;
  for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < len; i++) {
      let temp = array[i];
      let j = i;
      while (j >= gap && array[j - gap] > temp) {
        array[j] = array[j - gap];
        j -= gap;
      }
      array[j] = temp;
    }
  }
  return array;
}`,
        python: `def shell_sort(arr):
  n = len(arr)
  gap = n // 2
  while gap > 0:
    for i in range(gap, n):
      temp = arr[i]
      j = i
      while j >= gap and arr[j - gap] > temp:
        arr[j] = arr[j - gap]
        j -= gap
      arr[j] = temp
    gap //= 2
  return arr`,
      },
    };

    // Return the implementation based on the selected algorithm and language
    return implementations[selectedAlgorithm][language];
  };

  return { language, toggleLanguage, getAlgorithmImplementation };
};

export default Implementations;
