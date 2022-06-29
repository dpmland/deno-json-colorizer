// Interfaces!!

export interface optionsColorize {
  colors?: Record<string, number[]>;
}

export interface tokenParams {
  type: string;
  value: string;
}

interface Code {
  open: string;
  close: string;
  regexp: RegExp;
}

/**
 * Extracted from https://deno.land/std@0.145.0/fmt/colors.ts
 *
 * Using only the constructor functions from here
 *
 * Thanks to the Deno STD!
 */

// deno-lint-ignore no-explicit-any
const { Deno } = globalThis as any;
const noColor = typeof Deno?.noColor === 'boolean'
  ? Deno.noColor as boolean
  : true;

const enabled = !noColor;

/**
 * Builds color code
 * @param open
 * @param close
 */
function code(open: number[], close: number): Code {
  return {
    open: `\x1b[${open.join(';')}m`,
    close: `\x1b[${close}m`,
    regexp: new RegExp(`\\x1b\\[${close}m`, 'g'),
  };
}

/**
 * Applies color and background based on color code and its associated text
 * @param str text to apply color settings to
 * @param code color code to apply
 */
function run(str: string, code: Code): string {
  return enabled
    ? `${code.open}${str.replace(code.regexp, code.open)}${code.close}`
    : str;
}

/**
 * Custom Functions and the Magic
 */

const defaultColors: Record<string, number[]> = {
  BRACE: [90, 39],
  BRACKET: [90, 39],
  COLON: [90, 39],
  COMMA: [90, 39],
  STRING_KEY: [95, 39],
  STRING_LITERAL: [33, 39],
  NUMBER_LITERAL: [92, 39],
  BOOLEAN_LITERAL: [96, 39],
  NULL_LITERAL: [97, 39],
  WHITESPACE: [0, 0],
};

export function colorize(
  tokens: Array<tokenParams>,
  options: optionsColorize = {},
): string {
  const help = [];

  for (const token of tokens) {
    help.push(_getColor(token, { colors: options.colors }));
  }

  let text = help.join('');

  text = (typeof text == 'undefined') ? '' : text;

  return text;
}

function _getColor(token: tokenParams, options: optionsColorize): string {
  // Options
  const colors = options.colors || {};
  // Use the options or the defaults!
  const colorKey = colors[token.type] || defaultColors[token.type];

  // Throw error if not the color key format correct!
  if (colorKey.length != 2) {
    throw Error('Not valid color format is 2 values!!!!');
  }

  // Make the Magic!
  if (colorKey.length == 2) {
    const first = [colorKey[0]];
    return run(token.value, code(first, colorKey[1]));
  }
  return '';
}
