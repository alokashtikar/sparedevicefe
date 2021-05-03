import {Injectable} from '@angular/core';
import {IItem} from "../models/IItem";
import {BehaviorSubject, Observable} from "rxjs";

import API from '@aws-amplify/api';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private readonly items: BehaviorSubject<IItem[]> = new BehaviorSubject([]);

  constructor() {
    this.reloadItems();
  }

  getItems(): Observable<IItem[]> {
    return this.items.pipe();
  }

  async getAllItems(): Promise<IItem[]> {
    const path = `/open/items`;
    const myInit: any = {
      headers: {}, // OPTIONAL
      response: false // OPTIONAL (return the entire Axios response object instead of only response.data)
    };
    return await API.get('OpenAndUser', path, myInit)
  }

  async getUserItems(): Promise<void> {
    const path = `/user/items`;
    const myInit: any = {
      headers: {}, // OPTIONAL
      response: false // OPTIONAL (return the entire Axios response object instead of only response.data)
    };

    await API.get('OpenAndUser', path, myInit).then(value => {
      console.log('User Items');
      console.log(value);
    });
  }

  async createItem(item: IItem) {
    console.log('createItem in Service called');
    const path = `/user/items`;
    const myInit: any = {
      body: {item},
      headers: {}, // OPTIONAL
      response: false // OPTIONAL (return the entire Axios response object instead of only response.data)
    };
    await API.post('OpenAndUser', path, myInit);
  }

  reloadItems() {
    this.getAllItems().then((items) => this.items.next(items));
  }

}
