"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const matrix_1 = __importDefault(require("./matrix"));
class NeuralNetwork {
    constructor(arr, lr) {
        this.nodes = arr;
        this.lr = lr || 0.01;
        this.activation = NeuralNetwork.sigmoid;
        this.dactivation = NeuralNetwork.dsigmoid;
        this.weights = new Array(this.nodes.length - 1);
        this.biases = new Array(this.nodes.length - 1);
        for (let i = 0; i < this.nodes.length - 1; i++) {
            this.weights[i] = new matrix_1.default(this.nodes[i + 1], this.nodes[i]).randomize();
        }
        for (let i = 1; i < this.nodes.length; i++) {
            this.biases[i - 1] = new matrix_1.default(this.nodes[i], 1).randomize();
        }
    }
    static tanh(x) {
        var y = Math.tanh(x);
        return y;
    }
    static dtanh(x) {
        var y = 1 / Math.pow(Math.cosh(x), 2);
        return y;
    }
    static sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }
    static dsigmoid(y) {
        return y * (1 - y);
    }
    query(inputs) {
        const length = inputs.length;
        const O = new Array(length);
        // lopping on the inputs
        for (let a = 0; a < length; a++) {
            // query
            let input = matrix_1.default.fromArray(inputs[a]);
            for (let i = 0; i < this.weights.length; i++) {
                input = matrix_1.default.multiply(this.weights[i], input);
                input.add(this.biases[i]);
                input.map(this.activation);
            }
            O[a] = input.toArray();
        }
        return O;
    }
    train(inputs, targets) {
        let target = matrix_1.default.fromArray(targets);
        let O = new Array(this.weights.length);
        let input = matrix_1.default.fromArray(inputs);
        for (let i = 0; i < this.weights.length; i++) {
            input = matrix_1.default.multiply(this.weights[i], input);
            input.add(this.biases[i]);
            input.map(this.activation);
            O[i] = input;
        }
        let output = O[O.length - 1];
        let error = matrix_1.default.subtract(target, output);
        let gradient = matrix_1.default.map(output, this.dactivation);
        gradient.multiply(error);
        gradient.multiply(this.lr);
        for (let i = O.length - 1; i >= 0; i--) {
            let dw = matrix_1.default.multiply(this.weights[i], gradient);
            this.weights[i].add(dw);
            error = matrix_1.default.multiply(matrix_1.default.transpose(this.weights[i]), error);
            gradient = matrix_1.default.map(O[i], this.dactivation);
            gradient.multiply(error);
            gradient.multiply(this.lr);
        }
    }
    getModel() {
        return this;
    }
    static formModel(model) {
        let nn = new NeuralNetwork(model.nodes, model.lr);
        nn.nodes = model.nodes;
        nn.lr = model.lr;
        nn.activation = model.activation;
        nn.dactivation = model.dactivation;
        return nn;
    }
    copy() {
        let model = this.getModel();
        return NeuralNetwork.formModel(model);
    }
    mutate(func) {
        for (let weight of this.weights) {
            weight.map(func);
        }
        for (let bias of this.biases) {
            bias.map(func);
        }
    }
}
exports.default = NeuralNetwork;
