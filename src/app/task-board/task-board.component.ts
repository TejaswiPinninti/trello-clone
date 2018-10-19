import { Component, OnInit } from '@angular/core';
import { TaskBoardService } from '../services/task-board.service';
import { TaskDetailsService } from '../services/task-details.service';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit {
  taskBoard;
  formEdit = false;
  model = { board_name: '' };
  constructor(
    private taskBoardService: TaskBoardService,
    private taskDetailsService: TaskDetailsService
  ) {}

  ngOnInit() {
    this.getTaskBoards();
  }

  createForm() {
    this.model = { board_name: '' };
    this.formEdit = !this.formEdit;
  }

  getTaskBoards() {
    this.taskBoardService.getTaskBoards().subscribe(data => {
      this.taskBoard = data;
    });
  }

  deleteTask(id) {
    this.taskBoardService.deleteTask(id).subscribe(data => {
      if (data['success']) {
        this.getTaskBoards();
      }
    });
  }

  createNewBoard() {
    this.taskBoardService.createNewBoard(this.model).subscribe(data => {
      if (data['success']) {
        this.getTaskBoards();
      }
      this.createForm();
    });
  }

  getListDetails(id) {
    this.taskDetailsService.setListUrl(id);
  }
}
