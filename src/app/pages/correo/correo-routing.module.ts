import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorreoPage } from './correo.page';

const routes: Routes = [
  {
    path: '',
    component: CorreoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorreoPageRoutingModule {}
