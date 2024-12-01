import { inject, Injectable, signal } from "@angular/core";
import { User } from "./model/product.model";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user = signal<User[]>([]);
    isUserExist = signal(false);
    private routes = inject(Router);
    private toastr = inject(ToastrService);
    constructor() {
        let user = localStorage.getItem('users');
        if (user) {
            this.user.set(JSON.parse(user));
        }
    }
    signUp(userData: User) {
        console.log(userData)
        this.user.set([...this.user(), userData])
        this.routes.navigate(['/login']);
        this.SaveUser();
    }
    Login(email: string, password: string) {
        let isUserExist = this.user().some((user) =>
            user.email === email && user.password === password);
        if (isUserExist) {
            this.isUserExist.update(() => true);
            this.routes.navigate(['']);
            this.toastr.success("Logged In successfully")
        }
        else {
            this.toastr.success('email or password Invalid');
        }
    }
    LogOut() {
        this.isUserExist.update(() => false);
    }
    SaveUser() {
        localStorage.setItem('users', JSON.stringify(this.user()));
    }
}