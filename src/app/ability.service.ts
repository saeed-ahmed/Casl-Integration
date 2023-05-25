import { Injectable } from '@angular/core';
import { Ability, AbilityBuilder } from '@casl/ability';
import { Article, IAction, IRole, ISubject, Payment, PaymentHistory, Role } from './model/model';

@Injectable({
  providedIn: 'root'
})
export class AbilityService {
  public defineAbility:any;
  constructor() {
    this.buildAbility();
  }
  buildAbility() {
    this.defineAbility = (role: Role) => {
      const { can, cannot, build } = new AbilityBuilder(Ability);
      if (role.currentRole.name === 'admin') {
        can('manage', 'all');
      } else {
        role.currentRole.subjects?.forEach((subject: any) => {
          const subjectCaptilize =
            subject.name.charAt(0).toUpperCase() + subject.name.slice(1);
          subject.actions.forEach((action: any) => {
            if (action.hasPermission) {
              can(action.name, subjectCaptilize, {
                'aSubject.roleId': role.currentRole.id
              });
            }
          });
        });
      }
      return build();
    };
  }
  runAbility(role:Role):any{
    //const roles = this.getRoles();
    let ability = this.defineAbility(role);
    let subject = Object.assign({});
    let subjectId:number = 0;
    if(role.currentRole.subjects){
      subjectId = role.currentRole.subjects[0].id;
      if(subjectId === 1){
        subject = this.getArticle(role.currentRole.id);
      }else if(subjectId === 2){
        subject = this.getPayment(role.currentRole.id);
      }else if(subjectId === 3){
        subject = this.getPaymentHistory(role.currentRole.id);
      }
    }


    this.printPermission(ability, subject, role.currentRole.id, subjectId);
    return ability;
    // ability = this.defineAbility(roles[2]);
    // article = article = this.getArticle(3);
    // this.printPermission(ability, article);

    // ability = this.defineAbility(roles[3]);
    // article = article = this.getArticle(4);
    // this.printPermission(ability, article);
  }
  can(permission:string, ability: any, subject: any): boolean{
    return ability.can(permission,subject);
  }
  printPermission(ability: any, subject: any, roleId:number, subjectId:number) {
    console.log(
      `*********** permissions for ${this.getRoleName(
        roleId
      )} ***********`
    );
    //const subjectName = ability[0].subject;
    if(subjectId === 1){ //Article
      console.log('print', ability.can('print', subject));
      console.log('favorite', ability.can('favorite', subject));
      console.log('shareArticle', ability.can('shareArticle', subject));
      console.log('submitFeedback', ability.can('submitFeedback', subject));
    } else if(subjectId === 2){ //Payment
      console.log('viewPayment', ability.can('viewPayment', subject));
      console.log('submitPayment', ability.can('submitPayment', subject));
      console.log('editPayment', ability.can('editPayment', subject));
      console.log('paymentTransfer', ability.can('paymentTransfer', subject));
    } else if(subjectId === 3){ //PaymentHistory
      console.log('viewPaymentHistory', ability.can('viewPaymentHistory', subject));
      console.log('editPaymentHistory', ability.can('editPaymentHistory', subject));
      console.log('sharePaymentHistory', ability.can('sharePaymentHistory', subject));
    }

  }
  getRoleName(roleId: number): string {
    let name = '';
    if (roleId === 1) {
      name = 'admin';
    } else if (roleId === 2) {
      name = 'manager';
    } else if (roleId === 3) {
      name = 'supervisor';
    } else if (roleId === 4) {
      name = 'operator';
    }
    return name;
  }
  getArticle(roleId: number): Article {
    const article: Article = new Article({
      roleId: roleId,
      favorite: true,
      print: true,
      shareArticle: true,
      submitFeedback: true
    });
    return article;
  }
  getPayment(roleId: number): Payment {
    const payment: Payment = new Payment({
      roleId: roleId,
      viewPayment:true,
      submitPayment:true,
      editPayment:true,
      paymentTransfer:true
    });
    return payment;
  }
  getPaymentHistory(roleId: number): PaymentHistory {
    const paymentHistory: PaymentHistory = new PaymentHistory({
      roleId: roleId,
      viewPaymentHistory:true,
      editPaymentHistory:true,
      sharePaymentHistory:true,
    });
    return paymentHistory;
  }
  // getRoles(): Array<Role> {
  //   const roles: Array<Role> = new Array<Role>();
  //   let role: Role = new Role({
  //     id: 1,
  //     name: 'admin',
  //     subjects: this.getSubjects(1, 1)
  //   });
  //   roles.push(role);
  //   role = new Role({
  //     id: 2,
  //     name: 'manager',
  //     subjects: this.getSubjects(1, 2)
  //   });
  //   roles.push(role);
  //   role = new Role({
  //     id: 3,
  //     name: 'supervisor',
  //     subjects: this.getSubjects(1, 3)
  //   });
  //   roles.push(role);
  //   role = new Role({
  //     id: 4,
  //     name: 'operator',
  //     subjects: this.getSubjects(1, 4)
  //   });
  //   roles.push(role);
  //   return roles;
  // }
  // getSubjects(id: number, roleId: number): Array<ISubject> {
  //   const subjects: Array<ISubject> = Object.assign([]);
  //   const subject: ISubject = Object.assign({});

  //   subject.id = id;
  //   subject.roleId = roleId;

  //   if (id === 1) {
  //     subject.name = 'Article';
  //     subject.actions = this.getActions(subject);
  //     subjects.push(subject);
  //   } else if (id === 2) {
  //     subject.name = 'Payment';
  //     subject.actions = this.getActions(subject);
  //     subjects.push(subject);
  //   } else if (id === 3) {
  //     subject.name = 'PaymentHistory';
  //     subject.actions = this.getActions(subject);
  //     subjects.push(subject);
  //   }
  //   return subjects;
  // }
  // getActions(subject: ISubject): Array<IAction> {
  //   let actions: Array<IAction> = Object.assign([]);
  //   if (subject.name === 'Article') {
  //     if (subject.roleId === 2) {
  //       actions = [
  //         {
  //           name: 'print',
  //           hasPermission: true
  //         },
  //         {
  //           name: 'favorite',
  //           hasPermission: true
  //         },
  //         {
  //           name: 'shareArticle',
  //           hasPermission: true
  //         },
  //         {
  //           name: 'submitFeedback',
  //           hasPermission: true
  //         }
  //       ];
  //     } else if (subject.roleId === 3) {
  //       actions = [
  //         {
  //           name: 'print',
  //           hasPermission: true
  //         },
  //         {
  //           name: 'favorite',
  //           hasPermission: true
  //         },
  //         {
  //           name: 'shareArticle',
  //           hasPermission: false
  //         },
  //         {
  //           name: 'submitFeedback',
  //           hasPermission: true
  //         }
  //       ];
  //     } else if (subject.roleId === 4) {
  //       actions = [
  //         {
  //           name: 'print',
  //           hasPermission: true
  //         },
  //         {
  //           name: 'favorite',
  //           hasPermission: true
  //         },
  //         {
  //           name: 'shareArticle',
  //           hasPermission: false
  //         },
  //         {
  //           name: 'submitFeedback',
  //           hasPermission: false
  //         }
  //       ];
  //     }
  //   }
  //   return actions;
  // }
  getActionsByRole(subject: ISubject): Array<IAction> {
    let actions: Array<IAction> = Object.assign([]);

    if (subject.roleId === 2) {
      actions = [
        {
          name: 'print',
          hasPermission: true
        },
        {
          name: 'favorite',
          hasPermission: true
        },
        {
          name: 'shareArticle',
          hasPermission: true
        },
        {
          name: 'submitFeedback',
          hasPermission: true
        }
      ];
    } else if (subject.roleId === 3) {
      actions = [
        {
          name: 'print',
          hasPermission: true
        },
        {
          name: 'favorite',
          hasPermission: true
        },
        {
          name: 'shareArticle',
          hasPermission: true
        },
        {
          name: 'submitFeedback',
          hasPermission: true
        }
      ];
    } else if (subject.roleId === 4) {
      actions = [
        {
          name: 'print',
          hasPermission: true
        },
        {
          name: 'favorite',
          hasPermission: true
        },
        {
          name: 'shareArticle',
          hasPermission: true
        },
        {
          name: 'submitFeedback',
          hasPermission: true
        }
      ];
    }

    return actions;
  }
}

