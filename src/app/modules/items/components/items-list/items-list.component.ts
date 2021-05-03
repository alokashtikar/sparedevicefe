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
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {

  items: IItem[] = [];
  user: CognitoUserInterface | undefined;
  loggedIn = false;
  position: any;

  constructor(public dialog: MatDialog,
              private readonly itemsService: ItemService,
              private readonly authService: AuthService,
              private snackBar: MatSnackBar,
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

    this.getPosition().then((pos) => {
      this.position = pos;
    }, (error) => this.position = null);
  }

  createItem() {
    if (this.position === undefined || this.position === null) {
      this.snackBar.open('Unable to get location! Please enable location to create an item.', 'Close');
      this.getPosition().then();
      return;
    }
    const dialogRef = this.dialog.open(CreateItemComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: FormGroup) => {
      if (result !== undefined && result.value !== undefined) {
        this.itemsService.createItem({
          ...result.value,
          ...this.position
        }).then(r => this.itemsService.reloadItems());
      }
    });
  }

  login() {
    this.router.navigateByUrl('/auth').then();
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
          resolve({longitude: resp.coords.longitude, latitude: resp.coords.latitude});
        },
        err => {
          reject(err);
        });

      setTimeout(() => {
        reject('Timeout!')
      }, 10000);
    });
  }
}
