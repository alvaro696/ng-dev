import { Component } from '@angular/core';
import { Navbar } from "./components/navbar/navbar";
import { Footer } from "./components/footer/footer";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [Navbar, Footer, RouterOutlet],
  templateUrl: './landing.html',
  styles: ``
})
export class Landing {

}
