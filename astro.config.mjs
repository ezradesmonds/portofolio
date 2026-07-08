// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.ezradesmonds.my.id',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],

  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
