import { Component, OnInit } from '@angular/core';
import { AbilityService } from '../ability.service';
import { Role } from '../model/model';
import { PermissionService } from '../permission.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  public ability:AbilityService;
  public permissionService:PermissionService;
  public role: Role = Object.assign({});
  public canViewPayment:boolean = false;
  public canSubmitPayment:boolean = false;
  public canEditPayment:boolean = false;
  public canPaymentTransfer:boolean = false;
  constructor(abilityService:AbilityService, permissionService:PermissionService){
    this.ability = abilityService;
    this.permissionService = permissionService;
  }

  ngOnInit(): void {
    this.role = this.permissionService.getRole(1,2); //Admin,Payment
    // this.role = this.permissionService.getRole(2,2); //Manager,Payment
    //this.role = this.permissionService.getRole(3,2); //Supervisor,Payment
    //this.role = this.permissionService.getRole(4,2); //Operator,Payment
    const localAbility =  this.ability.runAbility(this.role);
    this.setPermission(localAbility);
  }
  setPermission(localAbility:any){
    const subject = this.ability.getPayment(this.role.currentRole.id);
    this.canViewPayment = this.ability.can('viewPayment',localAbility,subject);
    this.canSubmitPayment = this.ability.can('submitPayment',localAbility,subject);
    this.canEditPayment = this.ability.can('editPayment',localAbility,subject);
    this.canPaymentTransfer = this.ability.can('paymentTransfer',localAbility,subject);
  }
}
