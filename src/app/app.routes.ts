import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployee } from './add-employee/add-employee';

export const routes: Routes = [
  { path: '', redirectTo: 'employee-list', pathMatch: 'full' },
  { path: 'employee-list', component: EmployeeListComponent },
  { path: 'add-employee', component: AddEmployee },  
  { path: 'edit-employee/:id', component: AddEmployee }
];