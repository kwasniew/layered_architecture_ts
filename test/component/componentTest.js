"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var app_1 = require("../../src/app");
describe('Book inventory', function () {
    it('allows to stock up the items', function (done) {
        supertest_1.default(app_1.app)
            .post('/book')
            .send({
            title: "JavaScript in Action",
            authors: ["James Smith", "Kate Donovan"],
            isbn: "0123456789",
            description: "The ultimate JS book!"
        })
            .set('Content-Type', 'application/json')
            .expect(200, {
            title: "JavaScript in Action",
            authors: ["James Smith", "Kate Donovan"],
            isbn: "0123456789",
            description: "The ultimate JS book!"
        }, done);
    });
});
