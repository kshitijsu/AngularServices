import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, finalize, tap } from "rxjs/operators";
import { Observable, of, throwError } from "rxjs";
import { User } from "../Model/UserModel";

@Injectable({
  providedIn: "root",
})
export class UserService {
  url: string = "https://jsonplaceholder.typicode.com/todos";

  webApiUrl: string = "http://localhost:64486/api/";

  constructor(private http: HttpClient) {}

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.webApiUrl + "/Users");
  }

  public getUser() {
    return {
      id: 101,
      name: "Kshitij",
      city: "Delhi",
    };
  }

  public getData() {
    return this.http.get(this.url).pipe(
      tap((data) => {
        console.log("Services Tap: " + data);
      }),
      catchError((error) => {
        console.log(error);
        // return throwError(error);
        return of({ type: "error", message: error["message"] });
      }),
      finalize(() => {
        console.log("Task Completed from Services");
      })
    );
  }
}
