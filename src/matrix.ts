export default class Matrix {
    rows: number
    cols: number
    data: Float32Array

    constructor(rows: number, cols: number) {
        this.rows = rows
        this.cols = cols
        this.data = new Float32Array(this.rows * this.cols).fill(0)
    }

    static fromArray(arr: Array<number>): Matrix {
        return new Matrix(arr.length, 1).map((e, i, j) => arr[i + j])
    }

    toArray() {
        const arr = new Array()
        for (let i = 0; i < this.rows * this.cols; i++) {
            arr.push(this.data[i])
        }
        return arr
    }

    randomize() {
        return this.map((e, i, j) => Math.random() * 2 - 1)
    }

    map(func: (val: number, i: number, j: number) => number) {
        // Apply a function to every element of matrix
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const idx = i * this.cols + j
                const val = this.data[idx]
                this.data[idx] = func(val, i, j)
            }
        }
        return this
    }
    static map(
        matrix: Matrix,
        func: (val: number, i: number, j: number) => number
    ) {
        const m = matrix.copy()
        for (let i = 0; i < m.rows; i++) {
            for (let j = 0; j < m.cols; j++) {
                const idx = i * m.cols + j
                const val = m.data[idx]
                m.data[idx] = func(val, i, j)
            }
        }
        return m
    }

    copy() {
        let m = new Matrix(this.rows, this.cols)
        for (let i = 0; i < this.rows * this.cols; i++) {
            m.data[i] = this.data[i]
        }
        return m
    }

    print(title?: string) {
        let data = new Array(this.rows).fill(0).map((e, i) =>
            new Array(this.cols).fill(0).map((e, j) => {
                const index = i * this.cols + j
                return this.data[index]
            })
        )
        console.log(title || "", "(", this.rows, "x", this.cols, ")")
        console.table(data)
        return this
    }

    getValue(row: number, col: number): number {
        if (row + 1 > this.rows)
            throw new Error(
                `The row you provided is not in this matrix, There are only ${this.rows} rows`
            )
        if (col + 1 > this.cols)
            throw new Error(
                `The column you provided is not in this matrix, There are only ${this.cols} columns`
            )
        return this.data[row * this.cols + col]
    }

    setValue(row: number, col: number, value: number): void {
        this.data[row * this.cols + col] = value
    }

    add(m: Matrix): Matrix {
        if (this.rows !== m.rows || this.cols !== m.cols) {
            console.error(
                "Columns and Rows of A must match Columns and Rows of B."
            )
            return this
        }
        this.map((val, i, j) => val + m.data[i * m.cols + j])
        return this
    }
    static add(A: Matrix, B: Matrix): Matrix {
        if (A.rows !== B.rows || A.cols !== B.cols) {
            console.error(
                "Columns and Rows of A must match Columns and Rows of B."
            )
            return A
        }
        return new Matrix(A.rows, A.cols).map(
            (val, i, j) => A.data[i * A.cols + j] + B.data[i * A.cols + j]
        )
    }

    static subtract(A: Matrix, B: Matrix): Matrix {
        if (A.rows !== B.rows || A.cols !== B.cols) {
            console.error(
                "Columns and Rows of A must match Columns and Rows of B."
            )
            return A
        }
        // Return a new Matrix a-b
        return new Matrix(A.rows, B.cols).map(
            (_, i, j) => A.data[i * A.cols + j] - B.data[i * A.cols + j]
        )
    }

    subtract(B: Matrix): Matrix {
        if (this.rows !== B.rows || this.cols !== B.cols) {
            console.error(
                "Columns and Rows of A must match Columns and Rows of B."
            )
            return this
        }
        // Return a new Matrix a-b
        this.map((val, i, j) => val - B.data[i * B.cols * j])
        return this
    }

    static transpose(matrix: Matrix): Matrix {
        const m = new Matrix(matrix.cols, matrix.rows)
        for (let i = 0; i < matrix.rows; i++) {
            for (let j = 0; j < matrix.cols; j++) {
                const index = matrix.cols * i + j
                const index2 = matrix.rows * j + i
                m.data[index2] = matrix.data[index]
            }
        }
        return m
    }
    transpose(): Matrix {
        const m = this.copy()
        this.cols = m.rows
        this.rows = m.cols
        for (let i = 0; i < m.rows; i++) {
            for (let j = 0; j < m.cols; j++) {
                const index = m.cols * i + j
                const index2 = m.rows * j + i
                this.data[index2] = m.data[index]
            }
        }
        return this
    }
    multiply(n: number | Matrix): Matrix {
        if (n instanceof Matrix) {
            if (this.cols !== n.rows) {
                console.error("Columns of A must match Rows of B.")
                return this
            }
            const result = new Matrix(this.rows, n.cols)
            for (let i = 0; i < result.rows; i++) {
                for (let j = 0; j < result.cols; j++) {
                    let sum = 0
                    for (let k = 0; k < this.cols; k++) {
                        sum +=
                            this.data[i * this.cols + k] *
                            n.data[k * n.cols + j]
                    }
                    result.data[i * result.cols + j] = sum
                }
            }
            this.rows = result.rows
            this.cols = result.cols
            this.data = result.data
            return this
        } else {
            this.map((val) => val * n)
            return this
        }
    }
    static multiply(A: Matrix, B: Matrix): Matrix {
        if (A.cols !== B.rows) {
            console.error("Columns of A must match rows of B.")
            return A
        }
        const result = new Matrix(A.rows, B.cols)
        for (let i = 0; i < result.rows; i++) {
            for (let j = 0; j < result.cols; j++) {
                let sum = 0
                for (let k = 0; k < A.cols; k++) {
                    sum += A.data[i * A.cols + k] * B.data[k * B.cols + j]
                }
                result.data[i * result.cols + j] = sum
            }
        }
        return result
    }
}
