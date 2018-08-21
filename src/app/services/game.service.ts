import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../models/question';

@Injectable()
export class GameService {

  constructor(private http: HttpClient) { }

  sendAnswer(selected: string): Promise<string> {
    let url = "http://localhost:8080/answer/send/" + localStorage.getItem("gameId");
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, JSON.stringify({ "sentAnswer": selected }), { headers: headers })
      .toPromise()
      .then(res => {
        let answer = res['prefix'];
        if (answer !== selected) {
          localStorage.removeItem("gameId");
        }
        return answer;
      });
  }

  getQuestion(): Promise<Question> {
    let url = "http://localhost:8080/question/get/";
    let gameId = localStorage.getItem("gameId");
    url += gameId ? gameId : 0;
    return this.http.get(url).toPromise()
      .then(res => {
        localStorage.setItem("gameId", res['gameId']);
        return res['question'];
      });
  }
}
