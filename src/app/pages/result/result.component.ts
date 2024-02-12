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
    private openaiService: OpenaiService
  ) {
    this.route.queryParams.subscribe((params) => {
      // Retrieve parameters from the URL
      this.mainColor = params["mainColor"];
      this.secondaryColor = params["secondaryColor"];
      this.baseStyle = params["style"];
      this.decoration = params["decoration"];
      this.texture = params["texture"];

      const prompt = `
        You must strictly follow my prompt otherwise it will cause trouble. Generate me a MACRO SHOT nail art. I want realistic image. I want ${this.decoration} patterns, with the texture of ${this.texture}
        I'll like to be it to ${this.mainColor} and ${this.secondaryColor} colors. Display image on some woman hand to be more accurate.
        DISPLAY ONLY THREE FINGERS. Make it ${this.baseStyle} I want SIMPLE and SIMPLE patterns only. Real humans must be able to apply this patterns.P
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
