import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TaskDetailsService {
  listUrl;
  baseUrl = 'https://mean-trello-clone.herokuapp.com';
  listId;
  constructor(private http: HttpClient) {}

  setListUrl(id) {
    this.listId = id;
    this.listUrl = `${this.baseUrl}/lists/getList/${id}`;
  }

  getListDetails(list_details_url) {
    return this.http.get(list_details_url);
  }

  createList(list_name, board_id) {
    const newlist = {
      list_name: list_name
    };
    return this.http.put(`${this.baseUrl}/lists/create/${board_id}`, newlist);
  }

  deleteList(board_id, list_id) {
    return this.http.put(
      `${this.baseUrl}/lists/delete/${board_id}/${list_id}`,
      ''
    );
  }

  updateListName(list_id, list_name) {
    const list = {
      list_name: list_name
    };
    return this.http.put(`${this.baseUrl}/lists/updateList/${list_id}`, list);
  }

  getTasks(listname) {
    return this.http.get(`${this.baseUrl}/tasks/getTasks/${listname}`);
  }

  createTask(taskname, listname) {
    const task = {
      task_name: taskname
    };
    return this.http.post(`${this.baseUrl}/tasks/create/${listname}`, task);
  }

  updateTaskName(task_id, task_name) {
    const list = {
      task_name: task_name
    };
    return this.http.put(`${this.baseUrl}/tasks/update/${task_id}`, list);
  }

  deleteTask(list_id, task_id) {
    return this.http.put(
      `${this.baseUrl}/tasks/delete/${list_id}/${task_id}`,
      ''
    );
  }
}
