import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Question} from '../models/question';

import * as config from '../config';

@Injectable()
export class QuestionService {

  constructor(private http: HttpClient) {
  }

  addQuestion(question: Question): Promise<any> {
    const url = config.REST_ENDPOINT + '/questions';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(url, JSON.stringify(question), {headers: headers})
      .toPromise();
  }

}
