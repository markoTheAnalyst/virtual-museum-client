import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client-app/client/client.component';
import { LoginComponent } from './login/login.component';
import { MuseumViewComponent } from './client-app/museum-view/museum-view.component';
import { AuthGuard } from './services/auth.guard';
import { VirtualVisitComponent } from './client-app/virtual-visit/virtual-visit.component';
import { PaymentComponent } from './client-app/payment/payment.component';
import { GalleryComponent } from './client-app/gallery/gallery.component';
import { MuseumComponent } from './museum/museum.component';
import { RegisterComponent } from './register/register.component';
import { AdminGuard } from './services/admin.guard';

const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: RegisterComponent
  },
  {
    path: 'museums',
    component: ClientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'visits',
    component: VirtualVisitComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'gallery/:id',
    component: GalleryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payment/:id',
    component: PaymentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: MuseumComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'museums/:id',
    component: MuseumViewComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: '**', 
    component: RegisterComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
