var should = require('chai').should();

var grammar = `
  {
    var util = require('util');
    var PEGStack = require('peg-stack.js');
    console.log('PEGStack = '+util.inspect(PEGStack));
    var stack = new PEGStack();
    var action = function() {
      var [val1, op, val2] = stack.pop(3);
      stack.push(eval(val1+op+val2)); 
    }
  }

  sum     = first:product &{ return stack.push(first); } 
            (op:[+-] product:product 
              &{ stack.push(op, product); return stack.make(action); })* 
               { return stack.pop(); } 
  product = first:value &{ return stack.push(first); } 
            (op:[*/] value:value 
              &{ stack.push(op, value); return stack.make(action); })* 
               { return stack.pop(); } 
  value   = number:$[0-9]+                     { return parseInt(number,10); }
          / '(' sum:sum ')'                    { return sum; }
`;

describe('PEGStack', function() {
  var peg = require("pegjs");
  var parser = peg.generate(grammar);
  it('computes 3*2-4/2+1', function() {
    parser.parse('3*2-4/2+1').should.equal(5);
  });
  it('computes 3*((2-4)/2-1)', function() {
    parser.parse('3*((2-4)/2-1)').should.equal(-6);
  });
});

