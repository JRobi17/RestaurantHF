import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserAuthService} from './user-auth.service';
import {Observable} from "rxjs";
import {User} from "../classes/user";
import {Role} from "../classes/role";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = 'http://localhost:9090';
  requestHeader = new HttpHeaders({'No-Auth': 'True'});

  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {
  }

  public login(loginData: any) {
    return this.httpclient.post(this.PATH_OF_API + '/authenticate', loginData, {headers: this.requestHeader});
  }

  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + '/forUser', {responseType: 'text'});
  }


  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {responseType: 'text'});
  }

  public getAllUsers(): Observable<User[]> {
    return this.httpclient.get<User[]>(this.PATH_OF_API + '/getAllUsers')
  }

  public deleteUser(userName: string) {
    return this.httpclient.delete(this.PATH_OF_API + "/" + userName, {responseType: 'text'})
  }

  public registerNewUser(user: User) {
    return this.httpclient.post(this.PATH_OF_API + "/registerNewUser", user);
  }

  public getAllRoles(): Observable<Role[]> {
    return this.httpclient.get<Role[]>(this.PATH_OF_API + '/getAllRoles')
  }

  public roleMatch(allowedRoles: string | any[]): boolean {
    const userRoles: any = this.userAuthService.getRoles();
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
