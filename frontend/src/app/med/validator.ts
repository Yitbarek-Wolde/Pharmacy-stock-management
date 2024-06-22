import { Directive, inject, signal } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs'; 
import { MedService } from './med.service';
@Directive({
  selector: '[customAsyncValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: CustomAsyncValidatorDirective, multi:
true}]
})
class CustomAsyncValidatorDirective implements AsyncValidator {
    #nameCheck = inject(MedService)
    scheck = signal(true)
  validate(control: AbstractControl): Observable<ValidationErrors|null> {
    this.#nameCheck.Validate_name(control.value).subscribe(res=>{
        this.scheck.set(res.data)
    })
    return of({'custom': this.scheck()});
  }
}