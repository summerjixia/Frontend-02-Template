let assert = require("assert");
// let add = require("../add.js");
import { add, mul } from "../add.js";

describe('add function testing', function () {
    it('1+2 should be 3', function () {
        assert.equal(add(1, 2), 3);
    });
    it('-5+2 should be -3', function () {
        assert.equal(add(-5, 2), -3);
    });
    it('1*2 should be 2', function () {
        assert.equal(mul(1, 2), 2);
    });
    it('-5*2 should be -10', function () {
        assert.equal(mul(-5, 2), -10);
    });
});

//测试环节依赖build不好