import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { TaskBoardService } from './services/task-board.service';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { TaskDetailsService } from './services/task-details.service';
import { TaskBoardDirective } from './task-board.directive';

const appRoutes: Routes = [
  { path: 'home', component: TaskBoardComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'tasks', component: TaskManagerComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TaskBoardComponent,
    TaskManagerComponent,
    TaskBoardDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [TaskBoardService, TaskDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
