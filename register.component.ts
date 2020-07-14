import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'

function symbolValidator(control){
  if(control.hasError('required')) return null;
  if(control.hasError('minlength')) return null;

  if(control.value.indexOf('@')>-1){
    return null;
  }
  else{
    return {symbol:true}
  }

}

function passwordMatchValidator(form){
  const password=form.get('password')
  const confirmPassword= form.get('confirmPassword')

  if(password.value!==confirmPassword.value){
    confirmPassword.setErrors({passwordMatch:true})
  }
  else{
    confirmPassword.setErrors(null)
  }
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;
  hide:boolean;
  hide1:boolean;
  user:any={};
  temp=[];
  

  constructor(private builder:FormBuilder){
    this.hide=true
    this.hide1=true
  }

  password(){
    this.hide = !this.hide;
  }

  ngOnInit(){
    this.buidForm()
  }

  buidForm(){
    this.registerForm=this.builder.group({
      fname:['',[Validators.required,Validators.maxLength(20)]],
      lname:['',[Validators.required,Validators.maxLength(20)]],
      emailId:['',[Validators.required,,Validators.maxLength(40)]],
      password:['',[Validators.required,symbolValidator,Validators.minLength(8)]],
      confirmPassword:'',
      dob:['',Validators.required],
      country:['',Validators.required]
    },{
      validators:passwordMatchValidator
    })
  }

  onSubmit(){
    console.log(this.registerForm.value);
    this.user=Object.assign(this.user,this.registerForm.value);
    this.addUsers(this.user);
  }

  addUsers(user){
    // let users=[];
    
    // const users1=localStorage.getItem('Users')
    this.temp.push(user)
    // console.log(temp)
    localStorage.setItem('Users',JSON.stringify(this.temp))

    if(localStorage.getItem('Users')){
      this.temp=JSON.parse(localStorage.getItem('Users'))
      console.log(this.temp)
    }
    else{
      console.log("hello")
    }
    let t=JSON.stringify(this.temp)
    // localStorage.setItem('Users',JSON.stringify(user));
  }
   
}

