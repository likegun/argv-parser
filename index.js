'use strict';
var format = require('util').format;

function isOption(options, name, optionStartWith) {
  return Boolean(name[0] === optionStartWith && options[name] !== undefined);
}

/**
 * 根据options解析argv数组
 * @param {Array} argv process.argv
 * @param {Array} options 需要的选项
 * @param {String} optionStartWith option以什么为开头
 * @return {Object}
 */
module.exports = function(argv, options, optionStartWith) {
  var ret = {};
  optionStartWith = optionStartWith || '-';
  for(var i = 0; i < argv.length; i ++) {
    if(isOption(options, argv[i], optionStartWith)) {
      var optionName = argv[i];
      ret[optionName] = [];
      for(var j = i + 1; j < argv.length; j++) {
        if(isOption(options, argv[j], optionStartWith))
          break;
        else {
          ret[optionName].push(argv[j]);
          i++;
        }
      }
    }
    else {
      throw new Error(format('invalid option [%s]', argv[i]));
    }
  }
  for(var key in ret) {
    switch (parseInt(options[key])) {
      case 0:
        if(ret[key].length !== 0) {
          throw new Error(format('option [%s] should not have any arguments,but get %s.', key, ret[key].toString()));
        }
        ret[key] = true;
        break;
      case 1:
        if(ret[key].length !== 1) {
          throw new Error(format('option [%s] must have only 1 argument,but get %s.', key, ret[key].toString()));
        }
        ret[key] = ret[key][0];
        break;
      default:
        if(ret[key].length !== parseInt(options[key])) {
          throw new Error(format('option [%s] must have %d arguments,but get %s.', key, parseInt(options[key]), ret[key].toString()));
        }
    }
  }
  return ret;
};
