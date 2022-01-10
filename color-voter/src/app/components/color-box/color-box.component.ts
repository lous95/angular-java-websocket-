import { Component, OnInit, Input, Output, EventEmitter
 } from '@angular/core';
import { IColor } from 'src/app/models/color.model';

@Component({
  selector: 'app-color-box',
  templateUrl: './color-box.component.html',
  styleUrls: ['./color-box.component.css']
})
export class ColorBoxComponent implements OnInit {

  @Input() color!:IColor;
  @Output() addVote = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  getBoxColor(color:string): object{
    return {'background-color': color}
  }

  getBarWidth(votes:number): object{
    if(votes < 60){
      const width = 200 * (votes/60);
      const barWidth = width + "px";
      return {width: barWidth};
    }
    return {width: '200px'}
  }

  add(color:IColor){
    this.addVote.emit(color.id);
  }

}
