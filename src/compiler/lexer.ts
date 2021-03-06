import { Token, TokenMatcher } from '../structures/token';
import Utils from '../utils';

import lexingTokens from '../tokens/lexing';

import Indent from '../tokens/Indent';
import Outdent from '../tokens/Outdent';

const tokenMatchers: TokenMatcher[] = Utils.objectValues(lexingTokens).filter(token => token.Class);

export default function lexer(input: string, fileName: string): Token[] {
  const tokens: Token[] = [];
  let index = 0;

  let previousIndent = Utils.getIndent(input, 1);

  while (index < input.length) {
    const { line, row } = Utils.lineRow(input, index);
    let matched = false;

    for (const tokenMatcher of tokenMatchers) {
      const match = input.slice(index).match(tokenMatcher.regex);

      if (match) {
        const currentIndent = Utils.getIndent(input, line);

        if (currentIndent > previousIndent) {
          tokens.push(
            ...Utils.createArray(currentIndent - previousIndent).map(() => new Indent({
              start: index,
              end: index,
            }, '\t')),
          );
        } else if (currentIndent < previousIndent) {
          tokens.push(
            ...Utils.createArray(previousIndent - currentIndent).map(() => new Outdent({
              start: index,
              end: index,
            }, '')),
          );
        }

        previousIndent = currentIndent;

        const location = { start: index, end: index + match[0].length };
        tokens.push(new tokenMatcher.Class(location, match[0]));

        index += match[0].length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      throw new Error(`Unexpected token ${input.slice(index, index + 1)} at ${fileName}(${line}:${row})`);
    }
  }

  tokens.push(
    ...Utils.createArray(previousIndent).map(() => new Outdent({
      start: index,
      end: index,
    }, '')),
  );

  return tokens;
}
