import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Question } from '../models/question';

@Injectable()
export class GameService {

  constructor(private http: Http) { }

  sendAnswer(selected: string): Promise<string> {
    let url = "http://localhost:8080/answer/send/" + localStorage.getItem("gameId");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(url, JSON.stringify({ "sentAnswer": selected }), { headers: headers })
      .toPromise()
      .then(res => {
        let answer = res.text();
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
        let json = res.json();
        if (!gameId) {
          localStorage.setItem("gameId", json.gameId);
        }
        return json.question;
      });
  }
}
