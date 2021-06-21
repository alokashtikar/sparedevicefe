import {Component, OnInit} from '@angular/core';
import {ItemService} from '../../services/items.service';
import {IItem, ItemTypes} from '../../models/IItem';
import {tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {CognitoUserInterface} from '@aws-amplify/ui-components';
import {AuthService} from '../../../auth/services/auth.service';
import {CreateItemComponent} from '../create-item/create-item.component';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {noop} from 'rxjs';
import {ILocation, LocationService} from '../../services/location/location.service';
import Auth from '@aws-amplify/auth';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {

  items: IItem[] = [];
  user: CognitoUserInterface | undefined;
  username: undefined;
  userId: undefined;
  loggedIn = false;
  position: any;
  types = ItemTypes;
  selection = undefined;
  city = 'your area';

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
      .subscribe(_ => Auth.currentUserInfo().then(value => this.userId = value.attributes.sub));

    this.itemsService.getItems()
      .pipe(
        tap((items) => this.items = items.sort((a, b) => a.proximity - b.proximity))
      ).subscribe((x) => console.log(x));

    this.updatePosition();
  }

  getViewValue(type: string): string {
    for (let i = 0; i < ItemTypes.length; i++) {
      if (type === ItemTypes[i].value) {
        return ItemTypes[i].viewValue;
      }
    }
    return type;
  }

  replaceNewLine(desc: string): string {
    const re = /\n/gi;
    return desc.replace(re, '<br>');
  }

  delete(id: string): void {
    confirm('You are about to delete your post. Continue?')
    ? this.itemsService.deleteItem(id).then(_ => this.updateItems()) : noop();
  }

  createItem(): void {
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
        }).then(_ => this.updateItems());
      }
    });
  }

  login(): void {
    this.loggedIn ? this.authService.logout() : this.router.navigateByUrl('/auth').then();
  }


  updatePosition(): void {
    this.getPosition().then((pos) => {
      this.locationService.getLocationDetails()
        .subscribe((res) => {
          this.city = res.locality;
        });
      this.position = pos;
      this.updateItems();
    }, (_) => {
      this.position = null;
      this.updateItems();
    });
  }

  updateItems(): void {
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
        reject('Timeout!');
      }, 10000);
    });
  }
}
