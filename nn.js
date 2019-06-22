function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}


function dsigmoid(y) {
  // return sigmoid(x) * (1s - sigmoid(x));
  return y * (1 - y);
}

// function tanh(x) {
//   var y = Math.tanh(x);
//   return y;
// }
//
// function dtanh(x) {
//   var y = 1 / (pow(Math.cosh(x), 2));
//   return y;
// }


class NeuralNetwork {
  constructor(arr,lr) {
    this.neurons = [];
    this.weights = [];
    this.lr = lr || 0.01;
    let arrlen = arr.length;
    for(let i=0; i<arrlen; i++){
      this.neurons.push(arr[i]);
    }
    for(let i=0; i<arrlen-1; i++){
      let weight = new Matrix(this.neurons[i+1], this.neurons[i]);
      weight.randomize();
      this.weights.push(weight);
    }

  }
  predict(inputarr){
    let inputs = Matrix.fromArray(inputarr);
    let outputs = [];
    let weightlen = this.weights.length;
    for(let i=0; i<weightlen; i++){
      inputs = Matrix.multiply(this.weights[i], inputs);
      inputs.map(sigmoid);
      outputs.push(inputs);
    }
    return outputs;

  }
  query(arr){
  	let outputs = this.predict(arr);
  	let output = outputs[outputs.length-1].toArray();
  	return output;

  }

  learn(input, outputarr){
  	let inputs = Matrix.fromArray(input);
    let weightlen = this.weights.length;
    for(let i=0; i<weightlen; i++){
      inputs = Matrix.multiply(this.weights[i], inputs);
      inputs.map(sigmoid);
    }
    let output = inputs;
  	let answer = Matrix.fromArray(outputarr);
  	let err = Matrix.subtract(answer, output);
  	let errors = [];
  	for (var i = this.weights.length - 1; i >= 0; i--) {
  		errors.push(err);
  		err = Matrix.multiply(Matrix.transpose(this.weights[i]), err);
  	}
  	errors.reverse();
  	let outputs = [];
  	let inpout = [];
  	inpout.push(Matrix.fromArray(input));
  	let inp = Matrix.fromArray(input)
    for(let i=0; i<weightlen; i++){
      inp = Matrix.multiply(this.weights[i], inp);
      inp.map(sigmoid);
      outputs.push(inp);
      inpout.push(inp);
    }

   for (let i = 0; i < errors.length; i++) {
   	  let gradient = errors[i].multiply(Matrix.map(outputs[i], dsigmoid));
   	  let dweight = Matrix.multiply(gradient, Matrix.transpose(inpout[i]));
   	  dweight.multiply(this.lr);
      this.weights[i] = this.weights[i].add(dweight);
   }



  }
  setLearningRate(learn){
  	this.lr = learn;

  }


  download(filename){
    let arr = {
      "lr": this.lr,
      "neurons": this.neurons,
      "weights": this.weights
    }

    let datStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(arr));
    let downloadNode = document.createElement("a");
    downloadNode.setAttribute("href", datStr);
    downloadNode.setAttribute("download", filename + ".json");
    downloadNode.click();
    downloadNode.remove();

  }
  upload(weights){
    for(let i=0; i<this.weights.length; i++){
      for (let m = 0; m < this.weights[i].rows; m++) {
        for (let n = 0; n < this.weights[i].cols; n++) {
          this.weights[i].data[m][n] = weights[i].data[m][n];
        }
      }
    }

  }
  accuracy(input, arr){
    let answer = arr;
    let output = this.query(input);
    answer = math.findmax(answer);
    output = math.findmax(output);
    let score = [];
    if(answer == output){
      score.push(1);
    }else{
      score.push(0);
    }
    let accuracy = math.sumArray(score)/score.length*100;
    return accuracy;

  }

}


// Word Vectors
// Based on: https://github.com/turbomaze/word2vecjson
// declare wordVecs globally to store wordVec.json data
class Word2Vec {

  static magnitude(a) {
    let sum = a.reduce((sum, val) => {
      return sum + val*val;
    }, 0);
    return Math.sqrt(sum);
  }

  // Cosine similarity!
  static distance(v1, v2) {
    // Check if v1 or v2 is a string then grab vector?
    // let v1 = wordVecs[word1];
    // let v2 = wordVecs[word2];

    let sum = v1.reduce((sum, a, i) => {
      return sum + a * v2[i];
    }, 0);
    return sum / (this.magnitude(v1) * this.magnitude(v2)); //magnitude is 1 for all feature vectors
  }

  // Add two word vectors
  static add(v1, v2) {
    return v1.map((a, i) => a + v2[i]);
  }

  // Subtract two word vectors
  static subtract(v1, v2) {
    return v1.map((a, i) => a - v2[i]);
  }

  // Average of two word vectors
  static average(v1, v2) {
    return v1.map((a, i) => (a + v2[i]) * 0.5);
  }

  static nearest(word, n=10) {
    let vec;
    if (word instanceof Array) {
      vec = word;
    } else {
      if (!wordVecs[word]) {
        return undefined;
      } else {
        vec = wordVecs[word];
      }
    }
    let words = [];
    let keys = Object.keys(wordVecs);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let d = this.distance(vec, wordVecs[key]);
      words.push({word: key, distance: d});
    }
    words.sort((a, b) => {
      return b.distance - a.distance;
    });
    return words.slice(0, n);
  }
}
