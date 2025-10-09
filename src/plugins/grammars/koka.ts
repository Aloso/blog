import type { LanguageInput } from 'shiki'

export const koka: LanguageInput = {
  name: 'koka',
  patterns: [
    { include: '#comments' },
    { include: '#keywords' },
    { include: '#dstrings' },
    { include: '#sstrings' },
    { include: '#numbers' },
    { include: '#typeDec' },
    { include: '#namespaces' },
  ],
  repository: {
    $self: {},
    $base: {},
    keywords: {
      patterns: [
        {
          name: 'keyword.other.koka',
          match:
            '(?<!-)\\b(infix[rl]?|module|import|as|pub|abstract|type|struct|alias|effect|con|fun|fn|val|var|extern|in|handle|handler|mask|ctl|final|raw|override|named|ctx|extern|interface|unsafe)\\b(?!-)',
        },
        {
          name: 'keyword.control.koka',
          match: /\b(forall|exists|some|if|then|else|elif|match|return|with|break|continue)\b|\?/,
        },
      ],
    },
    comments: {
      name: 'comment.line.koka',
      begin: '//',
      end: '\n',
    },
    dstrings: {
      name: 'string.quoted.double.koka',
      begin: '"',
      end: '"',
    },
    sstrings: {
      name: 'string.quoted.single.koka',
      begin: "'",
      end: "'",
    },
    numbers: {
      name: 'constant.numeric.koka',
      match: /\b[0-9][0-9_]*(\.[0-9][0-9_]*)?\b/,
    },
    typeDec: {
      begin: /(:|(?<=^\s*(type|struct|alias|effect)))\s*/,
      end: '$|(?=[=,){])',
      patterns: [{ include: '#types' }],
    },
    types: {
      patterns: [
        {
          name: 'support.type.koka',
          match: /[\w][\w|-]*|\(\)/,
        },
        {
          begin: /\(\s*/,
          end: /\)\s*->\s*/,
          patterns: [{ include: '#types' }],
        },
        {
          begin: /<\s*/,
          end: />\s*/,
          patterns: [{ include: '#types' }],
        },
      ],
    },
    namespaces: {
      name: 'support.variable.koka',
      match: /\w[\w-]*\//,
    },
  },
  scopeName: 'source.koka',
}
