import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Question} from '../models/question';

import * as config from '../config';
import {map} from 'rxjs/operators';

@Injectable()
export class GameService {

  constructor(private http: HttpClient) {
  }

  private static readGameId(): string {
    const gameId = localStorage.getItem('gameId');
    return gameId ? gameId : '0';
  }

  sendAnswer(selected: string): Promise<string> {
    const url = config.REST_ENDPOINT + '/games/'
      + GameService.readGameId() + '/answers';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(url, JSON.stringify({'selected': selected}),
      {headers: headers})
      .toPromise()
      .then(res => {
        const answer = res['prefix'];
        if (answer !== selected) {
          localStorage.removeItem('gameId');
        }
        return answer;
      });
  }

  startNewGame(): Promise<void> {
    const url = config.REST_ENDPOINT + '/games/start-new';
    return this.http.get(url).toPromise().then(
      game => localStorage.setItem('gameId', game['id'])
    );
  }

  stopGame(): Promise<string> {
    const url = config.REST_ENDPOINT + '/games/'
      + GameService.readGameId() + '/stop';
    return this.http.put(url, null).toPromise().then(res => {
      localStorage.removeItem('gameId');
      return res['prefix'];
    });
  }

  getQuestion(): Promise<Question> {
    const url = config.REST_ENDPOINT + '/questions';
    const params = new HttpParams().set('game-id', GameService.readGameId());
    return this.http.get(url, {params: params})
      .pipe(map(res => <Question>res))
      .toPromise();
  }

  getTwoIncorrectAnswers(): Promise<string[]> {
    const url = config.REST_ENDPOINT + '/games/' + GameService.readGameId()
      + '/fifty-fifty';
    return this.http.get(url).toPromise()
      .then(response => response['incorrectPrefixes']);
  }

  getAudienceAnswer(): Promise<Map<string, string>> {
    const url = config.REST_ENDPOINT + '/games/' + GameService.readGameId()
      + '/ask-the-audience';
    return this.http.get(url)
      .pipe(map(res => <Map<string, string>>res))
      .toPromise();
  }
}
