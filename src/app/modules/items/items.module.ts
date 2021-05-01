import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemsListComponent} from './components/items-list/items-list.component';
import {RouterModule} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";


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
    MatListModule,
    MatIconModule,
    CommonModule
  ]
})
export class ItemsModule {
}
