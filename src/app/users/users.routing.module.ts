import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersComponent } from "./components/users/users.component";
import { UpdateUserComponent } from "./components/update-user/update-user.component";

const routes: Routes = [
    { path: '', component: UsersComponent },
    { path: 'user', component: UpdateUserComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
}