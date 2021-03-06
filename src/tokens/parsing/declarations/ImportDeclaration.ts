import { $ } from '../../../structures/rule';
import { Token, TokenMatcher, DeclarationToken } from '../../../structures/token';

import tokens from '../../lexing';

export class ImportDeclaration extends DeclarationToken {
  /**
   * The type of the import. `module` for predeclared modules, `file` for project files.
   */
  readonly type: 'module' | 'file';

  /**
   * The source of the module
   */
  readonly source: Token;

  constructor(location, matchedTokens) {
    const type = matchedTokens[1] instanceof tokens.Identifier ? 'module' : 'file';
    const source = matchedTokens[1];

    let id;
    if (type === 'module') {
      id = matchedTokens[2][1] || source;
    } else {
      id = matchedTokens[2][1];
    }

    super(id, location, matchedTokens);

    this.type = type;
    this.source = source;
  }

  build(): string {
    const id = this.id;
    const source = this.source.build();

    return `this.declare('${id}',s.ModuleStruct,i.getModule('${source}'))`;
  }
}

export const ImportDeclarationMatcher = new TokenMatcher(ImportDeclaration, $.SEQ(
  tokens.Import,

  $.OR(
    tokens.Identifier,
    tokens.StringLiteral,
  ),

  $.OPT(
    $.SEQ(
      tokens.As,
      tokens.Identifier,
    ),
  ),
));
