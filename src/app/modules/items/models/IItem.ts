export class IItem {
  id: string;
  isValid: boolean;
  version: number;
  lastUpdatedBy: string;
  lastUpdatedDateTime: number;
  username: string;
  userId: string;
  description: string;
  type: string;
  option: string;
  latitude: number;
  longitude: number;
  proximity: number;
  votes: number;
  name: string;
  city: string;
}

export const ItemTypes: any[] = [
  {value: 'OXYGEN_CONCENTRATOR', viewValue: 'Oxygen Concentrator'},
  {value: 'PULSE_OXIMETER', viewValue: 'Pulse Oximeter'},
  {value: 'SPIROMETER', viewValue: 'Spirometer'},
  {value: 'DEVICES', viewValue: 'Other Devices'},
  {value: 'FOOD', viewValue: 'Homely Food'},
  {value: 'SERVICES', viewValue: 'Other Services'}
];
