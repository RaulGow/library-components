// projects/ui-lib/.storybook/preview.ts
import { type Preview } from '@storybook/angular';

// Los estilos globales (tokens) se cargan via angular.json "styles[]"
// en los targets storybook y build-storybook. No se importan aquí
// porque Webpack no puede procesar CSS compilado desde SCSS en este contexto.

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f9fafb' },
        { name: 'dark',  value: '#111827' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
};

export default preview;