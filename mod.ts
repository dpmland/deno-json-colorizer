import { getTokens } from './src/lexer.ts';
import * as color from './src/colorizer.ts';

interface CODE_COLORS_PARAMS {
  BLACK: number[];
  RED: number[];
  GREEN: number[];
  YELLOW: number[];
  BLUE: number[];
  MAGENTA: number[];
  CYAN: number[];
  WHITE: number[];
  NONE: number[];
  GRAY: number[];
}

interface generalOptions {
  print?: boolean;
  pretty?: boolean;
  colors?: Record<string, number[]>;
}

export function colorize(json: string, opts: generalOptions = {}) {
  if (opts.print == undefined || opts.print == true) {
    console.log(
      color.colorize(getTokens(json, { pretty: opts.pretty }), {
        colors: opts.colors,
      }),
    );
    return '';
  }
  return color.colorize(getTokens(json, { pretty: opts.pretty }), {
    colors: opts.colors,
  });
}

export const CODE_COLORS = {
  BLACK: [30, 39],
  RED: [31, 39],
  GREEN: [32, 39],
  YELLOW: [33, 39],
  BLUE: [34, 39],
  MAGENTA: [35, 39],
  CYAN: [36, 39],
  WHITE: [37, 39],
  NONE: [0, 0],
  GRAY: [90, 39],
};
