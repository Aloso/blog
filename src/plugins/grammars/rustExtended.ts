import type { LanguageInput } from 'shiki'

export const rustExtended: LanguageInput = {
  name: 'rustExtended',
  aliases: ['rsx'],
  fileTypes: ['rsx'],
  scopeName: 'source.rustExtended',
  patterns: [
    {
      begin: '(<)(\\[)',
      beginCaptures: {
        '1': { name: 'punctuation.brackets.angle.rust' },
        '2': { name: 'punctuation.brackets.square.rust' },
      },
      end: '>',
      endCaptures: { '0': { name: 'punctuation.brackets.angle.rust' } },
      patterns: [
        { include: '#block-comments' },
        { include: '#comments' },
        { include: '#gtypes' },
        { include: '#lvariables' },
        { include: '#lifetimes' },
        { include: '#punctuation' },
        { include: '#types' },
      ],
    },
    {
      name: 'meta.macro.metavariable.type.rust',
      match:
        '(\\$)((crate)|([A-Z]\\w*))(\\s*(:)\\s*(block|expr(?:_2021)?|ident|item|lifetime|literal|meta|pat(?:_param)?|path|stmt|tt|ty|vis)\\b)?',
      captures: {
        '1': { name: 'keyword.operator.macro.dollar.rust' },
        '3': { name: 'keyword.other.crate.rust' },
        '4': { name: 'entity.name.type.metavariable.rust' },
        '6': { name: 'keyword.operator.key-value.rust' },
        '7': { name: 'variable.other.metavariable.specifier.rust' },
      },
      patterns: [{ include: '#keywords' }],
    },
    {
      name: 'meta.macro.metavariable.rust',
      match:
        '(\\$)([a-z]\\w*)(\\s*(:)\\s*(block|expr(?:_2021)?|ident|item|lifetime|literal|meta|pat(?:_param)?|path|stmt|tt|ty|vis)\\b)?',
      captures: {
        '1': { name: 'keyword.operator.macro.dollar.rust' },
        '2': { name: 'variable.other.metavariable.name.rust' },
        '4': { name: 'keyword.operator.key-value.rust' },
        '5': { name: 'variable.other.metavariable.specifier.rust' },
      },
      patterns: [{ include: '#keywords' }],
    },
    {
      name: 'meta.macro.rules.rust',
      match: '\\b(macro_rules!)\\s+(([a-z0-9_]+)|([A-Z][a-z0-9_]*))\\s+(\\{)',
      captures: {
        '1': { name: 'entity.name.function.macro.rules.rust' },
        '3': { name: 'entity.name.function.macro.rust' },
        '4': { name: 'entity.name.type.macro.rust' },
        '5': { name: 'punctuation.brackets.curly.rust' },
      },
    },
    {
      match: '(mod)\\s+((?:r#(?!crate|[Ss]elf|super))?[a-z][A-Za-z0-9_]*)',
      captures: {
        '1': { name: 'storage.type.rust' },
        '2': { name: 'entity.name.module.rust' },
      },
    },
    {
      name: 'meta.import.rust',
      begin: '\\b(extern)\\s+(crate)',
      beginCaptures: {
        '1': { name: 'storage.type.rust' },
        '2': { name: 'keyword.other.crate.rust' },
      },
      end: ';',
      endCaptures: { '0': { name: 'punctuation.semi.rust' } },
      patterns: [
        { include: '#block-comments' },
        { include: '#comments' },
        { include: '#keywords' },
        { include: '#punctuation' },
      ],
    },
    {
      name: 'meta.use.rust',
      begin: '\\b(use)\\s',
      beginCaptures: {
        '1': { name: 'keyword.other.rust' },
      },
      end: ';',
      endCaptures: {
        '0': { name: 'punctuation.semi.rust' },
      },
      patterns: [
        { include: '#block-comments' },
        { include: '#comments' },
        { include: '#keywords' },
        { include: '#namespaces' },
        { include: '#punctuation' },
        { include: '#types' },
        { include: '#lvariables' },
      ],
    },
    { include: '#block-comments' },
    { include: '#comments' },
    { include: '#attributes' },
    { include: '#lvariables' },
    { include: '#constants' },
    { include: '#gtypes' },
    { include: '#functions' },
    { include: '#types' },
    { include: '#keywords' },
    { include: '#lifetimes' },
    { include: '#macros' },
    { include: '#namespaces' },
    { include: '#punctuation' },
    { include: '#strings' },
    { include: '#variables' },
  ],
  repository: {
    comments: {
      patterns: [
        {
          name: 'comment.line.documentation.rust',
          match: '(///).*$',
          captures: { '1': { name: 'punctuation.definition.comment.rust' } },
        },
        {
          name: 'comment.line.double-slash.rust',
          match: '(//).*$',
          captures: { '1': { name: 'punctuation.definition.comment.rust' } },
        },
      ],
    },
    'block-comments': {
      patterns: [
        {
          name: 'comment.block.rust',
          match: '/\\*\\*/',
        },
        {
          name: 'comment.block.documentation.rust',
          begin: '/\\*\\*',
          end: '\\*/',
          patterns: [{ include: '#block-comments' }],
        },
        {
          name: 'comment.block.rust',
          begin: '/\\*(?!\\*)',
          end: '\\*/',
          patterns: [{ include: '#block-comments' }],
        },
      ],
    },
    constants: {
      patterns: [
        {
          name: 'constant.other.caps.rust',
          match: '\\b[A-Z]{2}[A-Z0-9_]*\\b',
        },
        {
          match: '\\b(const)\\s+([A-Z][A-Za-z0-9_]*)\\b',
          captures: {
            '1': { name: 'storage.type.rust' },
            '2': { name: 'constant.other.caps.rust' },
          },
        },
        {
          name: 'constant.numeric.decimal.rust',
          match:
            '\\b\\d[\\d_]*(\\.?)[\\d_]*(?:(E|e)([+-]?)([\\d_]+))?(f32|f64|i128|i16|i32|i64|i8|isize|u128|u16|u32|u64|u8|usize)?\\b',
          captures: {
            '1': { name: 'punctuation.separator.dot.decimal.rust' },
            '2': { name: 'keyword.operator.exponent.rust' },
            '3': { name: 'keyword.operator.exponent.sign.rust' },
            '4': { name: 'constant.numeric.decimal.exponent.mantissa.rust' },
            '5': { name: 'entity.name.type.numeric.rust' },
          },
        },
        {
          name: 'constant.numeric.hex.rust',
          match: '\\b0x[\\da-fA-F_]+(i128|i16|i32|i64|i8|isize|u128|u16|u32|u64|u8|usize)?\\b',
          captures: { '1': { name: 'entity.name.type.numeric.rust' } },
        },
        {
          name: 'constant.numeric.oct.rust',
          match: '\\b0o[0-7_]+(i128|i16|i32|i64|i8|isize|u128|u16|u32|u64|u8|usize)?\\b',
          captures: { '1': { name: 'entity.name.type.numeric.rust' } },
        },
        {
          name: 'constant.numeric.bin.rust',
          match: '\\b0b[01_]+(i128|i16|i32|i64|i8|isize|u128|u16|u32|u64|u8|usize)?\\b',
          captures: { '1': { name: 'entity.name.type.numeric.rust' } },
        },
        {
          name: 'constant.language.bool.rust',
          match: '\\b(true|false)\\b',
        },
      ],
    },
    escapes: {
      name: 'constant.character.escape.rust',
      match: '(\\\\)(?:(?:(x[0-7][\\da-fA-F])|(u(\\{)[\\da-fA-F]{4,6}(\\}))|.))',
      captures: {
        '1': { name: 'constant.character.escape.backslash.rust' },
        '2': { name: 'constant.character.escape.bit.rust' },
        '3': { name: 'constant.character.escape.unicode.rust' },
        '4': { name: 'constant.character.escape.unicode.punctuation.rust' },
        '5': { name: 'constant.character.escape.unicode.punctuation.rust' },
      },
    },
    attributes: {
      name: 'meta.attribute.rust',
      begin: '(#)(\\!?)(\\[)',
      beginCaptures: {
        '1': { name: 'punctuation.definition.attribute.rust' },
        '3': { name: 'punctuation.brackets.attribute.rust' },
      },
      end: '\\]',
      endCaptures: { '0': { name: 'punctuation.brackets.attribute.rust' } },
      patterns: [
        { include: '#block-comments' },
        { include: '#comments' },
        { include: '#keywords' },
        { include: '#lifetimes' },
        { include: '#punctuation' },
        { include: '#strings' },
        { include: '#gtypes' },
        { include: '#types' },
      ],
    },
    functions: {
      patterns: [
        {
          match: '\\b(pub)(\\()',
          captures: {
            '1': { name: 'keyword.other.rust' },
            '2': { name: 'punctuation.brackets.round.rust' },
          },
        },
        {
          name: 'meta.function.definition.rust',
          begin: '\\b(fn)\\s+((?:r#(?!crate|[Ss]elf|super))?[A-Za-z0-9_]+)((\\()|(<))',
          beginCaptures: {
            '1': { name: 'keyword.other.fn.rust' },
            '2': { name: 'entity.name.function.rust' },
            '4': { name: 'punctuation.brackets.round.rust' },
            '5': { name: 'punctuation.brackets.angle.rust' },
          },
          end: '(\\{)|(;)',
          endCaptures: {
            '1': { name: 'punctuation.brackets.curly.rust' },
            '2': { name: 'punctuation.semi.rust' },
          },
          patterns: [
            { include: '#block-comments' },
            { include: '#comments' },
            { include: '#keywords' },
            { include: '#lvariables' },
            { include: '#constants' },
            { include: '#gtypes' },
            { include: '#functions' },
            { include: '#lifetimes' },
            { include: '#macros' },
            { include: '#namespaces' },
            { include: '#punctuation' },
            { include: '#strings' },
            { include: '#types' },
            { include: '#variables' },
          ],
        },
        {
          name: 'meta.function.call.rust',
          begin: '((?:r#(?!crate|[Ss]elf|super))?[A-Za-z0-9_]+)(\\()',
          beginCaptures: {
            '1': { name: 'entity.name.function.rust' },
            '2': { name: 'punctuation.brackets.round.rust' },
          },
          end: '\\)',
          endCaptures: { '0': { name: 'punctuation.brackets.round.rust' } },
          patterns: [
            { include: '#block-comments' },
            { include: '#comments' },
            { include: '#attributes' },
            { include: '#keywords' },
            { include: '#lvariables' },
            { include: '#constants' },
            { include: '#gtypes' },
            { include: '#functions' },
            { include: '#lifetimes' },
            { include: '#macros' },
            { include: '#namespaces' },
            { include: '#punctuation' },
            { include: '#strings' },
            { include: '#types' },
            { include: '#variables' },
          ],
        },
        {
          name: 'meta.function.call.rust',
          begin: '((?:r#(?!crate|[Ss]elf|super))?[A-Za-z0-9_]+)(?=::<.*>\\()',
          beginCaptures: { '1': { name: 'entity.name.function.rust' } },
          end: '\\)',
          endCaptures: { '0': { name: 'punctuation.brackets.round.rust' } },
          patterns: [
            { include: '#block-comments' },
            { include: '#comments' },
            { include: '#attributes' },
            { include: '#keywords' },
            { include: '#lvariables' },
            { include: '#constants' },
            { include: '#gtypes' },
            { include: '#functions' },
            { include: '#lifetimes' },
            { include: '#macros' },
            { include: '#namespaces' },
            { include: '#punctuation' },
            { include: '#strings' },
            { include: '#types' },
            { include: '#variables' },
          ],
        },
      ],
    },
    keywords: {
      patterns: [
        {
          name: 'keyword.control.rust',
          match: '\\b(await|break|continue|do|else|for|if|loop|match|return|try|while|yield)\\b',
        },
        {
          name: 'keyword.other.rust storage.type.rust',
          match: '\\b(extern|let|macro|mod)\\b',
        },
        {
          name: 'storage.modifier.rust',
          match: '\\b(const)\\b',
        },
        {
          name: 'keyword.declaration.type.rust storage.type.rust',
          match: '\\b(type)\\b',
        },
        {
          name: 'keyword.declaration.enum.rust storage.type.rust',
          match: '\\b(enum)\\b',
        },
        {
          name: 'keyword.declaration.trait.rust storage.type.rust',
          match: '\\b(trait)\\b',
        },
        {
          name: 'keyword.declaration.struct.rust storage.type.rust',
          match: '\\b(struct)\\b',
        },
        {
          name: 'storage.modifier.rust',
          match: '\\b(abstract|static)\\b',
        },
        {
          name: 'keyword.other.rust',
          match:
            '\\b(as|async|become|box|dyn|move|final|gen|impl|in|override|priv|pub|ref|typeof|union|unsafe|unsized|use|virtual|where)\\b',
        },
        {
          name: 'keyword.other.fn.rust',
          match: '\\bfn\\b',
        },
        {
          name: 'keyword.other.crate.rust',
          match: '\\bcrate\\b',
        },
        {
          name: 'storage.modifier.mut.rust',
          match: '\\bmut\\b',
        },
        {
          name: 'keyword.operator.logical.rust',
          match: '(\\^|\\||\\|\\||&&|<<|>>|!)(?!=)',
        },
        {
          name: 'keyword.operator.borrow.and.rust',
          match: '&(?![&=])',
        },
        {
          name: 'keyword.operator.assignment.rust',
          match: '(\\+=|-=|\\*=|/=|%=|\\^=|&=|\\|=|<<=|>>=)',
        },
        {
          name: 'keyword.operator.assignment.equal.rust',
          match: '(?<![<>])=(?!=|>)',
        },
        {
          name: 'keyword.operator.comparison.rust',
          match: '(=(=)?(?!>)|!=|<=|(?<!=)>=)',
        },
        {
          name: 'keyword.operator.math.rust',
          match: '(([+%]|(\\*(?!\\w)))(?!=))|(-(?!>))|(/(?!/))',
        },
        {
          match: '(?:\\b|(?:(\\))|(\\])|(\\})))[ \\t]+([<>])[ \\t]+(?:\\b|(?:(\\()|(\\[)|(\\{)))',
          captures: {
            '1': { name: 'punctuation.brackets.round.rust' },
            '2': { name: 'punctuation.brackets.square.rust' },
            '3': { name: 'punctuation.brackets.curly.rust' },
            '4': { name: 'keyword.operator.comparison.rust' },
            '5': { name: 'punctuation.brackets.round.rust' },
            '6': { name: 'punctuation.brackets.square.rust' },
            '7': { name: 'punctuation.brackets.curly.rust' },
          },
        },
        {
          name: 'keyword.operator.namespace.rust',
          match: '::',
        },
        {
          match: '(\\*)(?=\\w+)',
          captures: { '1': { name: 'keyword.operator.dereference.rust' } },
        },
        {
          name: 'keyword.operator.subpattern.rust',
          match: '@',
        },
        {
          name: 'keyword.operator.access.dot.rust',
          match: '\\.(?!\\.)',
        },
        {
          name: 'keyword.operator.range.rust',
          match: '\\.{2}(=|\\.)?',
        },
        {
          name: 'keyword.operator.key-value.rust',
          match: ':(?!:)',
        },
        {
          name: 'keyword.operator.arrow.skinny.rust',
          match: '->|<-',
        },
        {
          name: 'keyword.operator.arrow.fat.rust',
          match: '=>',
        },
        {
          name: 'keyword.operator.macro.dollar.rust',
          match: '\\$',
        },
        {
          name: 'keyword.operator.question.rust',
          match: '\\?',
        },
      ],
    },
    interpolations: {
      name: 'meta.interpolation.rust',
      match: '({)[^"{}]*(})',
      captures: {
        '1': { name: 'punctuation.definition.interpolation.rust' },
        '2': { name: 'punctuation.definition.interpolation.rust' },
      },
    },
    lifetimes: {
      patterns: [
        {
          match: "(['])([a-zA-Z_][0-9a-zA-Z_]*)(?!['])\\b",
          captures: {
            '1': { name: 'punctuation.definition.lifetime.rust' },
            '2': { name: 'entity.name.type.lifetime.rust' },
          },
        },
        {
          match: "(\\&)(['])([a-zA-Z_][0-9a-zA-Z_]*)(?!['])\\b",
          captures: {
            '1': { name: 'keyword.operator.borrow.rust' },
            '2': { name: 'punctuation.definition.lifetime.rust' },
            '3': { name: 'entity.name.type.lifetime.rust' },
          },
        },
      ],
    },
    macros: {
      patterns: [
        {
          name: 'meta.macro.rust',
          match: '(([a-z_][A-Za-z0-9_]*!)|([A-Z_][A-Za-z0-9_]*!))',
          captures: {
            '2': { name: 'entity.name.function.macro.rust' },
            '3': { name: 'entity.name.type.macro.rust' },
          },
        },
      ],
    },
    namespaces: {
      patterns: [
        {
          match: '(?<![A-Za-z0-9_])([A-Za-z0-9_]+)((?<!super|self)::)',
          captures: {
            '1': { name: 'entity.name.namespace.rust' },
            '2': { name: 'keyword.operator.namespace.rust' },
          },
        },
      ],
    },
    types: {
      patterns: [
        {
          match: '(?<![A-Za-z])(f32|f64|i128|i16|i32|i64|i8|isize|u128|u16|u32|u64|u8|usize)\\b',
          captures: { '1': { name: 'entity.name.type.numeric.rust' } },
        },
        {
          begin: '\\b(_?[A-Z][A-Za-z0-9_]*)(<)',
          beginCaptures: {
            '1': { name: 'entity.name.type.rust' },
            '2': { name: 'punctuation.brackets.angle.rust' },
          },
          end: '>',
          endCaptures: { '0': { name: 'punctuation.brackets.angle.rust' } },
          patterns: [
            { include: '#block-comments' },
            { include: '#comments' },
            { include: '#keywords' },
            { include: '#lvariables' },
            { include: '#lifetimes' },
            { include: '#punctuation' },
            { include: '#types' },
            { include: '#variables' },
          ],
        },
        {
          name: 'entity.name.type.primitive.rust',
          match: '\\b(bool|char|str)\\b',
        },
        {
          match: '\\b(trait)\\s+(_?[A-Z][A-Za-z0-9_]*)\\b',
          captures: {
            '1': { name: 'keyword.declaration.trait.rust storage.type.rust' },
            '2': { name: 'entity.name.type.trait.rust' },
          },
        },
        {
          match: '\\b(struct)\\s+(_?[A-Z][A-Za-z0-9_]*)\\b',
          captures: {
            '1': { name: 'keyword.declaration.struct.rust storage.type.rust' },
            '2': { name: 'entity.name.type.struct.rust' },
          },
        },
        {
          match: '\\b(enum)\\s+(_?[A-Z][A-Za-z0-9_]*)\\b',
          captures: {
            '1': { name: 'keyword.declaration.enum.rust storage.type.rust' },
            '2': { name: 'entity.name.type.enum.rust' },
          },
        },
        {
          match: '\\b(type)\\s+(_?[A-Z][A-Za-z0-9_]*)\\b',
          captures: {
            '1': { name: 'keyword.declaration.type.rust storage.type.rust' },
            '2': { name: 'entity.name.type.declaration.rust' },
          },
        },
        {
          name: 'entity.name.type.rust',
          match: '\\b_?[A-Z][A-Za-z0-9_]*\\b(?!!)',
        },
      ],
    },
    gtypes: {
      patterns: [
        {
          name: 'entity.name.type.option.rust',
          match: '\\b(Some|None)\\b',
        },
        {
          name: 'entity.name.type.result.rust',
          match: '\\b(Ok|Err)\\b',
        },
      ],
    },
    punctuation: {
      patterns: [
        {
          name: 'punctuation.comma.rust',
          match: ',',
        },
        {
          name: 'punctuation.brackets.curly.rust',
          match: '[{}]',
        },
        {
          name: 'punctuation.brackets.round.rust',
          match: '[()]',
        },
        {
          name: 'punctuation.semi.rust',
          match: ';',
        },
        {
          name: 'punctuation.brackets.square.rust',
          match: '[\\[\\]]',
        },
        {
          name: 'punctuation.brackets.angle.rust',
          match: '(?<!=)[<>]',
        },
      ],
    },
    strings: {
      patterns: [
        {
          begin: '(f|(?<=(format_args|format|e?println|e?print)!\\())"',
          beginCaptures: { '0': { name: 'string.quoted.double.rust' } },
          end: '"',
          endCaptures: { '0': { name: 'string.quoted.double.rust' } },
          patterns: [
            { include: '#escapes' },
            { include: '#stringTemplates' },
            {
              name: 'string.quoted.double.rust',
              match: '.',
            },
          ],
        },
        {
          name: 'string.quoted.double.rust',
          begin: '([bc]?)(")',
          beginCaptures: {
            '1': { name: 'string.quoted.byte.raw.rust' },
            '2': { name: 'punctuation.definition.string.rust' },
          },
          end: '"',
          endCaptures: { '0': { name: 'punctuation.definition.string.rust' } },
          patterns: [{ include: '#escapes' }, { include: '#interpolations' }],
        },
        {
          name: 'string.quoted.double.rust',
          begin: '([bc]?r)(#*)(")',
          beginCaptures: {
            '1': { name: 'string.quoted.byte.raw.rust' },
            '2': { name: 'punctuation.definition.string.raw.rust' },
            '3': { name: 'punctuation.definition.string.rust' },
          },
          end: '(")(\\2)',
          endCaptures: {
            '1': { name: 'punctuation.definition.string.rust' },
            '2': { name: 'punctuation.definition.string.raw.rust' },
          },
        },
        {
          name: 'string.quoted.single.char.rust',
          begin: "([bc])?(')",
          beginCaptures: {
            '1': { name: 'string.quoted.byte.raw.rust' },
            '2': { name: 'punctuation.definition.char.rust' },
          },
          end: "'",
          endCaptures: { '0': { name: 'punctuation.definition.char.rust' } },
          patterns: [{ include: '#escapes' }],
        },
      ],
    },
    stringTemplates: {
      begin: '({)',
      beginCaptures: { '1': { name: 'storage.type.rust' } },
      end: '(})',
      endCaptures: { '1': { name: 'storage.type.rust' } },
      patterns: [{ include: '#balancedBlock' }],
    },
    balancedBlock: {
      patterns: [
        { include: '#block-comments' },
        { include: '#comments' },
        { include: '#keywords' },
        { include: '#lvariables' },
        { include: '#constants' },
        { include: '#gtypes' },
        { include: '#functions' },
        { include: '#lifetimes' },
        { include: '#macros' },
        { include: '#namespaces' },
        {
          begin: '({)',
          end: '(})',
          patterns: [{ include: '#balancedBlock' }],
        },
        { include: '#punctuation' },
        { include: '#strings' },
        { include: '#types' },
        { include: '#variables' },
      ],
    },
    lvariables: {
      patterns: [
        {
          name: 'variable.language.self.rust',
          match: '\\b[Ss]elf\\b',
        },
        {
          name: 'variable.language.super.rust',
          match: '\\bsuper\\b',
        },
      ],
    },
    variables: {
      patterns: [
        {
          name: 'variable.other.rust',
          match: '\\b(?<!(?<!\\.)\\.)(?:r#(?!(crate|[Ss]elf|super)))?[a-z0-9_]+\\b',
        },
      ],
    },
  },
}
