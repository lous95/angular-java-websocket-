import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IColor } from "../models/color.model";
import { IUpdateMessage } from "../models/updateMessage.model";
import { HttpClient } from '@angular/common/http';
import Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { endpointUrl } from "src/environments/environment";

interface IColorService {
  addVoteApi(id:number):Observable<any>;
  getColorsApi():Observable<IColor[]>;
}

@Injectable()
export class ColorService implements IColorService {

  public updateEvents: Subject<IUpdateMessage>;
  private stompClient;
  constructor(private http: HttpClient){
    this.updateEvents = new Subject<IUpdateMessage>();

    const ws = new SockJS(endpointUrl + "ws");
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = null;
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/colors', (message:any) => {
        if (message.body) {
          this.updateEvents.next(JSON.parse(message.body));
        }
      });
    });
  }

  addVoteApi(id:number):Observable<any>{
    return this.http.put<any>(endpointUrl+ `vote?id=${id}`,"");
  }

  getColorsApi():Observable<IColor[]>{
    return this.http.get<IColor[]>(endpointUrl+ "list");
  }
}


