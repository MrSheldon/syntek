import { Token, TokenMatcher } from '../../../../structures/token';

export class This extends Token {
  build(): string {
    return "this.get('this')";
  }
}

export const ThisMatcher = new TokenMatcher(This, /^this?(?!\w)/);
