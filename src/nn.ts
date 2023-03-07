import Matrix from "./matrix"

export default class NeuralNetwork {
    nodes: Array<number>
    lr: number
    activation: (x: number) => number
    dactivation: (y: number) => number
    weights: Array<Matrix>
    biases: Array<Matrix>

    constructor(arr: Array<number>, lr?: number) {
        this.nodes = arr
        this.lr = lr || 0.01
        this.activation = NeuralNetwork.sigmoid
        this.dactivation = NeuralNetwork.dsigmoid
        this.weights = new Array(this.nodes.length - 1)
        this.biases = new Array(this.nodes.length - 1)
        for (let i = 0; i < this.nodes.length - 1; i++) {
            this.weights[i] = new Matrix(
                this.nodes[i + 1],
                this.nodes[i]
            ).randomize()
        }
        for (let i = 1; i < this.nodes.length; i++) {
            this.biases[i - 1] = new Matrix(this.nodes[i], 1).randomize()
        }
    }
    static tanh(x: number): number {
        var y = Math.tanh(x)
        return y
    }
    static dtanh(x: number): number {
        var y = 1 / Math.pow(Math.cosh(x), 2)
        return y
    }
    static sigmoid(x: number): number {
        return 1 / (1 + Math.exp(-x))
    }
    static dsigmoid(y: number): number {
        return y * (1 - y)
    }
    query(inputs: Array<Array<number>>): Array<Array<number>> {
        const length = inputs.length

        const O = new Array(length)
        // lopping on the inputs
        for (let a = 0; a < length; a++) {
            // query
            let input = Matrix.fromArray(inputs[a])
            for (let i = 0; i < this.weights.length; i++) {
                input = Matrix.multiply(this.weights[i], input)
                input.add(this.biases[i])
                input.map(this.activation)
            }
            O[a] = input.toArray()
        }
        return O
    }

    train(inputs: Array<Array<number>>, targets: Array<Array<number>>) {
        if (inputs.length !== targets.length)
            throw new Error(
                "Length og Inputs is not equal to the Target values"
            )

        for (let b = 0; b < targets.length; b++) {
            // training starts here
            const target = Matrix.fromArray(targets[b])

            const O = new Array()

            let input = Matrix.fromArray(inputs[b])
            O.push(input)
            for (let i = 0; i < this.weights.length; i++) {
                input = Matrix.multiply(this.weights[i], input)
                input.add(this.biases[i])
                input.map(this.activation)
                O.push(input)
            }
            const output = O[O.length - 1]
            let error = Matrix.subtract(target, output)

            for (let i = O.length - 1; i > 0; i--) {
                console.log(i)
                let gradient = Matrix.multiply(
                    error,
                    Matrix.map(O[i], this.dactivation)
                )
                gradient.multiply(O[i - 1].transpose())

                gradient.print("gradient")
                // const dB = Matrix.multiply(gradient, error)

                error = Matrix.multiply(
                    Matrix.transpose(this.weights[i]),
                    error
                ) // hidden errors
            }
            // ends
        }
    }

    getModel(): NeuralNetwork {
        return this
    }
    static formModel(model: NeuralNetwork): NeuralNetwork {
        let nn = new NeuralNetwork(model.nodes, model.lr)
        nn.nodes = model.nodes
        nn.lr = model.lr
        nn.activation = model.activation
        nn.dactivation = model.dactivation

        return nn
    }
    copy(): NeuralNetwork {
        let model = this.getModel()
        return NeuralNetwork.formModel(model)
    }
    mutate(func: (val: number, i: number) => number) {
        for (let weight of this.weights) {
            weight.map(func)
        }
        for (let bias of this.biases) {
            bias.map(func)
        }
    }
}
