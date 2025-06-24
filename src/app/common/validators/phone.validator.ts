import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { phone, PhoneResult } from 'phone';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return { required: true };//es requerido
    }

    try {
      const phoneValidation: PhoneResult = phone(`+${value}`);
      //console.log(phoneValidation);
      if (!phoneValidation.isValid) {
        return { invalidPhone: true };//no valido
      }
    } catch (error) {
        return { invalidPhone: true };//no valido
    }
    return null;//es valido
  }
}
