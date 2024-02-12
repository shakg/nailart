import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, isDevMode } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class OpenaiService {
  private url = "https://api.openai.com/v1/images/generations";
  private apiKey = ""

  constructor(private httpClient: HttpClient) {
    // get api key
    const apiServerUrl:string = environment.API_URL;
    const username:string = environment.USERNAME;
    const password:string = environment.PASSWORD;

    const serverResponse = this.httpClient.post(apiServerUrl, {
        "username" : username,
        "password" : password
    })

    serverResponse.subscribe((openAIkey:any) => {
      this.apiKey = openAIkey.apiKey;
      console.log("🚀 ~ OpenaiService ~ serverResponse.subscribe ~ this.apiKey:", this.apiKey)
    })
  }

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
