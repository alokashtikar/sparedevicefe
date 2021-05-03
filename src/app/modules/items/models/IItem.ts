export interface IItem {
  id: string;
  name: string,
  city: string,
  isValid: boolean;
  version: number;
  lastUpdatedBy: string;
  lastUpdatedDateTime: number;
  username: string;
  description: string;
  type: string;
  option: string;
  latitude: number;
  longitude: number;
  votes: number;
}

export const ItemTypes: any[] = [
  {value: 'OXYGEN', viewValue: 'Oxygen'},
  {value: 'PPE', viewValue: 'PPE'},
  {value: 'MEDICINES', viewValue: 'Medicines'},
  {value: 'DEVICES', viewValue: 'Oximeter & Other Devices'}
];
