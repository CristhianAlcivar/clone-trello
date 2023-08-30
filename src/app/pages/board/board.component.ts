import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '../../components/todo-dialog/todo-dialog.component'

import {faPlus} from '@fortawesome/free-solid-svg-icons';

import { ToDo, Column, Board } from 'src/app/models/todo.models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
    `
    .cdk-drop-list-dragging .cdk-drag{
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
    .cdk-drag-animating {
      transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
    }
    `
  ]
})
export class BoardComponent implements OnInit {
  faPlus = faPlus;
  boards:Board[]=[
    {
      columns:[
        {
          title: 'ToDo',
          todos: [
            {
              id: '1',
              title: 'ToDo Task 1'
            },
            {
              id: '2',
              title: 'ToDo Task 2'
            },
            {
              id: '3',
              title: 'ToDo Task 3'
            }
          ]
        },
        {
          title: 'Doing',
          todos: [
            {
              id: '1',
              title: 'Doing Task 1'
            },
            {
              id: '2',
              title: 'Doing Task 2'
            },
            {
              id: '3',
              title: 'Doing Task 3'
            }
          ]
        },
        {
          title: 'Done',
          todos: [
            {
              id: '1',
              title: 'Done Task 1'
            },
            {
              id: '2',
              title: 'Done Task 2'
            },
            {
              id: '3',
              title: 'Done Task 3'
            }
          ]
        }
      ]
    }
  ];
  constructor(
    private dialog:Dialog
  ) {

  }
  ngOnInit(): void {

  }
  dropColumns($event: CdkDragDrop<Board[]>){
    moveItemInArray($event.container.data, $event.previousIndex, $event.currentIndex);
  }
  drop($event: CdkDragDrop<ToDo[]>){
    if($event.previousContainer === $event.container){
      moveItemInArray($event.container.data, $event.previousIndex, $event.currentIndex);
    }else{
      transferArrayItem($event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
        );
    }
  }
  addColumn(){
    this.boards[0].columns.push({
      title:'new columns',
      todos:[]
    })
  }
  addCard(title: string){
    let card = this.boards[0].columns.find(x=>x.title==title)?.todos;
    card?.push({
      id: '0',
      title: 'new card'
    })
  }
  openDialog(todo: ToDo){
    const dialogRef = this.dialog.open(TodoDialogComponent,{
      minWidth: '300px',
      maxWidth: '50%',
      autoFocus: false,
      data:{
        todo:todo
      }
    });
    dialogRef.closed.subscribe(output=>{
      console.log(output)
    })
  }
}
