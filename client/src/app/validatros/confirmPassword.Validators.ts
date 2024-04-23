import { FormGroup } from "@angular/forms"

export const confirmPasswordValidator = (controlName:string, controlNameToMatch:string)=>{
    return (formGroup:FormGroup)=>{
        let control = formGroup.controls[controlName];
        let matchingControl = formGroup.controls[controlNameToMatch];
        if(matchingControl.errors && !matchingControl.errors['confirmPasswordValidator']){
            return;
        }
        if(control.value !== matchingControl.value){
            matchingControl.setErrors({confirmPasswordValidator:true});
        }else{
            matchingControl.setErrors(null);
        }
    }
}