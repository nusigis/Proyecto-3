import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router' //<--------------------
import { ReactiveFormsModule } from '@angular/forms';  //<--------------------

import { AppComponent } from './app.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { UserFilterComponent } from './user-filter/user-filter.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserService } from './service/user.service';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {path: 'users', component: UsersTableComponent},
  {path: 'users-edit', component: UserFormComponent},
  {path: 'users-edit/:id', component: UserFormComponent},
  {path: '', redirectTo: 'users', pathMatch: 'full'},
  {path: '**', component: UserFilterComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    UsersTableComponent,
    UserFilterComponent,
    UserFormComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), //<--------------------
    ReactiveFormsModule //<---------------------
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
