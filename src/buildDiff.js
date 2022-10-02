import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
  const tree = keys.map((key) => {
    const value1 = data1[key] ?? null;
    const value2 = data2[key] ?? null;
    if (!Object.hasOwn(data1, key)) {
      return {
        key, type: 'added', value: value2,
      };
    }
    if (!Object.hasOwn(data2, key)) {
      return {
        key, type: 'deleted', value: value1,
      };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        key, type: 'nested', children: buildDiff(value1, value2),
      };
    }
    if (value1 === value2) {
      return {
        key, type: 'unchanged', value: value1,
      };
    }
    return {
      key, type: 'changed', value: [value1, value2],
    };
  });
  return tree;
};

export default buildDiff;
