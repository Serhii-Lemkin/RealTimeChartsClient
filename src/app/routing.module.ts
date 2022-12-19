import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import HomeComponent from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'chat/:code', component: ChatComponent },
];

export const routing = RouterModule.forRoot(appRoutes);
