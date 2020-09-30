import { Component, OnInit } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, finalize, map, tap } from "rxjs/operators";
import { User } from "../Model/UserModel";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  name: string = "";
  id: number;
  city: string = "";
  errorMessage: string = "Loading";

  data: any = [];
  allUsers: Observable<User[]>;

  constructor(private user: UserService) {
    console.warn(this.user.getUser());
    this.id = this.user.getUser().id;
    this.name = this.user.getUser().name;
    this.city = this.user.getUser().city;

    // this.user.getData().subscribe((data) => {
    //   if (!data["type"]) {
    //     console.log(data);
    //     this.data = data;
    //   } else {
    //     this.errorMessage = data["message"];
    //   }
    // });
  }

  ngOnInit() {
    this.loadAllUsers();

    var userDetails = this.user.getData().pipe(
      map((data) => {
        this.data = data;
        // console.log("Users Map Data: " + data);
      }),
      tap((data) => {
        // console.log("Users Tap: " + data);
      }),
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }),
      finalize(() => {
        console.log("Users Component Task Completed");
      })
    );

    userDetails.subscribe();
  }

  loadAllUsers() {
    this.allUsers = this.user.getAllUsers();
    console.log("all Users: " + this.allUsers);
  }
}
