import {Injectable} from '@angular/core';
import {IItem} from "../models/IItem";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private readonly items: BehaviorSubject<IItem[]> = new BehaviorSubject([]);

  constructor() {
    // mock data;
    this.items.next([
      {
        id: 'XYZ',
        description: 'Example description',
        isValid: true,
        lastUpdateDateTime: Date.now(),
        lastUpdatedBy: "WaqasShargeel",
        location: {
          lat: 0,
          lon: 0
        },
        option: 'LEND',
        type: 'Oxygen Mask',
        username: 'WaqasShargeel',
        version: 1,
        votes: 1
      },
      {
        id: 'XYZ',
        description: 'Example description',
        isValid: true,
        lastUpdateDateTime: Date.now(),
        lastUpdatedBy: "WaqasShargeel",
        location: {
          lat: 0,
          lon: 0
        },
        option: 'FREE',
        type: 'Oxygen Mask',
        username: 'WaqasShargeel',
        version: 1,
        votes: 1
      },
      {
        id: 'XYZ',
        description: 'Example description',
        isValid: true,
        lastUpdateDateTime: Date.now(),
        lastUpdatedBy: "WaqasShargeel",
        location: {
          lat: 0,
          lon: 0
        },
        option: 'SELL',
        type: 'Oxygen Mask',
        username: 'WaqasShargeel',
        version: 1,
        votes: 1
      }
    ])
  }

  getItem() {
    return this.items.pipe();
  }

  createItem(item: IItem) {
    this.items.next([...this.items.value, item])
  }
}
