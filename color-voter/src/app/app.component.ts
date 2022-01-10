import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ColorService } from './services/colors.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  colors:any[] = [];
  votedColors:number[] = [];
  colorsSubscription!:Subscription;
  voteSubscription!:Subscription;
  updateEvents!:Subscription;
  constructor(private colorSerivce: ColorService, private toastr: ToastrService){
   this.updateEvents = colorSerivce.updateEvents.subscribe(() => {
      this.colorsSubscription = this.colorSerivce.getColorsApi().subscribe(res => {
        this.colors = res;
      });
    });

  }
  ngOnInit(): void {
    this.colorsSubscription = this.colorSerivce.getColorsApi().subscribe(res => {
      this.colors = res;
    });
  }

  addVote(id: number):void{
    if(this.votedColors && this.votedColors.includes(id)){
      this.toastr.error("You already voted for this color!");
      return;
    }
    this.voteSubscription = this.colorSerivce.addVoteApi(id).subscribe(() => {
      this.votedColors.push(id);
      this.colorSerivce.getColorsApi().subscribe(res => {
        this.colors = res;
      });
    });
  }

  ngOnDestroy(){
    this.colorsSubscription.unsubscribe();
    this.voteSubscription.unsubscribe();
    this.updateEvents.unsubscribe();
  }
}
