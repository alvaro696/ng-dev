import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {
  transform(value: string, format: string = '+xxx xxxxxxxx'): string {
    if (!value) return '';

    const numbers = value.replace(/\D/g, '');
    let formatted = '';
    let i = 0;

    for (const char of format) {
      if (char === 'x') {
        formatted += numbers[i] || '';
        i++;
      } else {
        formatted += char;
      }
    }

    return formatted;
  }
}
