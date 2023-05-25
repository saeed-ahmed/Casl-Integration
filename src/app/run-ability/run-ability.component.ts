import { Component, Input, OnInit } from '@angular/core';
import { AbilityService } from '../ability.service';

@Component({
  selector: 'app-run-ability',
  templateUrl: './run-ability.component.html',
  styleUrls: ['./run-ability.component.css']
})
export class RunAbilityComponent implements OnInit {

  //@Input('Subject') subject:any;
  @Input('Role') role:any;
  public ability:AbilityService;
  constructor(abilityService:AbilityService){
    this.ability = abilityService;
  }

  ngOnInit(): void {
  }

}
