/* a Stack for PEGjs */

  /** 
   * @constructor 
   * @example
   *  { //initializer
   *    var util = require('util');
   *    console.log(process.cwd());
   *    var PEGStack = require('@ull-esit-pl/peg-stack');
   *    console.log('PEGStack = '+util.inspect(PEGStack));
   *    var stack = new PEGStack();
   *    var action = function() {
   *      var [val1, op, val2] = stack.pop(3);
   *      stack.push(eval(val1+op+val2)); 
   *    }
   *  }
  */
  function PEGStack() {
    this.stack = []; 
    this.debug = false;
    return true; 
  }
  
  /**
   * @param {boolean} value - Switch the log messages on
   */
  PEGStack.prototype.setDebug =function(value) {
    this.debug = value;
  };
  
  /**
   * @param {String} values ... - log the messages if debug is true
   */
  PEGStack.prototype.log =function() {
    if (this.debug) console.log([].slice.call(arguments).join(''));
  };

  /**
   * receives an unlimited number of arguments to push
   * @example
   * sum     = first:product &{ return stack.push(first); } 
   *             (op:[+-] product:product 
   *             &{ stack.push(op, product); return stack.make(action); })* 
   *             { return stack.pop(); } 
   * @returns {true}  to keep parsing
   */
  PEGStack.prototype.push = function() {
    var that = this;
     [].slice.call(arguments).forEach( function(value) {
      that.stack.push(value);
    });
    this.log("push: ",this.stack);
    return true;
  }

  /**
   * @param {function} action - The action parameter
   * is a function that the stack 
   * to receive the params
   * and pushes the result 
   */
  PEGStack.prototype.make = function(action) {
    try {
      action(); 
      this.log(this.stack);
    }
    catch(e) {
      console.error('Error! '+e.message);
    }
    return true;
  };

  /**
   * @param {number} count - Number of items to pop
   */
   PEGStack.prototype.pop = function(count) {
     count = count || 1;
     var result = this.stack.splice(-count, count);
     this.log('pop: '+result);
     if (result.length == 1) result = result.shift();
     return result;
   }

   PEGStack.prototype.top = function(depth) {
     var d = this.stack.length  - (depth+1);
     return this.stack[d];
   }

module.exports = PEGStack;
