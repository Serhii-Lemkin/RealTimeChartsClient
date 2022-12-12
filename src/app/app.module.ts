import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { ChartsComponent } from './components/charts/charts.component';
import { routing } from './routing.module';
import { FormsModule } from '@angular/forms';
import HomeComponent from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { InviteComponent } from './components/invite/invite.component';
import { ChatComponent } from './components/chat/chat.component';
import { SendinviteComponent } from './components/sendinvite/sendinvite.component';
import { GameComponent } from './components/game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ChartsComponent,
    HomeComponent,
    NavComponent,
    InviteComponent,
    ChatComponent,
    SendinviteComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    HttpClientModule,
    routing,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
