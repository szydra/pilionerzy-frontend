import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../models/question';

import 'rxjs/add/operator/map';

@Injectable()
export class GameService {

  constructor(private http: HttpClient) { }

  sendAnswer(selected: string): Promise<string> {
    let url = "http://localhost:8080/answer/send/" + localStorage.getItem("gameId");
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, JSON.stringify({ "selected": selected }), { headers: headers })
      .toPromise()
      .then(res => {
        let answer = res['prefix'];
        if (answer !== selected) {
          localStorage.removeItem("gameId");
        }
        return answer;
      });
  }

  startNewGame(): Promise<void> {
    let url = "http://localhost:8080/game/start/";
    return this.http.get(url).toPromise().then(
      game => localStorage.setItem("gameId", game["id"])
    );
  }

  stopGame(): Promise<string> {
    let url = "http://localhost:8080/game/stop/" + localStorage.getItem("gameId");
    return this.http.get(url).toPromise().then(res => {
      localStorage.removeItem("gameId");
      return res["prefix"];
    });
  }

  getQuestion(): Promise<Question> {
    let url = "http://localhost:8080/question/get/";
    let gameId = localStorage.getItem("gameId");
    url += gameId ? gameId : 0;
    return this.http.get(url).map(res => <Question>res).toPromise();
  }
}
