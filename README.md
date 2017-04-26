PEGStack
=========

A minimal node module providing utility methods to work with PEG.js semantic predicates


## Installation

```shell
  npm install @ull-esit-pl/peg-stack --save
```

## Usage

```js
  {
    var util = require('util');
    console.log(process.cwd());
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
```

## Tests

```shell
   npm test
```

## API Documents

[See Documentation at https://ull-esit-pl-1617.github.io/peg-stack/](https://ull-esit-dsi-1617.github.io/peg-stack/)

To generate the docs we use [documentation.js](http://documentation.js.org/):

```shell
   npm run doc
```

Install `$ npm install -g documentation`


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 1.0.0 Initial release
