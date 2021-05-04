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
  }

  getItems(): Observable<IItem[]> {
    return this.items.pipe();
  }

  async getAllItems(type: string, lat: number, long: number): Promise<IItem[]> {
    const path = `/open/items`;
    const myInit: any = {
      headers: {}, // OPTIONAL
      response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {  // OPTIONAL
        type: type,
        latitude: lat,
        longitude: long
      },
    };
    return await API.get('OpenAndUser', path, myInit)
  }

  async deleteItem(itemId: string): Promise<void> {
    console.log('createItem in Service called');
    const path = `/user/items`;
    const myInit: any = {
      queryStringParameters: {
        id: itemId
      },
      headers: {}, // OPTIONAL
      response: false // OPTIONAL (return the entire Axios response object instead of only response.data)
    };
    await API.del('OpenAndUser', path, myInit);
  }

  // async getUserItems(): Promise<void> {
  //   const path = `/user/items`;
  //   const myInit: any = {
  //     headers: {}, // OPTIONAL
  //     response: false // OPTIONAL (return the entire Axios response object instead of only response.data)
  //   };
  //
  //   await API.get('OpenAndUser', path, myInit).then(value => {
  //     console.log('User Items');
  //     console.log(value);
  //   });
  // }

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

  reloadItems(type: string, lat: number, long: number) {
    this.getAllItems(type, lat, long).then((items) => this.items.next(items));
  }

}
