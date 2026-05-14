import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: any[] = [];

  constructor(
    private service: EmployeeService,
    private router: Router,
    private cdr: ChangeDetectorRef   
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.service.getAllEmployees().subscribe({
      next: (data) => {
        console.log('Data:', data);
        this.employees = [...data];  
        this.cdr.detectChanges();     
      },
      error: (err) => console.error('Error:', err)
    });
  }

  trackById(index: number, employee: any): number {
    return employee.empId;
  }

  addEmployee(): void {
    this.router.navigate(['/add-employee']);
  }

  updateEmployee(id: number) {
    this.router.navigate(['/edit-employee', id]); // 👈 route par mokle
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.service.deleteEmployee(id).subscribe({
        next: () => this.loadEmployees(),
        error: (err) => console.error('Delete error:', err)
      });
    }
  }
}