import {Component, OnInit} from '@angular/core';
import {ItemService} from "../../services/items.service";
import {IItem, ItemTypes} from "../../models/IItem";
import {tap} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {CognitoUserInterface} from '@aws-amplify/ui-components';
import {AuthService} from "../../../auth/services/auth.service";
import {CreateItemComponent} from "../create-item/create-item.component";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {noop} from 'rxjs';
import {ILocation, LocationService} from '../../services/location/location.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {

  items: IItem[] = [];
  user: CognitoUserInterface | undefined;
  username: undefined;
  loggedIn = false;
  position: any;
  types = ItemTypes;
  selection = ItemTypes[0].value;

  constructor(public dialog: MatDialog,
              private readonly itemsService: ItemService,
              private readonly authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router,
              private locationService: LocationService) {
  }

  ngOnInit(): void {
    this.authService.getAuthState()
      .pipe(tap((state) => this.loggedIn = state))
      .subscribe();

    this.authService.getUserInfo()
      .pipe(tap((userInfo) => this.user = userInfo))
      .subscribe();

    this.itemsService.getItems()
      .pipe(
        tap((items) => this.items = items.sort((a, b) => b.lastUpdatedDateTime - a.lastUpdatedDateTime))
      ).subscribe();

    this.updatePosition();
  }

  delete(id: string): void {
    confirm('You are about to delete your post. Continue?')
    ? this.itemsService.deleteItem(id).then(r => this.updateItems()) : noop();
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
        }).then(r => this.updateItems());
      }
    });
  }

  login() {
    this.router.navigateByUrl('/auth').then();
  }


  updatePosition() {
    this.getPosition().then((pos) => {
      this.position = pos;
      this.updateItems();
    }, (error) => {
      this.position = null;
      this.updateItems();
    });
  }

  updateItems() {
    if (this.position !== undefined) {
      this.itemsService.reloadItems(this.selection,
        this.position !== null ? this.position.latitude : undefined,
        this.position !== null ? this.position.longitude : undefined);
    }
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
          const location: ILocation = {longitude: resp.coords.longitude, latitude: resp.coords.latitude};

          resolve(location);
          this.locationService.updateLocation(location);
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
