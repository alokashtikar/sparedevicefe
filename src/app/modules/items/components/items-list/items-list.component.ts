import {Component, OnInit} from '@angular/core';
import {ItemService} from "../../services/items.service";
import {IItem} from "../../models/IItem";
import {tap} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {CognitoUserInterface} from '@aws-amplify/ui-components';
import {AuthService} from "../../../auth/services/auth.service";
import {CreateItemComponent} from "../create-item/create-item.component";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {

  items: IItem[] = [];
  user: CognitoUserInterface | undefined;
  loggedIn = false;

  constructor(public dialog: MatDialog,
              private readonly itemsService: ItemService,
              private readonly authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authService.getAuthState()
      .pipe(tap((state) => this.loggedIn = state))
      .subscribe();

    this.itemsService.getItems()
      .pipe(
        tap((items) => this.items = items)
      ).subscribe();

    this.itemsService.getAllItems();
    this.itemsService.getUserItems();
  }

  createItem() {
    const dialogRef = this.dialog.open(CreateItemComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result: FormGroup) => {
      if (result !== undefined || result.value !== undefined) {
        this.itemsService.createItem({
          ...result.value,
          longitude: 2341324.1324,
          latitude: 243852.245,
        }).then(r => this.itemsService.getAllItems());
      }
    });
  }

  login() {
    this.router.navigateByUrl('/auth').then();
  }
}
