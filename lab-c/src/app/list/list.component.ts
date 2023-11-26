import { Component } from '@angular/core';
import {Person} from "../person";
import {PersonLsService} from "../person-ls.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  people: Person[] = [];

  constructor(private personLsService: PersonLsService) {
  }

  ngOnInit() {
    this.getPeople();
  }

  getPeople() {
    this.people = this.personLsService.getAll();
  }

  delete(index: number) {
    const deletedPerson = this.people[index];
    if (confirm(`Do you want to delete ${deletedPerson.firstName} ${deletedPerson.lastName}?`)) {
      this.personLsService.deletePerson(index);
      this.getPeople();
    }
  }
}
