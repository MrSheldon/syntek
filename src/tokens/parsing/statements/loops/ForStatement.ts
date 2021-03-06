import { $ } from '../../../../structures/rule';
import { Token, TokenMatcher } from '../../../../structures/token';

import tokens from '../../../lexing';
import Expression from '../../expressions/Expression';
import Body from '../../Body';

export class ForStatement extends Token {
  /**
   * The identifier declared in the for loop
   */
  readonly id: Token;

  /**
   * The collection to iterate over
   */
  readonly collection: Token;

  /**
   * The body of the for loop
   */
  readonly body: Token[];

  constructor(location, matchedTokens) {
    super(location, matchedTokens);

    this.id = matchedTokens[1];
    this.collection = matchedTokens[3];
    this.body = matchedTokens[4].slice(1, matchedTokens[4].length - 1);
  }

  build(): string {
    const id = this.id.build();
    const collection = this.collection instanceof tokens.Identifier ? `this.get('${this.collection.build()}')` : this.collection.build();
    const body = this.body.map(token => token.build()).join(';');

    return `new s.ForFlow(this,'${id}',${collection},function(){${body}})`;
  }
}

export const ForStatementMatcher = new TokenMatcher(ForStatement, $.SEQ(
  tokens.For,
  tokens.Identifier,
  tokens.In,
  Expression,
  Body,
));
