import { Directive, AfterViewInit } from '@angular/core';

declare var $: any;
@Directive({
  selector: '[appTaskBoard]'
})
export class TaskBoardDirective implements AfterViewInit {
  constructor() {}
  ngAfterViewInit() {
    $(document).ready(function() {
      $('.add-card').click(function(event) {
        $('.new-card').hide();
        $(this)
          .prev()
          .addClass('selected-card')
          .show();
        $('.overlay').show();
        event.stopPropagation();
      });
      $('.new-card,.edit-task-name').click(function(event) {
        event.stopPropagation();
      });
      $('.task-name').click(function(event) {
        $('.overlay').show();
        $(this)
          .hide()
          .next()
          .show()
          .addClass('selected-card');
        event.stopPropagation();
      });
      $('.overlay,.save-card,.cancel-card').click(function() {
        $('.overlay,.edit-dialog').hide();
        $(this)
          .parent()
          .prev()
          .show();
      });
    });
  }
}
