import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsListComponent } from './components/items-list/items-list.component';
import {RouterModule} from "@angular/router";

export const routes = [
  {
    path: '',
    component: ItemsListComponent,
    children: [],
  },
];


@NgModule({
  declarations: [ItemsListComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class ItemsModule { }
