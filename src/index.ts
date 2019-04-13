import * as treeify from 'treeify';

import Utils from './utils';

import lexer from './compiler/lexer';
import parser from './compiler/parser';

import lexingTokens from './tokens/lexing';
import parsingTokens from './tokens/parsing';

console.log(lexingTokens);
console.log(parsingTokens);

// const input = `function multiply(a, b)
// \tsum = 0
// \trepeat b times
// \t\tsum = sum + a
// \treturn sum
//
// function pow(base, exponent)
// \tsum = base
// \trepeat exponent - 1 times
// \t\tsum = multiply(sum, base)
// \treturn sum`;
const input = '2 * (5 + 10)';
(document.getElementById('input') as HTMLElement).innerText = input;

const lexed = lexer(input);
console.log(lexed);
(document.getElementById('tokens') as HTMLElement).innerText = lexed
  .map(token => `${Utils.padRight(token.index, 4)} - ${Utils.padRight(token.name, 10)} - ${token.raw.replace(/\n/, '')}`)
  .join('\n');

const parsed = parser(lexed);
console.log(parsed);
Utils.removeProp(parsed, 'index');
(document.getElementById('tree') as HTMLElement).innerText = treeify.asTree(parsed, true, true);
