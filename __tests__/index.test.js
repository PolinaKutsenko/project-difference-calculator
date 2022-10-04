import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const casesWithFormat = [
  ['file1.yaml', 'file2.yaml', 'result_plain.txt', 'plain'],
  ['file1.json', 'file2.json', 'result_plain.txt', 'plain'],
  ['file1.yaml', 'file2.yaml', 'result_json.txt', 'json'],
  ['file1.json', 'file2.json', 'result_json.txt', 'json'],
  ['file1.yaml', 'file2.yaml', 'result_stylish.txt', 'stylish'],
  ['file1.json', 'file2.json', 'result_stylish.txt', 'stylish'],
];

const casesWithDefaultFormat = [
  ['file1.yaml', 'file2.yaml', 'result_stylish.txt'],
  ['file1.json', 'file2.json', 'result_stylish.txt'],
];

test.each(casesWithFormat)('genDiff main functional', (file1, file2, result, format) => {
  const resultFile = readFile(result);
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  expect(genDiff(filepath1, filepath2, format)).toEqual(resultFile);
});

test.each(casesWithDefaultFormat)('genDiff without banner --format', (file1, file2, result) => {
  const resultFile = readFile(result);
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  expect(genDiff(filepath1, filepath2)).toEqual(resultFile);
});
