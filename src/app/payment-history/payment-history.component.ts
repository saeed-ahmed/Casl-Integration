import { Component, OnInit } from '@angular/core';
import { AbilityService } from '../ability.service';
import { Role } from '../model/model';
import { PermissionService } from '../permission.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {

  public ability:AbilityService;
  public permissionService:PermissionService;
  public role: Role = Object.assign({});
  public canViewPayment:boolean = false;
  public canSharePayment:boolean = false;
  public canEditPayment:boolean = false;
  constructor(abilityService:AbilityService, permissionService:PermissionService){
    this.ability = abilityService;
    this.permissionService = permissionService;
  }

  ngOnInit(): void {
    this.role = this.permissionService.getRole(1,3); //Admin,PaymentHistory
    //this.role = this.permissionService.getRole(2,3); //Manager,PaymentHistory
    //this.role = this.permissionService.getRole(3,3); //Supervisor,PaymentHistory
    //this.role = this.permissionService.getRole(4,3); //Operator,PaymentHistory
    const localAbility =  this.ability.runAbility(this.role);
    this.setPermission(localAbility);
  }
  setPermission(localAbility:any){
    const subject = this.ability.getPaymentHistory(this.role.currentRole.id);
    this.canViewPayment = this.ability.can('viewPaymentHistory',localAbility,subject);
    this.canSharePayment = this.ability.can('editPaymentHistory',localAbility,subject);
    this.canEditPayment = this.ability.can('sharePaymentHistory',localAbility,subject);
  }

}
