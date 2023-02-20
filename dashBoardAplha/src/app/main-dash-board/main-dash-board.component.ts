import { Component, OnInit ,Input} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { dataValue } from '../interface';
Chart.register(...registerables);
import { SocketServiceService } from '../service/socket-service.service'




@Component({
  selector: 'app-main-dash-board',
  templateUrl: './main-dash-board.component.html',
  styleUrls: ['./main-dash-board.component.css']
})
export class MainDashBoardComponent implements OnInit {

  @Input() valuefromPparent: string = ''
  sockerconnection = {} as WebSocket;
  liveMessage: string[] = [];
  connectionMessage: string = ''
  scatteredValue: dataValue[] = [];
  secondScatreValue: dataValue[] = [];
  chart: Chart<"bubble", dataValue[], unknown> | undefined;
  radarChart: Chart<"line", dataValue[], unknown> | undefined;


 

  constructor(private websocketEstablished: SocketServiceService) { }

  ngOnInit(): void {
    this.connectToSocket();
    this.websocketEstablished.subscribeLiveData
    console.log(this.websocketEstablished.subscribeLiveData, 'livedata')

    let ctx = document.getElementById("myChart") as HTMLCanvasElement;
   this.chart = new Chart(ctx, {
     type: 'bubble',
      data: {
       
        datasets: [{
          label: 'Scatter Dataset',
          data: this.scatteredValue ,
          backgroundColor: 'rgb(227, 138, 169)',
          borderWidth: 3,
          radius: 3,

        }, {
          label: 'scatter second',
          data: this.secondScatreValue,
          backgroundColor: 'rgb(28, 14, 227)',
          borderWidth: 3,
          radius: 3,
          
        }]
      },
     options: {

        scales: {
          y: {
            position: 'bottom'
          }
        },
     
      }
   });  
   
    let ctxy = document.getElementById("secondChart") as HTMLCanvasElement;
    this.radarChart = new Chart(ctxy, {
      type: 'line',
      data: {
        datasets: [{
          label: 'My First Dataset',
          data: this.scatteredValue,
          fill: true,
          // backgroundColor: 'red',
          borderColor: 'blue',
          // pointBackgroundColor: 'wheat',
          pointBorderColor: 'red',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        },
          {
          label: 'My First Dataset',
          data: this.secondScatreValue,
          fill: true,
          // backgroundColor: 'yellow',
          borderColor: 'green',
          // pointBackgroundColor: 'grey',
          pointBorderColor: 'red',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(121, 99, 132)',
          tension: 0.1
          }
        ]
      },
      options: {
        scales: {
          yAxis: {
            // scaleLabel: {
            type:'linear',
            display: true,
            position: 'center'
              // labelString: 'Count'
            // }
            
          },
          xAxis: {
            type: 'linear',
            display: true,
          }
        }
      },
    });
    
  }
  ngDocheck() {
    this.websocketEstablished.subscribeLiveData
    console.log(this.websocketEstablished.subscribeLiveData,'livedata')
  }


  connectToSocket() {
    let url = 'wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self';
    this.sockerconnection = new WebSocket(url)
    this.sockerconnection.onmessage = (event: any) => {
      this.liveMessage.push(event.data + new Date().toLocaleTimeString())
      // console.log(event)
      this.scatteredValue.push({ x: Math.ceil(event.timeStamp), y: Math.floor((Math.random() * event.timeStamp)) })
      this.secondScatreValue.push({ x: Math.floor((Math.random() * event.timeStamp) / 2), y: Math.ceil(event.timeStamp) / 2 })
      // console.log(this.scatteredValue, this.secondScatreValue)
      this.chart?.update();
      this.radarChart?.update();
      this.connectionMessage ="'succesffully connected to websocket'" +  new Date().toLocaleTimeString()
      // this.sockerconnection.close();
    }
  }

  // createOrder() {
    
  // }



  closeLiveData() { debugger
    this.sockerconnection.close();
    this.liveMessage = [];
    this.connectionMessage = 'disconnected from websocket' + new Date().toLocaleTimeString()
  }
}
