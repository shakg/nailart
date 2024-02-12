import { Component } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { OpenaiService } from "../../services/openai.service";

@Component({
  selector: "app-result",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./result.component.html",
  styleUrl: "./result.component.css",
})
export class ResultComponent {
  public mainColor: string = "";
  public secondaryColor: string = "";
  public baseStyle: string = "";
  public decoration: string = "";
  public texture: string = "";

  public generatingImage: boolean = true;
  public imageUrl: string = "";
  constructor(
    private route: ActivatedRoute,
    private openaiService: OpenaiService,
  ) {
    this.route.queryParams.subscribe((params) => {
      // Retrieve parameters from the URL
      this.mainColor = params["mainColor"];
      this.secondaryColor = params["secondaryColor"];
      this.baseStyle = params["style"];
      this.decoration = params["decoration"];
      this.texture = params["texture"];

      const prompt = `
        Generate me a MACRO SHOT nail art. I want ${this.decoration} patterns, with the texture of ${this.texture}
        I'll like to be it to ${this.mainColor} and ${this.secondaryColor} colors. Display image on some woman hand to be more accurate.
        DISPLAY ONLY THREE FINGERS. Make it ${this.baseStyle} I want the pattern to be the same on every nail.
        `;

      this.openaiService
        .generateImage(prompt)
        .subscribe((generatedImage: any) => {
          this.imageUrl = generatedImage.data[0].url;
          this.generatingImage = false;
        });
    });
  }
}
