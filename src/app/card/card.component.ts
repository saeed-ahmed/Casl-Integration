import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input('title') title:string = Object.assign({});
  @Input('description') description:string = Object.assign({});
  @Input('buttonText') buttonText:string = Object.assign({});
  @Input('buttonStyles') buttonStyles:string = Object.assign({});

  constructor() { }

  ngOnInit(): void {
    //this.buttonStyles = `p-2 px-5 text-white font-semibold rounded-full shadow-gray-200 bg-${this.buttonStyles}-500 hover:bg-${this.buttonStyles}-700`;
    //this.buttonStyles =

    //console.log('button text!!!', this.buttonStyles);
  }

}
