import { NgModule } from "@angular/core";
import { UsersComponent } from './components/users/users.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UsersRoutingModule } from "./users.routing.module";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        UsersRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        UsersComponent,
        UpdateUserComponent,
    ]
})
export class UsersModule {
}