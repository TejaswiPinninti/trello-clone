import { Component, OnInit } from '@angular/core';
import { TaskBoardService } from '../services/task-board.service';
import { TaskDetailsService } from '../services/task-details.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit {
  tasks;
  showCreateLists: boolean;
  tasksList;
  listName;
  boardName;
  updateError;
  updateErrorMsg;
  taskName;
  newTasksList = [];
  showCreateTasks;
  constructor(
    private taskBoardService: TaskBoardService,
    private taskDetailsService: TaskDetailsService,
    private router: Router
  ) {}

  showLists() {
    this.taskBoardService
      .getCurrentBoard(this.taskDetailsService.listId)
      .subscribe(data => {
        if (data) {
          this.boardName = data['board_name'];
          this.taskDetailsService
            .getListDetails(this.taskDetailsService.listUrl)
            .subscribe(listDetails => {
              this.tasks = listDetails;
              this.tasksList = this.tasks['lists'];
              this.newTasksList = [];
              this.tasksList.forEach(val => {
                this.taskDetailsService
                  .getTasks(val._id)
                  .subscribe(taskDetails => {
                    if (taskDetails['task']) {
                      val.tasks = taskDetails['task']['tasks'];
                    }
                    this.newTasksList.push(val);
                    console.log(this.newTasksList);
                    this.newTasksList.sort(function(a, b) {
                      return a['_id'].localeCompare(b['_id']);
                    });
                  });
              });
            });
        }
      });
  }
  ngOnInit() {
    if (this.taskDetailsService.listId) {
      this.showLists();
    } else {
      this.router.navigate(['/']);
    }
  }

  createList(listname, board_id) {
    this.taskDetailsService.createList(listname, board_id).subscribe(data => {
      if (data['success']) {
        this.showLists();
        this.listName = '';
        this.showCreateLists = false;
        this.updateError = false;
      } else {
        this.updateError = true;
        this.updateErrorMsg = 'List with the same name already exists';
        console.log(data);
      }
    });
  }
  updateListName(list_id, list_name) {
    this.taskDetailsService
      .updateListName(list_id, list_name)
      .subscribe(data => {
        if (!data['success']) {
          this.updateError = true;
          this.updateErrorMsg = 'List with the same name already exists';
          console.log(data);
        } else {
          this.updateError = false;
        }
      });
  }
  deleteList(board_id, list_id) {
    console.log(board_id, list_id);
    this.taskDetailsService.deleteList(board_id, list_id).subscribe(data => {
      if (data['success']) {
        this.showLists();
      }
    });
  }
  hideCreateList() {
    this.listName = '';
    this.showCreateLists = false;
  }

  createTask(taskname, listname) {
    if (taskname) {
      this.taskDetailsService.createTask(taskname, listname).subscribe(data => {
        if (data['success']) {
          this.showCreateTasks = false;
          this.taskName = '';
          this.showLists();
        }
      });
    }
  }
  updateTaskName(task_id, task_name) {
    this.taskDetailsService
      .updateTaskName(task_id, task_name)
      .subscribe(data => {
        if (!data['success']) {
          this.updateError = true;
          this.updateErrorMsg = 'List with the same name already exists';
          console.log(data);
        } else {
          this.updateError = false;
        }
      });
  }

  deleteTask(list_id, task_id) {
    this.taskDetailsService.deleteTask(list_id, task_id).subscribe(data => {
      if (data['success']) {
        this.showLists();
      }
    });
  }

  cancelAddTask() {
    this.taskName = '';
  }
}
