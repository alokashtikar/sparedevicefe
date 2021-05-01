import {Component, OnInit} from '@angular/core';
import {IItem} from "../../models/IItem";

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {

  items: IItem[] = [
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
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
