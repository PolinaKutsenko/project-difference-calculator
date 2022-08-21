import _ from 'lodash';

const getType = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};
const getPlain = (tree) => {
  const iter = (structure, path) => {
    const plainTree = structure.flatMap((obj) => {
      if (obj.type === 'nested') {
        return iter(obj.children, `${path}${obj.key}.`);
      }
      switch (obj.status) {
        case 'added':
          return `Property '${path}${obj.key}' was added with value: ${getType(obj.value)}`;
        case 'deleted':
          return `Property '${path}${obj.key}' was removed`;
        case 'changed':
          return `Property '${path}${obj.key}' was updated. From ${getType(obj.value[0])} to ${getType(obj.value[1])}`;
        default:
          return [];
      }
    });
    return plainTree.join('\n');
  };
  return iter(tree, '');
};

export default getPlain;
