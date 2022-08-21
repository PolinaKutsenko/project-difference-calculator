import fs from 'fs';
import path from 'path';
import parser from './parsers.js';
import buildDiff from './buildDiff.js';
import format from './formatters/index.js';

const getPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getPath(filepath), 'utf-8');
const getFormat = (filepath) => path.extname(filepath);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);

  const data1 = parser(file1, getFormat(filepath1));
  const data2 = parser(file2, getFormat(filepath2));

  const buildDiffTree = buildDiff(data1, data2);
  return format(buildDiffTree, formatName);
};

export default genDiff;
