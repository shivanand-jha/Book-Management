import { Component, OnInit, inject } from '@angular/core';
import { AdminService, User } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  private adminService = inject(AdminService);
  users:User[] = [];
  constructor() { }


  ngOnInit():void{
    this.getUsers();
  }
  
  getUsers(){
    this.adminService.getUser().subscribe({
      next : (res) => {
        console.log(res.data);
        this.users = res.data;
      },
      error:(err)=>{
        console.log(err);
      }
  })
}
}
