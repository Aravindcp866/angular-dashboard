import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {

  constructor() { }
  subscribeLiveData() {
    debugger
    const url = 'wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self';
    const sockerconnection = new WebSocket(url)
    try {
      sockerconnection.onmessage = (event: any) => {
        if (event) {
          return event
        }
      }
    }
    catch (err) {
      return err
    }

   }
}

