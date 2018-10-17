import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../models/question';

import * as config from '../config';
import { map } from 'rxjs/operators';

@Injectable()
export class GameService {

  constructor(private http: HttpClient) { }

  sendAnswer(selected: string): Promise<string> {
    let url = config.REST_ENDPOINT + "/answer/send/"
      + localStorage.getItem("gameId");
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, JSON.stringify({ "selected": selected }),
      { headers: headers })
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
    let url = config.REST_ENDPOINT + "/games/start-new";
    return this.http.get(url).toPromise().then(
      game => localStorage.setItem("gameId", game["id"])
    );
  }

  stopGame(): Promise<string> {
    let url = config.REST_ENDPOINT + "/games/"
      + localStorage.getItem("gameId") + "/stop";
    return this.http.put(url, null).toPromise().then(res => {
      localStorage.removeItem("gameId");
      return res["prefix"];
    });
  }

  getQuestion(): Promise<Question> {
    let url = config.REST_ENDPOINT + "/question/get/";
    let gameId = localStorage.getItem("gameId");
    url += gameId ? gameId : 0;
    return this.http.get(url).pipe(map(res => <Question>res)).toPromise();
  }
}
