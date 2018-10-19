import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class TaskBoardService {
  baseUrl = 'https://mean-trello-clone.herokuapp.com/boards';
  constructor(private http: HttpClient) {}

  getTaskBoards() {
    return this.http.get(`${this.baseUrl}/getBoards`);
  }

  deleteTask(id) {
    return this.http.delete(`${this.baseUrl}/deleteBoard/${id}`);
  }

  createNewBoard(data) {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post(`${this.baseUrl}/createBoard`, data, {
      headers: headers
    });
  }

  getCurrentBoard(board_id) {
    return this.http.get(`${this.baseUrl}/getBoard/${board_id}`);
  }
}
