// This is extracted from the JSON-COLORIZER
// Thanks to Joe Attardi for make this repo and his contributors!
// Adapted to Typescript By Teo!
// https://github.com/joeattardi/json-colorizer/blob/master/src/lib/lexer.js

const tokenTypes = [
  { regex: /^\s+/, tokenType: 'WHITESPACE' },
  { regex: /^[{}]/, tokenType: 'BRACE' },
  { regex: /^[[\]]/, tokenType: 'BRACKET' },
  { regex: /^:/, tokenType: 'COLON' },
  { regex: /^,/, tokenType: 'COMMA' },
  { regex: /^-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/i, tokenType: 'NUMBER_LITERAL' },
  { regex: /^"(?:\\.|[^"\\])*"(?=\s*:)/, tokenType: 'STRING_KEY' },
  { regex: /^"(?:\\.|[^"\\])*"/, tokenType: 'STRING_LITERAL' },
  { regex: /^true|^false/, tokenType: 'BOOLEAN_LITERAL' },
  { regex: /^null/, tokenType: 'NULL_LITERAL' },
];

interface optionsTokens {
  pretty?: boolean;
}

export function getTokens(json: string, options: optionsTokens = {}) {
  let input;

  if (options.pretty) {
    const inputObj = typeof json === 'string' ? JSON.parse(json) : json;
    input = JSON.stringify(inputObj, null, 2);
  } else {
    input = typeof json === 'string' ? json : JSON.stringify(json);
  }

  const tokens = [];
  let foundToken;

  do {
    foundToken = false;
    for (let i = 0; i < tokenTypes.length; i++) {
      const match = tokenTypes[i].regex.exec(input);
      if (match) {
        tokens.push({ type: tokenTypes[i].tokenType, value: match[0] });
        input = input.substring(match[0].length);
        foundToken = true;
        break;
      }
    }
  } while (_allTokensAnalyzed(input, foundToken));

  return tokens;
}

/**
 * @author Willian Magalhães Gonçalves
 * @description Are all tokens analyzed?
 * @param {*} input - Input
 * @param {*} foundToken - Found token
 * @returns {boolean} checkResult - Check result
 * @private
 */
// deno-lint-ignore no-explicit-any
function _allTokensAnalyzed(input: any, foundToken: boolean) {
  const safeInput = input || {};

  const inputLength = safeInput.length;
  return inputLength > 0 && foundToken;
}
