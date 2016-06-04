'use strict';
var format = require('util').format;

/**
 * 根据options解析argv数组
 * @param {Array} argv process.argv
 * @param {Array} options 需要的选项
 * @param {String} optionStartWith option以什么为开头
 * @return {Object}
 */
module.exports = function(argv, options, optionStartWith) {
  var ret = {};
  var currentOption;
  optionStartWith = optionStartWith || '-';
  for(var index = 0; index < argv.length; index ++) {
    if(argv[index][0] === optionStartWith) {
      currentOption = argv[index];
      if(options[currentOption] !== undefined) {
        ret[currentOption] = [];
        switch (typeof options[currentOption]) {
          case 'string':
            if(options[currentOption] !== 'multiple') {
              throw new Error(format('invalid option count string [%s], can only accept string "multiple"', options[currentOption]));
            }
            break;
          case 'number':
            var parameterCount = options[currentOption];
            for(var count = 1; count <= parameterCount; count++) {
              ret[currentOption].push(argv[++index]);
            }
            currentOption = null;
            break;
          default:
            throw new Error(format('invalid option count [%s] type [%s], can only accept number and string "multiple"', options[currentOption],typeof options[currentOption]));
        }
      }
      else {
        throw new Error(format('invalid option [%s]', argv[index]));
      }
    }
    else if(currentOption){
      ret[currentOption].push(argv[index]);
    }
  }
  return ret;
};
