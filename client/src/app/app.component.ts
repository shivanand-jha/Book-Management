import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee , faHome} from '@fortawesome/free-solid-svg-icons';
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, FooterComponent,FontAwesomeModule]
})
export class AppComponent {

  constructor(private title : Title){
    title.setTitle("Book Store");
  }


  faHome = faHome;
  faCoffee = faCoffee;
}
