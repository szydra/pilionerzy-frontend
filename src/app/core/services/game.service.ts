import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Question} from '../models/question';

import * as config from '../../config';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Level} from '../../game/models/level';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) {
  }

  private static readGameId(): string {
    return localStorage.getItem('gameId') || '0';
  }

  sendAnswer(selected: string): Observable<any> {
    const url = `${config.REST_ENDPOINT}/games/${GameService.readGameId()}/answers`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<{ prefix: string }>(url, {selected}, {headers})
      .pipe(
        tap(game => game.correctAnswer !== selected && localStorage.removeItem('gameId'))
      );
  }

  startNewGame(): Observable<any> {
    const url = `${config.REST_ENDPOINT}/games/start-new`;
    return this.http.get(url)
      .pipe(tap(game => localStorage.setItem('gameId', game['id'])));
  }

  stopGame(): Observable<string> {
    const url = `${config.REST_ENDPOINT}/games/${GameService.readGameId()}/stop`;
    return this.http.post<{ correctAnswer: string }>(url, null)
      .pipe(
        map(res => res['correctAnswer']),
        tap(() => localStorage.removeItem('gameId'))
      );
  }

  getLevels(): Observable<Level[]> {
    const url = `${config.REST_ENDPOINT}/games/levels`;
    return this.http.get<Level[]>(url);
  }

  getQuestion(): Observable<Question> {
    const url = `${config.REST_ENDPOINT}/games/${GameService.readGameId()}/questions`;
    return this.http.get<Question>(url);
  }

  getTwoIncorrectAnswers(): Observable<string[]> {
    const url = `${config.REST_ENDPOINT}/games/${GameService.readGameId()}/fifty-fifty`;
    return this.http.get<{ incorrectPrefixes: string[] }>(url)
      .pipe(map(response => response['incorrectPrefixes']));
  }

  getFriendAnswer(): Observable<Map<string, string>> {
    const url = `${config.REST_ENDPOINT}/games/${GameService.readGameId()}/phone-a-friend`;
    return this.http.get<Map<string, string>>(url);
  }

  getAudienceAnswer(): Observable<{ votesChart: Map<string, string> }> {
    const url = `${config.REST_ENDPOINT}/games/${GameService.readGameId()}/ask-the-audience`;
    return this.http.get<{ votesChart: Map<string, string> }>(url);
  }
}
