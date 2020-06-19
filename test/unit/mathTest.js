"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
describe('Math in JS', function () {
    it('should support addition', function (done) {
        setTimeout(function () {
            assert_1.default.strictEqual(1 + 1, 2);
            done();
        }, 100);
    });
});
