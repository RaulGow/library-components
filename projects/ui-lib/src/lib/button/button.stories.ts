// =============================================================================
// BUTTON STORIES
// =============================================================================
// Las stories documentan todos los estados posibles del componente.
//
// TEORÍA — CSF3 (Component Story Format 3):
// Es el estándar actual de Storybook. Cada story es un objeto que extiende
// un Meta<T> (configuración del componente) y define sus args (@Input).
// El campo "autodocs" genera automáticamente una página de documentación
// a partir de los tipos TypeScript y los comentarios JSDoc del componente.
// =============================================================================

import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

// ---------------------------------------------------------------------------
// META — configuración global para todas las stories de este componente
// ---------------------------------------------------------------------------
const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,

  // autodocs genera una página de documentación automática con la tabla
  // de props, ejemplos de código y descripción de cada @Input/@Output
  tags: ['autodocs'],

  // argTypes define cómo se muestran los @Input en el panel de controles
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Variante visual del botón',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del botón',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilita el botón',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Muestra spinner de carga',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Ocupa el 100% del ancho del contenedor',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    buttonClick: {
      action: 'buttonClick',
      description: 'Evento emitido al hacer click',
    },
  },

  // render define cómo se renderiza el componente en el canvas.
  // props recibe los args del panel de controles y los pasa al componente.
  render: (args) => ({
    props: args,
    // El texto se pasa como contenido proyectado (ng-content)
    template: `
      <ui-button
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        [loading]="loading"
        [fullWidth]="fullWidth"
        (buttonClick)="buttonClick()"
      >
        {{ label }}
      </ui-button>
    `,
  }),

  // args por defecto para todas las stories
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
  } as any,
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// ---------------------------------------------------------------------------
// STORIES — cada export es un estado documentado del componente
// ---------------------------------------------------------------------------

/** Estado por defecto */
export const Default: Story = {};

/** Variante primaria — acción principal */
export const Primary: Story = {
  args: { variant: 'primary' } as any,
};

/** Variante secundaria — acción secundaria con borde */
export const Secondary: Story = {
  args: { variant: 'secondary' } as any,
};

/** Variante ghost — acción terciaria sin borde */
export const Ghost: Story = {
  args: { variant: 'ghost' } as any,
};

/** Variante danger — acciones destructivas */
export const Danger: Story = {
  args: { variant: 'danger' } as any,
};

/** Tamaño pequeño */
export const Small: Story = {
  args: { size: 'sm' } as any,
};

/** Tamaño grande */
export const Large: Story = {
  args: { size: 'lg' } as any,
};

/** Estado deshabilitado */
export const Disabled: Story = {
  args: { disabled: true } as any,
};

/** Estado de carga */
export const Loading: Story = {
  args: { loading: true } as any,
};

/** Ancho completo */
export const FullWidth: Story = {
  args: { fullWidth: true } as any,
};

/** Todas las variantes juntas para comparación visual */
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; padding: 24px;">
        <div style="display: flex; gap: 12px; align-items: center;">
          <ui-button variant="primary">Primary</ui-button>
          <ui-button variant="secondary">Secondary</ui-button>
          <ui-button variant="ghost">Ghost</ui-button>
          <ui-button variant="danger">Danger</ui-button>
        </div>
        <div style="display: flex; gap: 12px; align-items: center;">
          <ui-button size="sm">Small</ui-button>
          <ui-button size="md">Medium</ui-button>
          <ui-button size="lg">Large</ui-button>
        </div>
        <div style="display: flex; gap: 12px; align-items: center;">
          <ui-button disabled>Disabled</ui-button>
          <ui-button loading>Loading</ui-button>
        </div>
      </div>
    `,
  }),
};