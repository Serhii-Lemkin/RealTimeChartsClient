import { Routes, RouterModule } from '@angular/router';
import { ChartsComponent } from './components/charts/charts.component';
import HomeComponent from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';


const appRoutes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'charts', component: ChartsComponent },
];

export const routing = RouterModule.forRoot(appRoutes);
