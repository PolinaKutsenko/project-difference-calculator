import _ from 'lodash';

const stringify = (value) => {
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
      switch (obj.type) {
        case 'added':
          return `Property '${path}${obj.key}' was added with value: ${stringify(obj.value)}`;
        case 'deleted':
          return `Property '${path}${obj.key}' was removed`;
        case 'changed':
          return `Property '${path}${obj.key}' was updated. From ${stringify(obj.value[0])} to ${stringify(obj.value[1])}`;
        default:
          return null;
      }
    });
    const treeWithoutEmpties = plainTree.filter((node) => node !== null);
    return treeWithoutEmpties.join('\n');
  };
  return iter(tree, '');
};

export default getPlain;
