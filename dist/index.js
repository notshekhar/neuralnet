"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nn_1 = __importDefault(require("./nn"));
const nn = new nn_1.default([2, 10, 2]);
// for (let i = 0; i < 1; i++) {
//     nn.train([1, 0], [0, 1])
// }
const o = nn.query([[1, 0], [0, 1], [1, 1], [0, 0]]);
console.log(o);
