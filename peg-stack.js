/* a local variable per syntactic variable */

  function PEGStack() {
    this.stack = []; 
    this.debug = false;
    return true; 
  }
  
  PEGStack.prototype.setDebug =function(value) {
    this.debug = value;
  };
  
  PEGStack.prototype.log =function() {
    if (this.debug) console.log([].slice.call(arguments).join(''));
  };

  PEGStack.prototype.push = function() {
    var that = this;
     [].slice.call(arguments).forEach( function(value) {
      that.stack.push(value);
    });
    this.log("push: ",this.stack);
    return true;
  }

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
