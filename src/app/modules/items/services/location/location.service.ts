import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private location: ILocation;

  constructor(private readonly httpClient: HttpClient) {
  }

  updateLocation(location: ILocation): void {
    this.location = location;
  }

  getLocationDetails(): Observable<any> {
    return this.httpClient.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${this.location.latitude}&longitude=${this.location.longitude}&localityLanguage=en`);
  }
}

export interface ILocation {
  longitude: number;
  latitude: number;
}
