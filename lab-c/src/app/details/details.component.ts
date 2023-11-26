import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PersonLsService} from "../person-ls.service";
import {Person} from "../person";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  personId: number = -1;
  person?: Person;

  constructor(private route: ActivatedRoute, private personLsService: PersonLsService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.personId = params['id'] || -1;
    })

    if (this.personId >= 0) {
      this.person = this.personLsService.getPerson(this.personId) || undefined;
    }
  }
}
