import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { routing } from './routing.module';
import { FormsModule } from '@angular/forms';
import HomeComponent from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { InviteComponent } from './components/invite/invite.component';
import { ChatComponent } from './components/chat/chat.component';
import { SendinviteComponent } from './components/sendinvite/sendinvite.component';
import { GameComponent } from './components/game/game.component';
import { LoginComponent } from './components/login/login.component';
import AuthInterseptor from './services/auth.intersepter';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    NavComponent,
    InviteComponent,
    ChatComponent,
    SendinviteComponent,
    LoginComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    HttpClientModule,
    routing,
    FormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterseptor, 
    multi:true,
    
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
