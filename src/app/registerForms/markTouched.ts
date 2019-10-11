import { FormGroup } from '@angular/forms';

export function markFormGroupTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        markFormGroupTouched(control);
      }
    });
  };