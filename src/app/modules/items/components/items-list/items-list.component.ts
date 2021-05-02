import {Component, OnInit} from '@angular/core';
import {ItemService} from "../../services/items.service";
import {IItem} from "../../models/IItem";
import {tap} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {CreateItemComponent} from "../create-item/create-item.component";

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {

  items: IItem[] = [];

  constructor(public dialog: MatDialog, private readonly itemsService: ItemService) {
  }

  ngOnInit(): void {
    this.itemsService.getItem()
      .pipe(
        tap((items) => this.items = items)
      ).subscribe();
  }

  createItem() {
    const dialogRef = this.dialog.open(CreateItemComponent, {
      width: '350px',
    });
  }

}
