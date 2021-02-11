import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WebRequestService {
  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://192.168.1.73:3000';
  }

  login(username: string, password: string) {
    return this.http.post(
      `${this.ROOT_URL}/users/login`,
      {
        username,
        password,
      },
      {
        observe: 'response',
      }
    );
  }

  signup(username: string, password: string) {
    return this.http.post(
      `${this.ROOT_URL}/users`,
      {
        username,
        password,
      },
      {
        observe: 'response',
      }
    );
  }

  sendAudio(formData: FormData) {
    return this.http.post(`${this.ROOT_URL}/audio`, formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
}
