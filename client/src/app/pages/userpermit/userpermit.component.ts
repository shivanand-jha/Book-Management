import { Component, OnInit, inject } from '@angular/core';
import { AdminService, User } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userpermit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userpermit.component.html',
  styleUrl: './userpermit.component.css'
})
export class UserpermitComponent implements OnInit {
  private adminService: AdminService = inject(AdminService);
  users:User[] = [];



  
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
toggleDisableUser(user: User): void {
  this.adminService.updateUserStatus(user._id).subscribe({
    next: (response) => {
      console.log('User updated successfully:', response);
      user.disable = !user.disable; // Toggle disable status locally
    },
    error: (error) => {
      console.error('Error updating user', error);
      // Handle error response
    }
  });
}





}


