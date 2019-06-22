## Use the library

Constructors:
```js
// Neural network with 2 inputs, 1 hidden layer, 4 hidden nodes and 1 output
let nn0 = new NeuralNetwork([2, 4, 1], 0.1);

// Neural network with 2 inputs, 2 hidden layers, 4 hidden nodes and 1 output
let nn1 = new NeuralNetwork([2, 2, 4, 1], 0.3);
```

Train and guess:
```js
// Train the neural network with a training dataset (inputs and expected outputs)
nn.learn(trainingDataInputs, trainingDataTargets);

// Guess for the given testing data is returned as an array (double[])
nn.query(testingData);
```

Read and write from/to file:
```js
// Reads from a (previously generated) JSON-file the nn-Data and returns a NeuralNetwork-object
let data = nn.download();

// Writes a JSON-file with the current "state" (weights and biases) of the NN
nn.upload(data);
```

## Download

If you want to use this library you can download [v0.1](https://github.com/notshekhar/neuralnet) here.
