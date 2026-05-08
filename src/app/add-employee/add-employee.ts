import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
})
export class AddEmployee implements OnInit {

  employee: any = {
    empDepartment: []
  };

  selectedFile: any;
  id: any;
  isEdit = false;

  constructor(
    private service: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      if (this.id) {
        this.isEdit = true;

        this.service.getEmployeeById(+this.id).subscribe((emp: any) => {

          this.employee = emp;

          // ✅ Department string → array
          if (emp.empDepartment) {
            this.employee.empDepartment = emp.empDepartment.split(',');
          } else {
            this.employee.empDepartment = [];
          }

        });
      }
    });
  }

  // ✅ File select
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // ✅ Submit (Add + Update)
  onSubmit() {
    const formData = new FormData();

    formData.append('empName', this.employee.empName);
    formData.append('empEmail', this.employee.empEmail);
    formData.append('empGender', this.employee.empGender);
    formData.append('empCity', this.employee.empCity);
    formData.append('aboutEmployee', this.employee.aboutEmployee || '');

    // ✅ Convert array → string
    formData.append('empDepartment', this.employee.empDepartment.join(','));

    // ✅ Send old image if exists
    if (this.employee.empImage) {
      formData.append('empImage', this.employee.empImage);
    }

    // ✅ Send new file if selected
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    // ✅ EDIT
    if (this.isEdit) {
      formData.append('empId', this.id);

      this.service.updateEmployee(formData).subscribe(() => {
        this.router.navigate(['/']);
      });

    } 
    // ✅ ADD
    else {
      this.service.addEmployee(formData).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  // ✅ Checkbox handling
  onDepartmentChange(event: any) {
    const value = event.target.value;

    if (event.target.checked) {
      if (!this.employee.empDepartment.includes(value)) {
        this.employee.empDepartment.push(value);
      }
    } else {
      this.employee.empDepartment =
        this.employee.empDepartment.filter((d: string) => d !== value);
    }
  }

  // ✅ Helper for checkbox checked
  isChecked(dept: string): boolean {
    return this.employee.empDepartment?.includes(dept);
  }

  goToList() {
    this.router.navigate(['/']);
  }
}