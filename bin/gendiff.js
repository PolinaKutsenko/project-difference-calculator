#!/usr/bin/env node
import genDiff from '../src/index.js'
import { Command } from 'commander/esm.mjs';

const program = new Command();

program

  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2));
  });

program.parse();