import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'sip-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.scss'],
})
export class FormComponent {
  public formGroup = new FormGroup(
    {
      firstname: new FormControl('Seb', Validators.required),
      name: new FormControl('Pupu', Validators.required),
      adress: new FormControl(),
      phone: new FormGroup(
        {
          prefix: new FormControl(undefined, [
            Validators.maxLength(4),
            Validators.required,
          ]),
          number: new FormControl(undefined, [
            Validators.maxLength(10),
            Validators.required,
          ]),
        },
        this.GroupValidators
      ),
      lead: new FormControl(undefined, [
        this.LeadValidators,
        Validators.required,
      ]),
    },
    this.GroupValidators
  );

  constructor() {}

  public resetForm() {
    this.formGroup.reset();
  }

  public importForm() {
    this.formGroup.setValue({
      firstname: 'Marius',
      name: 'Du Canal+',
      adress: {
        city: 'Paris',
        code: '75115',
        street: 'Basbalouède',
      },
      phone: {
        prefix: '+33',
        number: '0607080910',
      },
      lead: 'Marius',
    });
  }

  private LeadValidators(control: AbstractControl): ValidationErrors {
    if (control?.value?.toLowerCase().search('jean')) {
      return {
        wrongLead: "Non c'est pas lui, roooh il y en a pas 40",
      };
    }
    return null;
  }

  private GroupValidators(group: FormGroup): ValidationErrors {
    for (let key in group.controls) {
      if (!!group.controls[key].errors) {
        return group.controls[key].errors;
      }
    }
    return null;
  }
}
