import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8080/employee';

  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getEmp`).pipe(
      map(data => data ?? [])  
    );
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getEmpById/${id}`);
  }

  addEmployee(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/saveEmp`, formData);
  }

  updateEmployee(formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateEmp`, formData);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteEmp/${id}`);
  }
}