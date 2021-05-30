import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ItemTypes} from '../../models/IItem';
import {LocationService} from '../../services/location/location.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {

  maxLength = 300;
  newItemForm: FormGroup;
  types = ItemTypes;

  // options: any = [
  //   {value: 'LEND', viewValue: 'Lend'},
  //   {value: 'RENT', viewValue: 'Rent'},
  //   {value: 'SELL', viewValue: 'Sell'},
  //   {value: 'FREE', viewValue: 'Free'}
  // ];

  constructor(private readonly formBuilder: FormBuilder, private readonly locationService: LocationService) {
  }

  ngOnInit(): void {
    this.locationService.getLocationDetails()
      .subscribe((res) => {
        this.newItemForm = this.formBuilder.group({
          description: new FormControl(
            'Contact number/email:\n\n\nDetails about the product or service:\n',
            [Validators.required, Validators.maxLength(300)]),
          type: new FormControl('', [Validators.required]),
          name: new FormControl('', [Validators.required]),
          city: new FormControl(`${res.locality}, ${res.countryName}`, [Validators.required]),
          // option: new FormControl('', [Validators.required])
        });
      });
  }
}
