import NeuralNetwork from "./"

const nn = new NeuralNetwork([2, 10, 2])

for (let i = 0; i < 100000; i++) {
    nn.train(
        [
            [1, 0],
            [0, 0],
            [0, 1],
            [1, 1],
        ],
        [
            [0, 1],
            [1, 0],
            [0, 1],
            [0, 1],
        ]
    )
}
const o = nn.query([
    [1, 0],
    [0, 1],
    [1, 1],
    [0, 0],
])
console.log(o)
