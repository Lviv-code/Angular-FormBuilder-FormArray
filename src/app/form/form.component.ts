import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{
  form: FormGroup;
  formErrors = {
    name: '',
    username: '',
    addresses: [
      {
        city: '',
        country: ''
      }
    ]    
  }

  validationMessages ={
    name: {
      required: 'Name is required!',
      minlength: 'Name must be  at list 3 characters!'
    },
    username: {
      required: 'Userame is required!',
      minlength: 'Userame must be  at list 3 characters!'
    },
    addresses: {
      city: {
        required: 'City is required!',
        minlength: 'City must have be at list 3 characters!'
      },
      country: {
        required: 'Country is required!',
        minlength: 'Country must have be at list 3 characters!'
      }
    }
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

/*
*build initial form
*/
  buildForm(){
    this.form = this.fb.group({
      name: ['', Validators.minLength(3)],
      username: ['', Validators.minLength(3)],
      addresses: this.fb.array([
        this.createAddress()
      ])
    });

    this.form.valueChanges.subscribe( data => {
      this.validateForm();
      this.validateAdresses();
    })
  }

  /*
  *validate the entire form
  */
  validateForm(){
    for(let field in this.formErrors){

      //clear that input field errors
      this.formErrors[field] = '';

      //grab an iput field by name
      let input = this.form.get(field);

      if(input.invalid && input.dirty){
        //figure out the type of error
        //loop over the formErrors field names
        for(let error in input.errors){
          //assign that type of error message to a variable
          this.formErrors[field] = this.validationMessages[field][error];
        }}}
  }

  /*
  *validate addresses formarray
  */
  validateAdresses(){
    //grab the addresses formarray
    let addresses = <FormArray>this.form.get('addresses');

    //clear the form errors
    this.formErrors.addresses = [];

    //loop through however many formgroups are in the formarray
    let n = 1;
    while(n <= addresses.length){
      
      //add the clear errors back
      this.formErrors.addresses.push({
        city: '',
        country: ''
      });

      //grab the specific group (adresses)
      let address = <FormGroup>addresses.at(n-1);
      //validate that specific group. Loop through the groups controls
      for(let field in address.controls){
        //get the formcontrol
        let input = address.get(field);

        //do the validation and save error to formarray if necessary
        if(input.invalid && input.dirty){
          for(let error in input.errors){
            this.formErrors.addresses[n-1][field] = this.validationMessages.addresses[field][error];
        }}}
      n++;
    }
  }

  createAddress(){
    return this.fb.group({
      city: ['', Validators.minLength(3)],
      country: ['', Validators.minLength(3)]
    })
  }

  addAddres(){
    let addresses = <FormArray>this.form.get('addresses');
    addresses.push(this.createAddress())
  }

  remouveAddres(i: number){
    let addresses = <FormArray>this.form.get('addresses');
    addresses.removeAt(i);
  }

  processForm(){
    console.log(this.form);
  }

}
