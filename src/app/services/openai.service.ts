import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class OpenaiService {
  private url = "https://api.openai.com/v1/images/generations";
  private apiKey = process.env['OPENAI_KEY'];

  constructor(private httpClient: HttpClient) {}

  generateImage(prompt: string) {
    const headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.apiKey,
    );
    const body = {
      model: "dall-e-3",
      prompt: prompt,
      num_images: 1,
      size: "1024x1024",
      response_format: "url",
    };
    return this.httpClient.post(this.url, body, { headers: headers });
  }
}
