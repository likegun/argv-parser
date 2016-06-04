### argvParser

Module for parse argv options.

Example:

~~~javascript
var argvParser = require('argv-parser');
var argv = [
  'node',
  'index.js',
  '-f',
  'a.js',
  '-r',
  '-watch',
  1,
  2,
  3
];
var options = {
  '-f': 1, // count of the option parameters
  '-r': 0,
  '-watch': 'multiple', //include all follow parameters until find next option
};
var ret = argvParser(argv, options);
console.log(ret);
~~~

Output:

~~~javascript
{
  '-f': ['a.js'],
  '-r': [],
  '-watch': [1, 2, 3]
}
~~~

If your options are not starting with '-' but another character like  "--",try `argvParser(argv, options, '--')`.
