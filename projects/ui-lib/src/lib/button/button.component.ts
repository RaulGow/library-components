// =============================================================================
// BUTTON COMPONENT
// =============================================================================
// Componente standalone de botón reutilizable.
//
// TEORÍA — Standalone Components (Angular 14+):
// Los componentes standalone no necesitan declararse en un NgModule.
// Se importan directamente donde se usan, lo que reduce el acoplamiento
// y hace la librería más tree-shakeable: el bundler solo incluye en el
// bundle final los componentes que realmente se importan.
//
// TEORÍA — ChangeDetectionStrategy.OnPush:
// Por defecto Angular comprueba cambios en todos los componentes en cada
// ciclo de detección. Con OnPush solo comprueba este componente cuando:
//   1. Cambia una referencia de un @Input
//   2. Se emite un evento desde el componente
//   3. Se llama manualmente a markForCheck()
// Esto es obligatorio en librerías de componentes para no degradar el
// rendimiento de la aplicación consumidora.
// =============================================================================

import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';

// Tipos exportados para que el consumidor pueda tipar sus variables
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize    = 'sm' | 'md' | 'lg';
export type ButtonType    = 'button' | 'submit' | 'reset';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {

  // ---------------------------------------------------------------------------
  // INPUTS
  // Cada @Input tiene un valor por defecto para que el componente funcione
  // sin necesidad de pasar todas las propiedades obligatoriamente.
  // ---------------------------------------------------------------------------

  /** Variante visual del botón */
  @Input() variant: ButtonVariant = 'primary';

  /** Tamaño del botón */
  @Input() size: ButtonSize = 'md';

  /** Tipo HTML nativo del botón — importante para formularios */
  @Input() type: ButtonType = 'button';

  /** Deshabilita el botón e impide interacción */
  @Input() disabled = false;

  /** Muestra un spinner y deshabilita el botón durante operaciones async */
  @Input() loading = false;

  /** Ocupa el 100% del ancho del contenedor padre */
  @Input() fullWidth = false;

  /** Texto accesible para lectores de pantalla cuando no hay texto visible */
  @Input() ariaLabel?: string;

  // ---------------------------------------------------------------------------
  // OUTPUTS
  // Usamos EventEmitter tipado con void porque el click de un botón
  // no necesita emitir datos — solo notifica que ocurrió.
  // ---------------------------------------------------------------------------

  /** Emite cuando el botón es clickado y no está disabled ni loading */
  @Output() buttonClick = new EventEmitter<void>();

  // ---------------------------------------------------------------------------
  // MÉTODOS
  // ---------------------------------------------------------------------------

  /**
   * Manejador del evento click nativo.
   * Comprueba disabled y loading antes de emitir para evitar
   * que eventos rápidos del usuario disparen acciones no deseadas.
   */
  handleClick(): void {
    if (this.disabled || this.loading) {
      return;
    }
    this.buttonClick.emit();
  }

  /**
   * Genera las clases CSS del componente de forma dinámica.
   * Centralizar la lógica de clases aquí evita lógica compleja en el template
   * y facilita el testing unitario de los estados visuales.
   */
  get cssClasses(): Record<string, boolean> {
    return {
      'ui-button':                    true,
      [`ui-button--${this.variant}`]: true,
      [`ui-button--${this.size}`]:    true,
      'ui-button--disabled':          this.disabled,
      'ui-button--loading':           this.loading,
      'ui-button--full-width':        this.fullWidth,
    };
  }
}