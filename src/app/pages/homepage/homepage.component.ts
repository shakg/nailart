import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: "app-homepage",
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: "./homepage.component.html",
  styleUrl: "./homepage.component.css",
})
export class HomepageComponent {
  constructor(private router: Router) {}

  selectedMainColor: string | null = null;
  selectedSecondaryColor: string | null = null;
  selectedStyle: string | null = null;
  selectedDecoration: string | null = null;
  selectedTexture: string | null = null;

  selectColor(color: string) {
    this.selectedMainColor = color;
  }

  selectSecondaryColor(color: string) {
    this.selectedSecondaryColor = color;
  }

  selectStyle(style: string) {
    this.selectedStyle = style;
  }
  selectDecoration(decoration: string) {
    this.selectedDecoration = decoration;
  }
  selectTexture(texture: string) {
    this.selectedTexture = texture;
  }
  generateNailArt() {
    if (
      !this.selectedMainColor ||
      !this.selectedSecondaryColor ||
      !this.selectedStyle
    ) {
      alert("Please make all selections before generating nail art!");
      return;
    }
    this.router.navigate(["/result"], {
      queryParams: {
        mainColor: this.selectedMainColor,
        secondaryColor: this.selectedSecondaryColor,
        style: this.selectedStyle,
        decoration: this.selectedDecoration,
        texture: this.selectedTexture,
      },
    });
  }
}
