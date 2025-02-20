import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { NavigationBarComponent } from './shared/components/navigationbar/navigation-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LoaderComponent,NavigationBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'E-com';
}
