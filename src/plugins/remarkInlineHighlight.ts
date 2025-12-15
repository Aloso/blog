import { getSingletonHighlighter } from 'shiki'
import { bundledLanguages, type BundledLanguage } from 'shiki/langs'
import type { RemarkPlugins } from 'astro'
import { rustExtended } from './grammars/rustExtended'

const highlighter = await getSingletonHighlighter()
await highlighter.loadTheme('dark-plus', 'light-plus')
await highlighter.loadLanguage(
  rustExtended,
  ...(Object.keys(bundledLanguages) as BundledLanguage[])
)

const langRecord = { ...bundledLanguages, rustExtended, rsx: rustExtended }

export const remarkInlineHighlight: RemarkPlugins[number] = () => {
  return (tree) => {
    process(tree as Tree)
  }
}

interface Tree {
  type: string
  value: string
  position: { start: any; end: any }
  children: Tree[]
}

function process(tree: Tree) {
  if (tree.type === 'paragraph' || tree.type === 'heading' || tree.type === 'tableCell') {
    for (let i = 0; i < tree.children.length; i++) {
      processChild(tree, i)
    }
  } else if (tree.children) {
    tree.children.forEach((child) => {
      process(child)
    })
  }
}

function processChild(tree: Tree, i: number) {
  if (tree.children[i].type !== 'inlineCode') return

  const next = tree.children[i + 1]
  if (!next) return

  const tag = next.value.match(/^#(\w+)\b/)
  if (!tag) return

  if (!(tag[1] in langRecord)) return
  next.value = next.value.slice(tag[0].length)

  const content = highlighter.codeToHtml(tree.children[i].value, {
    lang: tag[1],
    themes: {
      light: 'light-plus',
      dark: 'dark-plus',
    },
    cssVariablePrefix: '--',
    defaultColor: false,
    structure: 'inline',
  })
  const html = `<code class="shiki lang-${tag[1]}">${content}</code>`

  tree.children.splice(i, 1, { type: 'html', value: html } as Tree)
}
