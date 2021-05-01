export interface IItem {
  "id": string,
  "isValid": boolean,
  "version": number,
  "lastUpdatedBy": string,
  "lastUpdateDateTime": number
  "username": string
  "description": string
  "type": string
  "option": string
  "location": {
    "lat": number
    "lon": number
  },
  "votes": number
}
