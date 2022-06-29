import { CODE_COLORS, colorize } from '../mod.ts';

// Short Examples
colorize('{ "foo": 2 }');

const example = {
  aaaaaa: 'eeeee',
  aaa: 2,
  a: {
    e: 'xd',
  },
};

// Without Pretty print
colorize(JSON.stringify(example));

// Pretty Print
colorize(JSON.stringify(example), { pretty: true });

// CUSTOM COLORS

colorize(JSON.stringify(example), {
  colors: {
    BRACE: CODE_COLORS.GRAY,
    BRACKET: CODE_COLORS.GRAY,
    COLON: CODE_COLORS.GRAY,
    COMMA: CODE_COLORS.GRAY,
    STRING_KEY: CODE_COLORS.BLUE,
    STRING_LITERAL: CODE_COLORS.GREEN,
    NUMBER_LITERAL: CODE_COLORS.YELLOW,
    BOOLEAN_LITERAL: CODE_COLORS.BLUE,
    NULL_LITERAL: CODE_COLORS.RED,
  },
  pretty: true,
  print: true,
});

const msg = colorize('{ \'fooo\': \'baaar\' }', { print: false });

console.log(msg);
