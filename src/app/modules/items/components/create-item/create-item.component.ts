import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemTypes } from '../../models/IItem';
import { LocationService } from '../../services/location/location.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: [ './create-item.component.scss' ]
})
export class CreateItemComponent implements OnInit {

  newItemForm: FormGroup;
  types = ItemTypes;

  options: any = [
    { value: 'LEND', viewValue: 'Lend' },
    { value: 'RENT', viewValue: 'Rent' },
    { value: 'SELL', viewValue: 'Sell' },
    { value: 'FREE', viewValue: 'Free' }
  ];

  constructor(private readonly formBuilder: FormBuilder, private readonly locationService: LocationService) {
  }

  ngOnInit(): void {
    this.locationService.getLocationDetails()
      .subscribe((res) => {
        console.log('ere: ', `${ res.locality }, ${ res.countryName }`);

        this.newItemForm = this.formBuilder.group({
          description: new FormControl('Contact number/email:\n\nOther details:\n', [ Validators.required ]),
          type: new FormControl('', [ Validators.required ]),
          name: new FormControl('', [ Validators.required ]),
          city: new FormControl(`${ res.locality }, ${ res.countryName }`, [ Validators.required ]),
          option: new FormControl('', [ Validators.required ])
        });
      });
  }
}
