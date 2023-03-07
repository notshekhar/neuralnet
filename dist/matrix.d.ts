export default class Matrix {
    rows: number;
    cols: number;
    data: Float32Array;
    constructor(rows: number, cols: number);
    static fromArray(arr: Array<number>): Matrix;
    toArray(): any[];
    randomize(): this;
    map(func: (val: number, i: number, j: number) => number): this;
    static map(matrix: Matrix, func: (val: number, i: number, j: number) => number): Matrix;
    copy(): Matrix;
    print(): this;
    getValue(row: number, col: number): number;
    setValue(row: number, col: number, value: number): void;
    add(m: Matrix): Matrix;
    static add(A: Matrix, B: Matrix): Matrix;
    static subtract(A: Matrix, B: Matrix): Matrix;
    subtract(B: Matrix): Matrix;
    static transpose(matrix: Matrix): Matrix;
    transpose(): Matrix;
    multiply(n: number | Matrix): Matrix;
    static multiply(A: Matrix, B: Matrix): Matrix;
}
