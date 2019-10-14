import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-partner-form',
  templateUrl: './partner-form.component.html',
  styleUrls: ['./partner-form.component.css']
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

  constructor(private fb: FormBuilder, private httpClient: HttpClient) { }

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

    this.httpClient.post('http://localhost:3000/partners', formValue).toPromise()
    .then( data => {
      //console.log(data);
      this.success = true;
    })
    .catch( err => {
      console.log(err);
    });

    this.loading = false;

  }

}
