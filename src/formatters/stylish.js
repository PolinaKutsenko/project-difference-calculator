import _ from 'lodash';

const getIndent = (depth) => {
  const replacer = '  ';
  const spacesCount = 2;
  const indent = depth * spacesCount;
  const indents = {
    stringifyObj: {
      beginIndent: replacer.repeat(indent + 2),
      endIndent: replacer.repeat(indent),
    },
    changedObj: {
      beginIndent: replacer.repeat(indent - 1),
      endIndent: replacer.repeat(indent - 2),
    },
  };
  return indents;
};

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const indent = getIndent(depth);
  const keys = _.keys(data);
  const result = keys.map((key) => `${indent.stringifyObj.beginIndent}${key}: ${stringify(data[key], depth + 1)}`);
  return ['{', ...result, `${indent.stringifyObj.endIndent}}`].join('\n');
};

const stylish = (tree) => {
  const iter = (diff, depth) => {
    const indent = getIndent(depth);
    const { beginIndent } = indent.changedObj;
    const { endIndent } = indent.changedObj;
    const result = diff.map((obj) => {
      switch (obj.type) {
        case 'nested':
          return `${beginIndent}  ${obj.key}: ${iter(obj.children, depth + 1)}`;
        case 'changed': {
          const value1 = `${beginIndent}- ${obj.key}: ${stringify(obj.value1, depth)}`;
          const value2 = `${beginIndent}+ ${obj.key}: ${stringify(obj.value2, depth)}`;
          return [value1, value2].join('\n');
        }
        case 'added':
          return `${beginIndent}+ ${obj.key}: ${stringify(obj.value, depth)}`;
        case 'deleted':
          return `${beginIndent}- ${obj.key}: ${stringify(obj.value, depth)}`;
        default:
          return `${beginIndent}  ${obj.key}: ${stringify(obj.value, depth)}`;
      }
    });
    return ['{', ...result, `${endIndent}}`].join('\n');
  };
  return iter(tree, 1);
};

export default stylish;
