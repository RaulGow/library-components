import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {

  // Desde projects/ui-lib/.storybook/ subimos un nivel con ../
  // y llegamos a projects/ui-lib/src/ donde están los componentes
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: [
    '@storybook/addon-a11y',
    '@whitespace/storybook-addon-html',
  ],

  framework: '@storybook/angular',
};

export default config;