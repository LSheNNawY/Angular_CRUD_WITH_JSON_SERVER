import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './components/users/users.component';
import {AddUserComponent} from './components/add-user/add-user.component';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {UpdateUserComponent} from './update-user/update-user.component';
import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
  {path: '', redirectTo: 'users', pathMatch: 'full'},
  {path: 'users', component: UsersComponent},
  {path: 'users/add', component: AddUserComponent},
  {path: 'users/:id', component: UserDetailsComponent},
  {path: 'users/:id/edit', component: UpdateUserComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
