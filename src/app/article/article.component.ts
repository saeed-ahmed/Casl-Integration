import { Component, OnInit } from '@angular/core';
import { AbilityService } from '../ability.service';
import { Article, Role } from '../model/model';
import { PermissionService } from '../permission.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  public ability:AbilityService;
  public permissionService:PermissionService;
  public role: Role = Object.assign({});
  public canPrint:boolean = false;
  public canFavorite:boolean = false;
  public canShare:boolean = false;
  public canSendFeedback:boolean = false;
  constructor(abilityService:AbilityService, permissionService:PermissionService){
    this.ability = abilityService;
    this.permissionService = permissionService;
  }

  ngOnInit(): void {
    this.role = this.permissionService.getRole(1,1); //Admin,Article
    //this.role = this.permissionService.getRole(2,1); //Manager,Article
    //this.role = this.permissionService.getRole(3,1); //Supervisor,Article
    //this.role = this.permissionService.getRole(4,1); //Operator,Article

    const localAbility =  this.ability.runAbility(this.role);
    this.setPermission(localAbility);

  }
  setPermission(localAbility:any){
      const subject = this.ability.getArticle(this.role.currentRole.id);
      this.canPrint = this.ability.can('print',localAbility,subject);
      this.canFavorite = this.ability.can('favorite',localAbility,subject);
      this.canShare = this.ability.can('shareArticle',localAbility,subject);
      this.canSendFeedback = this.ability.can('submitFeedback',localAbility,subject);
  }

}
