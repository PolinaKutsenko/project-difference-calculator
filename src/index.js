import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getFormat from './parser.js';

const getPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getPath(filepath), 'utf-8');

const genDiff = (filepath1, filepath2) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const obj1 = getFormat(file1, filepath1.split('.')[1]);
  const obj2 = getFormat(file2, filepath2.split('.')[1]);

  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();
  const result = keys.map((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return `  + ${key}: ${obj2[key]}`;
    }
    if (!Object.hasOwn(obj2, key)) {
      return `  + ${key}: ${obj1[key]}`;
    }
    if (obj1[key] === obj2[key]) {
      return `    ${key}: ${obj1[key]}`;
    } return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
  });
  return ['{', ...result, '}'].join('\n');
};

export default genDiff;
