const _ = require('lodash');

/**
 * Форматирует число в toLocaleString
 * @param {number} num 
 * @param {string} locale 
 */

function tls(num, locale='ru-RU') {
  const parsed = +num;
  if (_.isNumber(parsed)) {
    return parsed.toLocaleString(locale);
  } 
  return number
}

module.exports.tls = tls;