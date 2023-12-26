import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MuseumComponent } from './museum/museum.component';
import { ReservationComponent } from './reservation/reservation.component';
import { WeatherComponent } from './client-app/weather/weather.component';
import { ClientComponent } from './client-app/client/client.component';
import { MuseumViewComponent } from './client-app/museum-view/museum-view.component';
import { RssFeedComponent } from './client-app/rss-feed/rss-feed.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { VirtualVisitComponent } from './client-app/virtual-visit/virtual-visit.component';
import { PaymentComponent } from './client-app/payment/payment.component';
import { GalleryComponent } from './client-app/gallery/gallery.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    MuseumComponent,
    ReservationComponent,
    WeatherComponent,
    ClientComponent,
    MuseumViewComponent,
    RssFeedComponent,
    LoginComponent,
    NavbarComponent,
    VirtualVisitComponent,
    PaymentComponent,
    GalleryComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
