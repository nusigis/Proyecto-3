import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//import { FormGroup, FormControl } from '@angular/forms'; //<-----------
import { FormGroup, FormControl, Validators } from '@angular/forms'; //<-----------
import { UserService } from '../service/user.service';
import { User } from '../classes/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  private user: User = this.userService.user;
  id: number;
  //proiedad (el modelo de mi formulario):--------------------
  private userForm = new FormGroup({
    name: new FormControl('', Validators.minLength(3)),
    lastName: new FormControl('', Validators.minLength(3)),
    adress: new FormControl('', Validators.required),
    age: new FormControl('', [Validators.min(18), Validators.max(130)])
  });

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {
    console.log('this.user.id = ', this.user.id)
    if(this.user.id != null){
      this.id = this.user.id;
      console.log('this.user=', this.user);
      this.userForm.patchValue({ name: this.user.name });
      this.userForm.patchValue({ lastName: this.user.lastName });
      this.userForm.patchValue({ adress: this.user.adress });
      this.userForm.patchValue({ age: this.user.age });
      this.userService.delete(this.user);
    }
  }

  

  ngOnInit() {
    console.log('from snapshot', this.route.snapshot.paramMap.get('id'));
    this.route.paramMap.subscribe((paramMap) => {
      console.log('from subscribe', paramMap.get('id'));
    });
    console.log('properties', this.userForm);
  }
  
  //id: number = this.user.id;
  handleSubmit(event) {
    //event.preventDefault();
    // this.userService.delete(this.user);
    console.log('this.user = ', this.user)
    if (this.user != null) {
      this.user = {
        id: this.id,
        name: this.userForm.controls['name'].value,
        lastName: this.userForm.controls['lastName'].value,
        adress: this.userForm.controls['adress'].value,
        age: this.userForm.controls['age'].value
      }
      this.user.id = this.id;
      this.userService.addUser(this.user);
      this.router.navigate(['users']);
    } else {
      
      //this.user.id = this.id;
      this.userService.addUser(this.user);
      this.router.navigate(['users']);
    }
  }

}
