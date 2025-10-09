import { defineConfig, passthroughImageService } from 'astro/config'
import starlight from '@astrojs/starlight'
import starlightBlog from 'starlight-blog'
import { koka } from './src/plugins/grammars/koka'

function meta(attrs: Record<string, any>) {
  return { tag: 'meta', attrs } as const
}

function link(attrs: Record<string, any>) {
  return { tag: 'link', attrs } as const
}

function googleFonts(...families: string[]) {
  return link({
    rel: 'stylesheet',
    href: `https://fonts.googleapis.com/css2?family=${families.join('&family=')}&display=swap`,
  })
}

// https://astro.build/config
export default defineConfig({
  site: 'https://aloso.foo/',
  redirects: {
    '/': '/blog/',
  },
  image: {
    service: passthroughImageService(),
  },
  markdown: {
    syntaxHighlight: 'shiki',
  },
  integrations: [
    starlight({
      title: "Aloso's blog",
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/Aloso' }],
      plugins: [
        starlightBlog({
          title: "Aloso's Blog",
          metrics: { readingTime: true },
          navigation: 'none',
          postCount: 15,
        }),
      ],
      head: [
        // theme colors
        meta({ name: 'theme-color', content: '#fff' }),
        meta({ name: 'msapplication-TileColor', content: '#fff' }),
        // favicon
        link({ rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }),
        link({ rel: 'mask-icon', href: '/safari-pinned-tab.svg' }),
        // web manifest
        link({ rel: 'manifest', href: '/site.webmanifest' }),
        // fonts
        link({ rel: 'preconnect', href: 'https://fonts.googleapis.com' }),
        link({ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }),
        googleFonts('Inter:wght@400;500;600;800', 'JetBrains+Mono:wght@400;700'),
      ],
      defaultLocale: 'en',
      customCss: ['./src/styles/global.css'],
      expressiveCode: {
        themes: ['dark-plus', 'light-plus'],
        shiki: {
          langs: [koka],
        },
      },
      components: {
        SocialIcons: './src/components/SocialIcons.astro',
      },
      sidebar: [],
    }),
  ],
})
