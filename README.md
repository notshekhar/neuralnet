## Use the library

Constructors:
```js
// Neural network with 2 inputs, 1 hidden layer, 4 hidden nodes and 1 output
let nn0 = new NeuralNetwork([2, 4, 1]);

// Neural network with 2 inputs, 2 hidden layers, 4 hidden nodes and 1 output
let nn1 = new NeuralNetwork([2, 2, 4, 1]);
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
let model = nn.getModel();

// Writes a JSON-file with the current "state" (weights and biases) of the NN
let nn = NeuralNetwork.fromModel(model);
```

Adjust the learning rate:
```js
// Set the learning rate (Initially the learning rate is 0.1)
nn.setLearningRate(0.01);
```

Use different activation functions:
```js
// Set the activation function (By default Sigmoid will be used)
nn.setActivation(activation_function, dactivation_function);
```

Use this library with genetic algorithms:
```js
// Make an exact and "independent" copy of a Neural Network
let nn2 = nn1.copy();

// Merge the weights and biases of two Neural Networks with a ratio of 50:50
let merged = nn1.merge(nn2);

// Merge the weights and biases of two Neural Networks with a custom ratio (here: 20:80)
let merged = nnA.merge(nnB, 0.2);

// Mutate the weights and biases of a Neural Network with custom probability
nn.mutate(x=>x*0.1);
```
More detailed examples can be found below.

## Download

If you want to use this library you can download [v1.2.0](https://www.npmjs.com/package/deepneuralnet) here or check the release tab of this repository.
