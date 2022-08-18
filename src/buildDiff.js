import _ from 'lodash';

const makeNested = (key, type, status, children) => {
  const object = {
    key, type, status, children,
  };
  return object;
};
const makePlain = (key, type, status, value) => {
  const object = {
    key, type, status, value,
  };
  return object;
};

const buildDiff = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();
  const tree = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (!Object.hasOwn(data1, key)) {
      return makePlain(key, 'plain', 'added', value2);
    }
    if (!Object.hasOwn(data2, key)) {
      return makePlain(key, 'plain', 'deleted', value1);
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return makeNested(key, 'nested', 'changed', buildDiff(value1, value2));
    }
    if (value1 === value2) {
      return makePlain(key, 'plain', 'unchanged', value1);
    }
    return makePlain(key, 'plain', 'changed', [value1, value2]);
  });
  return tree;
};

export default buildDiff;
