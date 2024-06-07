import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'spaceflightnews';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
  }

  ngOnInit() {
    this.svgIconsResolver();
  }

  private svgIconsResolver(): void {
    this.matIconRegistry.addSvgIconResolver((iconName: string) =>
      this.domSanitizer.bypassSecurityTrustResourceUrl(`./assets/icons/${iconName}.svg`)
    );
  }

}
