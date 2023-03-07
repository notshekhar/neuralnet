import Matrix from "./matrix";
export default class NeuralNetwork {
    nodes: Array<number>;
    lr: number;
    activation: (x: number) => number;
    dactivation: (y: number) => number;
    weights: Array<Matrix>;
    biases: Array<Matrix>;
    constructor(arr: Array<number>, lr?: number);
    static tanh(x: number): number;
    static dtanh(x: number): number;
    static sigmoid(x: number): number;
    static dsigmoid(y: number): number;
    query(inputs: Array<Array<number>>): Array<Array<number>>;
    train(inputs: Array<number>, targets: Array<number>): void;
    getModel(): NeuralNetwork;
    static formModel(model: NeuralNetwork): NeuralNetwork;
    copy(): NeuralNetwork;
    mutate(func: (val: number, i: number) => number): void;
}
