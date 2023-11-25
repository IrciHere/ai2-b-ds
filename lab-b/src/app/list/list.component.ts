import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  listElements: string[];
  inputText: string;

  constructor() {
    this.listElements = [];
    this.inputText = '';
  }

  addElement() {
    this.listElements.push(this.inputText);
    this.inputText = '';
  }

  removeElement(index: number) {
    this.listElements.splice(index, 1);
  }
}
