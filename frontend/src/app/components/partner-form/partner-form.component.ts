import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../api.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-partner-form',
  templateUrl: './partner-form.component.html',
  styleUrls: ['./partner-form.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PartnerFormComponent implements OnInit {

  loading = false;
  success = false;

  partnerForm: FormGroup;

  name = new FormControl(
    '',
    [
      Validators.required,
      Validators.pattern(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/),
    ]
  );

  percentage = new FormControl(
    '',
    [
      Validators.required, // pattern regex: aceita 0 < numero < 100 com ou sem % ou em forma fracionaria.
      Validators.pattern(
        /^(((1[0-9][0-9])(\.0+)?|([0-9][0-9](\.[0-9]+)?)|([1-9](\.[0-9]+)?))%?|(0+(\.[0-9]*[1-9]+))%?|(0\.[0-9]+[1-9]+))$/
      ),
    ]
  );

  getErrorMessage() {
    return this.percentage.hasError('required') ? 'You must enter a value' :
          this.percentage.hasError('percentage') ? 'Not a valid percentage value' :
          this.percentage.hasError('name') ? 'Not a valid name value' :
          '';
  }

  constructor(private fb: FormBuilder, private api: ApiService) { }

  ngOnInit() {
    this.partnerForm = this.fb.group({
      name: [
        '',
        [
          Validators.minLength(3),
          Validators.required,
          Validators.pattern(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/),
        ]
      ],
      surname: [
        '',
        [
          Validators.minLength(3),
          Validators.required,
          Validators.pattern(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/),
        ]
      ],
      participation: [
        '',
        [
          Validators.required, // pattern regex: aceita 0 < numero < 100 com ou sem % ou em forma fracionaria.
          Validators.pattern(
            /^(((1[0-9][0-9])(\.0+)?|([0-9][0-9](\.[0-9]+)?)|([1-9](\.[0-9]+)?))%?|(0+(\.[0-9]*[1-9]+))%?|(0\.[0-9]+[1-9]+))$/
          ),
        ]
      ],
    });

   }

  async submitHandler() {
    this.loading = true;

    const formValue = this.partnerForm.value;

    try {
      this.api.postPartners(formValue, (data) => {
        this.success = true;
      });
    } catch (err) {
      alert(err);
    }

    this.loading = false;

  }

}
