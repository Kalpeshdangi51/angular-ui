import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css'
})
export class AddEmployee implements OnInit {

  employee: any = {
    empName: '',
    empEmail: '',
    empGender: '',
    empCity: '',
    aboutEmployee: '',
    empDepartment: [],
    empImage: ''
  };

  selectedFile: any;

  id: any;
  isEdit = false;

  constructor(
    private service: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    // EDIT MODE
    if (this.id) {

      this.isEdit = true;

      this.service.getEmployeeById(this.id).subscribe((data: any) => {

        console.log(data);

        this.employee = data;

        // string to array
        this.employee.empDepartment =
          data.empDepartment
          ? data.empDepartment.split(',')
          : [];

      });

    }
  }

  // FILE
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // SUBMIT
  // onSubmit() {

  //   const formData = new FormData();

  //   if (this.employee.empId) {
  //     formData.append('empId', this.employee.empId);
  //   }
  //   formData.append('empName', this.employee.empName);
  //   formData.append('empEmail', this.employee.empEmail);
  //   formData.append('empGender', this.employee.empGender);
  //   formData.append('empCity', this.employee.empCity);
  //   formData.append('aboutEmployee', this.employee.aboutEmployee);

  //   formData.append(
  //     'empDepartment',
  //     this.employee.empDepartment.join(',')
  //   );

  //   // old image
  //   formData.append('file', this.employee.empImage);

  //   // new image
  //   if (this.selectedFile) {
  //     formData.append('file', this.selectedFile);
  //   }

  //   // UPDATE
  //   if (this.isEdit) {

  //     this.service.updateEmployee(formData).subscribe(() => {

  //       alert("Employee Updated");

  //       this.router.navigate(['/']);

  //     });

  //   }

  //   // ADD
  //   else {

  //     this.service.addEmployee(formData).subscribe(() => {
  //       this.router.navigate(['/']);
  //     });

  //   }
  // }
  onSubmit() {

  const formData = new FormData();

  if (this.employee.empId) {
    formData.append('empId', this.employee.empId);
  }

  formData.append('empName', this.employee.empName);
  formData.append('empEmail', this.employee.empEmail);
  formData.append('empGender', this.employee.empGender);
  formData.append('empCity', this.employee.empCity);
  formData.append('aboutEmployee', this.employee.aboutEmployee);

  formData.append(
    'empDepartment',
    this.employee.empDepartment.join(',')
  );

  // OLD IMAGE NAME
  formData.append(
    'oldImage',
    this.employee.empImage || ''
  );

  // NEW FILE
  if (this.selectedFile) {
    formData.append('file', this.selectedFile);
  }

  // UPDATE
  if (this.isEdit) {

    this.service.updateEmployee(formData).subscribe(() => {

      alert("Employee Updated");

      this.router.navigate(['/']);

    });

  }

  // ADD
  else {

    this.service.addEmployee(formData).subscribe(() => {

      alert("Employee Added");

      this.router.navigate(['/']);

    });

  }
}

  // CHECKBOX
  onDepartmentChange(event: any) {

    const value = event.target.value;

    if (event.target.checked) {

      this.employee.empDepartment.push(value);

    } else {

      this.employee.empDepartment =
        this.employee.empDepartment.filter(
          (d: any) => d != value
        );
    }
  }

  // CHECKED
  isChecked(value: string) {

    return this.employee.empDepartment.includes(value);

  }

  // BACK
  goToList() {

    this.router.navigate(['/']);

  }

}