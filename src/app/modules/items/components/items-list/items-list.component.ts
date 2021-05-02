import {Component, OnInit} from '@angular/core';
import {ItemService} from "../../services/items.service";
import {IItem} from "../../models/IItem";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {

  items: IItem[] = [];

  constructor(private readonly itemsService: ItemService) {
  }

  ngOnInit(): void {
    this.itemsService.getItem()
      .pipe(
        tap((items) => this.items = items)
      ).subscribe();
  }

}
