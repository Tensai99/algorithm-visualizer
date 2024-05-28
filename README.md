# Algorithm Visualizer

Algorithm Visualizer is a web application built with React that visualizes various sorting algorithms. This tool helps users understand how sorting algorithms work through interactive visualizations.

## Features

- Visualize different sorting algorithms including Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort, and Shell Sort.
- Adjust the speed of the visualizations.
- Customize the size of the array being sorted.
- View the code implementation of the selected algorithm in different programming languages.

## Installation

To get started with the project, you need to have [Node.js](https://nodejs.org/) installed on your machine.

1. **Clone the repository:**
    ```sh
    git clone https://github.com/yourusername/algorithm-visualizer.git
    cd algorithm-visualizer
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

## Running the Application

To start the development server, run:

```sh
npm start
```

This will start the application in development mode and open it in your default web browser. If it doesn't open automatically, navigate to http://localhost:3000 in your browser.

## Usage
1. **Select an Algorithm:**

    - Use the dropdown menu to select the sorting algorithm you want to visualize.

2. **Adjust Settings:**

    - Use the sliders to adjust the speed of the visualization and the size of the array.

3. **Start Sorting:**

    - Click the "Sort" button to start the visualization.

4. **View Code:**

    - Toggle the code view to see the implementation of the selected algorithm in different programming languages.

## Project Structure
Here is an overview of the project structure:
```sh
algorithm-visualizer/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── AlgorithmVisualizer.js
│   │   ├── Blocks.js
│   │   └── ...
│   ├── utils/
│   │   ├── implementations.js
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
├── README.md
└── ...
```
## Key Files and Directories
- src/components/AlgorithmVisualizer.js: The main component that handles the visualization logic.

- src/components/Blocks.js: A component to render the array blocks.

- src/utils/implementations.js: Contains the implementations of the sorting algorithms.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to update the documentation as needed.

## License
This project is licensed under the MIT License. See the LICENSE file for details.