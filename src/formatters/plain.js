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
      switch (obj.type) {
        case 'nested':
          return iter(obj.children, `${path}${obj.key}.`);
        case 'added':
          return `Property '${path}${obj.key}' was added with value: ${stringify(obj.value)}`;
        case 'deleted':
          return `Property '${path}${obj.key}' was removed`;
        case 'changed':
          return `Property '${path}${obj.key}' was updated. From ${stringify(obj.value1)} to ${stringify(obj.value2)}`;
        default:
          return 'unchanged property';
      }
    });
    const treeWithoutUnchanges = plainTree.filter((node) => node !== 'unchanged property');
    return treeWithoutUnchanges.join('\n');
  };
  return iter(tree, '');
};

export default getPlain;
