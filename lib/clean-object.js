const { compose, reduce, isEmpty, assoc, toPairs } = require('ramda');

module.exports = (obj) =>
  compose(
    reduce((acc, val) => isEmpty(val[0]) || isEmpty(val[1]) || val[0] == null || val[1] == null ? acc : assoc(val[0], val[1], acc), {}),
    toPairs
  )(obj);
