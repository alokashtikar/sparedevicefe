import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {

  newItemForm: FormGroup;
  types: any = [
    {value: 'OXYGEN', viewValue: 'Oxygen'},
    {value: 'MASK', viewValue: 'Mask'},
  ];

  options: any = [
    {value: 'LEND', viewValue: 'Lend'},
    {value: 'SELL', viewValue: 'Sell'},
    {value: 'FREE', viewValue: 'Free'}
  ];

  constructor(private readonly formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.newItemForm = this.formBuilder.group({
      description: '',
      type: '',
      option: ''
    });
  }
}
