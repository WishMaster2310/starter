
function loop(list, limit) {
  const result = [];
  let counter = 0;
  for (let i = 0; i < limit; i++) {
    result.push(list[counter]);
    counter = list[counter + 1] ? counter + 1 : 0;
  }
  return result
}
module.exports.loop = loop