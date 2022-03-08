import { Component } from '@angular/core';

@Component({
  selector: 'app-expansion',
  templateUrl: './expansion.component.html',
  styleUrls: ['./expansion.component.scss']
})
export class ExpansionComponent {

  inquiries=[
    {
      department:'Hostel',
      text:'Dude I slept on the streets. I don\'t owe nothing.',
      response:'Ahahahahaha',
      accepted:0,
    },
    {
      department:'Chem Lab',
      text:'What\'s the point of beakers.',
      response:'Fair point',
      accepted:2,
    },
    {
      department:'GymKhana',
      text:'Those balls were not made of steel',
      response:'Hmmmm',
      accepted:1,
    }

  ]
  badgeMap:Function = (accepted:number)=>{
    return ["badge badge-danger","badge badge-primary","badge badge-success"][accepted]
  }
  captionMap:Function = (accepted:number)=>{
    return ["Rejected","Processing","Accepted"][accepted]
  }
  panelOpenState = false;
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  
}
