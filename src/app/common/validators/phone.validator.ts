import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { PhoneResult, phone } from "phone";

/**
 * Validador de número de teléfono
 * @returns
 */
export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return { required: true }; // El campo de teléfono es requerido
    }

    try {
      const phoneValidation: PhoneResult = phone(`+${value}`);

      if (!phoneValidation.isValid) {
        return { invalidPhone: true }; // Número de teléfono invalido
      }
    } catch (error) {
      return { invalidPhone: true }; // Error al validar el número de teléfono
    }

    return null; // Número de teléfono valido
  };
}
