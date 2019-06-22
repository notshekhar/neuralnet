class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
  }


  static fromArray(arr) {
    return new Matrix(arr.length, 1).map((e, i) => arr[i]);
  }

  static subtract(a, b) {
    if(a.rows!==b.rows || a.cols!==b.cols){
      console.log('Columns and Rows of A must match Columns and Rows of B.');
      return;
    }

    // Return a new Matrix a-b
    return new Matrix(a.rows, a.cols)
      .map((_, i, j) => a.data[i][j] - b.data[i][j]);
  }

  toArray() {
    let arr = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        arr.push(this.data[i][j]);
      }
    }
    return arr;
  }

  randomize() {
    return this.map(e => Math.random() * 2 - 1);
  }

  add(n) {
    if (n instanceof Matrix) {
      if(this.rows!==n.rows || this.cols!==n.cols){
        console.log('Columns and Rows of A must match Columns and Rows of B.');
        return;
      }
        return this.map((e, i, j) => e + n.data[i][j]);
    } else {
      return this.map(e => e + n);
    }
  }

  static transpose(matrix) {
    return new Matrix(matrix.cols, matrix.rows)
      .map((_, i, j) => matrix.data[j][i]);
  }

  static multiply(a, b) {
    // Matrix product
    if (a.cols !== b.rows) {
      console.log('Columns of A must match rows of B.')
      return;
    }

    return new Matrix(a.rows, b.cols)
      .map((e, i, j) => {
        // Dot product of values in col
        let sum = 0;
        for (let k = 0; k < a.cols; k++) {
          sum += a.data[i][k] * b.data[k][j];
        }
        return sum;
      });
  }

  multiply(n) {
    if (n instanceof Matrix) {
      if(this.rows!==n.rows || this.cols!==n.cols){
        console.log('Columns and Rows of A must match Columns and Rows of B.');
        return;
      }

      // hadamard product
      return this.map((e, i, j) => e * n.data[i][j]);
    } else {
      // Scalar product
      return this.map(e => e * n);
    }
  }

  map(func) {
    // Apply a function to every element of matrix
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let val = this.data[i][j];
        this.data[i][j] = func(val, i, j);
      }
    }
    return this;
  }

  static map(matrix, func) {
    // Apply a function to every element of matrix
    return new Matrix(matrix.rows, matrix.cols)
      .map((e, i, j) => func(matrix.data[i][j], i, j));
  }

  print() {
    console.table(this.data);
    return this;
  }

  serialize() {
    return JSON.stringify(this);
  }

  static deserialize(data) {
    if(typeof data == 'string')
    {
      data = JSON.parse(data);
    }
    let matrix = new Matrix(data.rows, data.cols);
    matrix.data = data.data;
    return matrix;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Matrix;
}

class math {
  constructor() {

  }
  static findmax(arr){
    let n = 0;
    let m;
    for (var i = 0; i < arr.length; i++) {
        if(arr[i]>n){
        m = i;
       n = arr[i];
      }
    }
            return m;
  }

  static add(a,b){
    return a+b;
  }
  static subtract(a,b){
    return a-b;
  }
  static multiply(a,b){
    return a*b;
  }
  static divide(a,b){
    return a/b;
  }
  static sumArray(arr){
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum+=arr[i];
    }
    return sum;
  }
  static turn(arr){
    for(let i=0; i<arr.length; i++){
      if(arr[i]>0.5){
        arr[i]=1;
      }else {
        arr[i]=0;
      }
    }
    return arr;
  }
  static pixr(url, a, b){
    let i = new Image(a,b);
    i.src = url;
    let canva = document.createElement("canvas");
    canva.height = i.height;
    canva.width = i.width;
    let ctx = canva.getContext("2d");
    let red=[];
    let green=[];
    let blue=[];
    let alpha=[];
    i.onload = function(){
      ctx.drawImage(i, 0, 0, i.width, i.height);
      // console.log(canva.toDataURL());
      let d = ctx.getImageData(0,0,canva.width,canva.height).data;
      for(let i=0; i<d.length; i+=4){
        red.push(d[i]);
        green.push(d[i+1]);
        blue.push(d[i+2]);
        alpha.push(d[i+3]);
      }
      // console.log({"red":red, "green": green, "blue": blue, "alpha": alpha});
    }
    return {"red":red, "green": green, "blue": blue, "alpha": alpha}
  }


}