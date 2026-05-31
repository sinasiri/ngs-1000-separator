import { Component, signal } from '@angular/core';
import { Ngs1000Separator } from 'ngs-1000-separator';
@Component({
  selector: 'app-root',
  imports: [Ngs1000Separator],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
}
