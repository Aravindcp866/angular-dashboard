import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SampleServiceService {
  liveMessage: any;
  scatteredValue: any;
  secondScatreValue: any;
  chart: any;
  radarChart: any;
  connectionMessage: string | undefined;

  connectToSocket() {
    debugger
    let url = 'wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self';
    const sockerconnection = new WebSocket(url)

    try {
      sockerconnection.onmessage = (event: any) => {
        if (event) {
          event.successmessage = "succesfullyConnected to webscoket....."
          return event
        }
      }
    }
    catch (err: any) {
      return err
    };

  }

  constructor() { }

}
