import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Question } from '../models/question';

import * as config from '../config';
import { map } from 'rxjs/operators';

@Injectable()
export class GameService {

  constructor(private http: HttpClient) { }

  sendAnswer(selected: string): Promise<string> {
    let url = config.REST_ENDPOINT + "/games/"
      + this.readGameId() + "/answers";
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
      + this.readGameId() + "/stop";
    return this.http.put(url, null).toPromise().then(res => {
      localStorage.removeItem("gameId");
      return res["prefix"];
    });
  }

  getQuestion(): Promise<Question> {
    let url = config.REST_ENDPOINT + "/questions";
    let params = new HttpParams().set('game-id', this.readGameId());
    return this.http.get(url, { params: params })
      .pipe(map(res => <Question>res))
      .toPromise();
  }

  private readGameId(): string {
    let gameId = localStorage.getItem("gameId");
    return gameId ? gameId : '0';
  }
}
