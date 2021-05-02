import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ItemService} from "../../services/items.service";
import {IItem} from "../../models/IItem";
import {tap} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {CreateItemComponent} from "../create-item/create-item.component";
import {FormGroup} from "@angular/forms";
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {

  items: IItem[] = [];
  user: CognitoUserInterface | undefined;
  authState: AuthState;

  constructor(public dialog: MatDialog, private readonly itemsService: ItemService, private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.itemsService.getItem()
      .pipe(
        tap((items) => this.items = items)
      ).subscribe();

    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
    });
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }

  createItem() {
    const dialogRef = this.dialog.open(CreateItemComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result: FormGroup) => {
      console.log(result.value);
    });
  }

}
