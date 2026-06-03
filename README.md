# 📦 library-components

Workspace Angular de librería de componentes UI reutilizables, documentada con Storybook y preparada para publicarse como paquete npm. Este fichero sirve como contexto de referencia del proyecto: versiones, estructura, convenciones y roadmap de desarrollo.

---

## 🧰 Stack y versiones

| Herramienta | Versión |
|---|---|
| Angular CLI | 21.2.13 |
| Angular | 21.2.15 |
| ng-packagr | 21.2.5 |
| Storybook | 10.4.2 |
| TypeScript | 5.9.3 |
| RxJS | 7.8.2 |
| Vitest | 4.1.8 |
| Node.js | 24.16.0 |
| npm | 11.13.0 |
| OS | Windows 11 x64 |

### Herramientas de calidad y changelog
| Herramienta | Propósito |
|---|---|
| `@commitlint/cli` + `@commitlint/config-conventional` | Valida que los mensajes de commit sigan Conventional Commits |
| `husky` | Git hooks: ejecuta commitlint en cada `git commit` |
| `release-it` | Automatiza versioning semántico y publicación |
| `@release-it/conventional-changelog` | Genera `CHANGELOG.md` a partir del historial de commits |
| SonarQube / SonarLint | Análisis estático de calidad de código (configurado en el proyecto) |

---

## 📁 Estructura del proyecto

```
library-components/                  ← raíz del workspace Angular
├── .storybook/
│   ├── main.ts                       ← configuración de Storybook (addons, framework, stories glob)
│   └── preview.ts                    ← importa estilos globales/tokens para todas las stories
│
├── projects/
│   └── ui-lib/                       ← librería Angular (ng-packagr)
│       ├── src/
│       │   ├── lib/                  ← componentes, directivas, pipes, servicios
│       │   │   └── button/           ← ejemplo: primer componente
│       │   │       ├── button.component.ts
│       │   │       ├── button.component.html
│       │   │       ├── button.component.scss
│       │   │       ├── button.component.spec.ts
│       │   │       └── button.stories.ts
│       │   ├── styles/
│       │   │   ├── tokens/
│       │   │   │   ├── _colors.scss      ← CSS custom properties de color
│       │   │   │   ├── _typography.scss  ← fuentes, tamaños, pesos, line-height
│       │   │   │   └── _spacing.scss     ← espaciado, border-radius, z-index
│       │   │   └── _index.scss           ← barrel: importa todos los tokens
│       │   └── public-api.ts             ← exporta todo lo público de la librería
│       ├── ng-package.json               ← configuración de ng-packagr
│       └── tsconfig.lib.json
│
├── dist/
│   └── ui-lib/                       ← output del build, lo que se publica en npm
│
├── .commitlintrc.json                ← reglas de Conventional Commits
├── .release-it.json                  ← config de release-it y changelog
├── .husky/
│   └── commit-msg                    ← hook que ejecuta commitlint
├── CHANGELOG.md                      ← generado automáticamente por release-it
└── package.json
```

---

## 🎨 Design Tokens

Los tokens de diseño se definen como **CSS Custom Properties** en SCSS y se organizan en tres ficheros dentro de `projects/ui-lib/src/styles/tokens/`. Se importan globalmente en Storybook a través de `.storybook/preview.ts` y en cualquier proyecto consumidor importando `_index.scss`.

### Categorías de tokens
- **Colores** (`_colors.scss`): paleta primaria, secundaria, semántica (success, warning, error, info), neutros.
- **Tipografía** (`_typography.scss`): familias de fuente, tamaños (escala tipográfica), pesos, line-height, letter-spacing.
- **Espaciado** (`_spacing.scss`): escala de espaciado (4px base), border-radius, z-index, breakpoints.

### Convención de nomenclatura de tokens
```scss
// Formato: --{categoría}-{variante}-{estado}
--color-primary-default
--color-primary-hover
--color-neutral-100
--font-size-sm        // 12px
--font-size-base      // 16px
--font-size-lg        // 20px
--spacing-xs          // 4px
--spacing-sm          // 8px
--spacing-md          // 16px
--spacing-lg          // 24px
--border-radius-sm    // 4px
--border-radius-md    // 8px
```

---

## 🧩 Componentes

Cada componente sigue esta estructura estricta dentro de `projects/ui-lib/src/lib/{nombre}/`:

```
{nombre}/
├── {nombre}.component.ts       ← standalone component, lógica y @Input/@Output
├── {nombre}.component.html     ← template
├── {nombre}.component.scss     ← estilos usando los tokens como CSS vars
├── {nombre}.component.spec.ts  ← tests con Vitest
└── {nombre}.stories.ts         ← stories de Storybook (CSF3 format)
```

### Convenciones de componentes
- Todos los componentes son **standalone** (`standalone: true`).
- El prefijo del selector es siempre `ui-` (ej: `ui-button`, `ui-input`).
- Los estilos usan exclusivamente **CSS custom properties** de los tokens, nunca valores hardcodeados.
- Cada componente se exporta desde `public-api.ts`.

---

## 📖 Storybook

Storybook 10 documenta todos los componentes de la librería de forma interactiva.

### Comandos
```bash
# Arrancar Storybook en local
npm run storybook

# Build estático de Storybook (para despliegue)
npm run build-storybook
```

### Convenciones de stories
- Formato **CSF3** (Component Story Format 3).
- `autodocs` activado: genera documentación automática de props desde los tipos TypeScript.
- Cada story cubre los estados principales del componente: `Default`, variantes, `Disabled`, tamaños.
- Las stories importan el componente directamente desde la librería, no desde `dist/`.

---

## 🔨 Build y publicación

```bash
# Compilar la librería con ng-packagr
ng build ui-lib

# El output queda en dist/ui-lib/
# Para publicar en npm (requiere login previo con npm login):
cd dist/ui-lib
npm publish --access public
```

### Consumir la librería en otro proyecto Angular
```bash
npm install @mi-org/ui-lib
```

```typescript
// En el componente consumidor
import { ButtonComponent } from '@mi-org/ui-lib';

@Component({
  standalone: true,
  imports: [ButtonComponent],
})
export class AppComponent {}
```

Para que los estilos/tokens funcionen en el proyecto consumidor, importar en `styles.scss`:
```scss
@use '@mi-org/ui-lib/styles' as *;
```

---

## 📝 Conventional Commits y Changelog

Los mensajes de commit siguen la especificación [Conventional Commits](https://www.conventionalcommits.org/).

### Tipos de commit permitidos
| Tipo | Cuándo usarlo | Impacto en versión |
|---|---|---|
| `feat` | Nueva funcionalidad o componente | minor (1.x.0) |
| `fix` | Corrección de bug | patch (1.0.x) |
| `docs` | Solo documentación | — |
| `style` | Formato, espaciado (sin cambio lógico) | — |
| `refactor` | Refactor sin feat ni fix | — |
| `test` | Añadir o corregir tests | — |
| `chore` | Tareas de mantenimiento, deps | — |
| `BREAKING CHANGE` | Rompe la API pública | major (x.0.0) |

### Ejemplos de commits correctos
```bash
git commit -m "feat(button): add loading state with spinner"
git commit -m "fix(button): correct disabled styles in dark mode"
git commit -m "docs(button): add usage examples to story"
git commit -m "chore: update storybook to 10.4.2"
```

### Generar una release
```bash
# Patch release (0.0.x) — fixes
npx release-it patch

# Minor release (0.x.0) — features
npx release-it minor

# Major release (x.0.0) — breaking changes
npx release-it major
```

Esto actualiza `package.json`, genera el `CHANGELOG.md`, crea un tag de git y puede publicar en npm automáticamente según la configuración de `.release-it.json`.

---

## ✅ Calidad de código (Sonar)

El proyecto usa **SonarQube / SonarLint** para análisis estático. Reglas aplicadas:
- Sin `any` implícito en TypeScript.
- Complejidad cognitiva máxima por función: 15.
- Cobertura mínima de tests: definida en `sonar-project.properties`.
- Los componentes Angular deben tener `changeDetection: ChangeDetectionStrategy.OnPush`.

---

## 🗺️ Roadmap de desarrollo

### Fase actual: Setup
- [x] Workspace Angular sin aplicación (`--no-create-application`)
- [x] Librería `ui-lib` con `ng-packagr`
- [x] Storybook 10 configurado
- [x] Herramientas de changelog instaladas (`commitlint`, `husky`, `release-it`)

### Próximos pasos
- [ ] Configurar design tokens SCSS (`_colors.scss`, `_typography.scss`, `_spacing.scss`)
- [ ] Crear `ButtonComponent` con su story completa
- [ ] Configurar `.commitlintrc.json`, `.release-it.json` y el hook de Husky
- [ ] Configurar `public-api.ts` y exportaciones
- [ ] Configurar Storybook `preview.ts` con los tokens globales
- [ ] Añadir más componentes: Input, Badge, Card, Modal...

---

## 💬 Cómo usar este fichero como contexto

Copia y pega el contenido de este README al inicio de una conversación con Claude para que tenga contexto completo del proyecto: versiones exactas, estructura de carpetas, convenciones de código y el punto en el que está el desarrollo.
