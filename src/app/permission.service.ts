import { Injectable } from '@angular/core';
import { IAction, ISubject, Role } from './model/model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  public roles: Array<Role> = Object.assign({});
  constructor() {
    //subjectId:number, roleId:number
    this.getRoles();
  }
  getRole(roleId:number, subjectId:number):Role{
    const role:Role = this.roles.filter(each => each.currentRole.id === roleId)[0];
    role.currentRole.subjects = this.getSubjects(subjectId,role.currentRole.id);
    return role;
  }
  getRoles(): Array<Role> {
    this.roles = new Array<Role>();
    let role: Role = new Role({
      id: 1,
      name: 'admin'
      //subjects: this.getSubjects(1, 1)
    });
    this.roles.push(role);
    role = new Role({
      id: 2,
      name: 'manager'
      //subjects: this.getSubjects(1, 2)
    });
    this.roles.push(role);
    role = new Role({
      id: 3,
      name: 'supervisor'
      //subjects: this.getSubjects(1, 3)
    });
    this.roles.push(role);
    role = new Role({
      id: 4,
      name: 'operator'
      //subjects: this.getSubjects(1, 4)
    });
    this.roles.push(role);
    return this.roles;
  }
  getSubjects(id: number, roleId: number): Array<ISubject> {
    const subjects: Array<ISubject> = Object.assign([]);
    const subject: ISubject = Object.assign({});

    subject.id = id;
    subject.roleId = roleId;

    if (id === 1) {
      subject.name = 'Article';
      subject.actions = this.getActions(subject);
      subjects.push(subject);
    } else if (id === 2) {
      subject.name = 'Payment';
      subject.actions = this.getActions(subject);
      subjects.push(subject);
    } else if (id === 3) {
      subject.name = 'PaymentHistory';
      subject.actions = this.getActions(subject);
      subjects.push(subject);
    }
    return subjects;
  }
  getActions(subject: ISubject): Array<IAction> {
    let actions: Array<IAction> = Object.assign([]);
    if (subject.name === 'Article') {
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
            hasPermission: false
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
            hasPermission: false
          },
          {
            name: 'submitFeedback',
            hasPermission: false
          }
        ];
      }
    } else if (subject.name === 'Payment') {
      if (subject.roleId === 2) {
        actions = [
          {
            name: 'viewPayment',
            hasPermission: true
          },
          {
            name: 'submitPayment',
            hasPermission: true
          },
          {
            name: 'editPayment',
            hasPermission: true
          },
          {
            name: 'paymentTransfer',
            hasPermission: true
          }
        ];
      } else if (subject.roleId === 3) {
        actions = [
          {
            name: 'viewPayment',
            hasPermission: true
          },
          {
            name: 'submitPayment',
            hasPermission: true
          },
          {
            name: 'editPayment',
            hasPermission: true
          },
          {
            name: 'paymentTransfer',
            hasPermission: false
          }
        ];;
      } else if (subject.roleId === 4) {
        actions = [
          {
            name: 'viewPayment',
            hasPermission: true
          },
          {
            name: 'submitPayment',
            hasPermission: true
          },
          {
            name: 'editPayment',
            hasPermission: false
          },
          {
            name: 'paymentTransfer',
            hasPermission: false
          }
        ];;
      }
    } else if (subject.name === 'PaymentHistory') {
      if (subject.roleId === 2) {
        actions = [
          {
            name: 'viewPaymentHistory',
            hasPermission: true
          },
          {
            name: 'editPaymentHistory',
            hasPermission: true
          },
          {
            name: 'sharePaymentHistory',
            hasPermission: true
          }
        ];
      } else if (subject.roleId === 3) {
        actions = [
          {
            name: 'viewPaymentHistory',
            hasPermission: true
          },
          {
            name: 'editPaymentHistory',
            hasPermission: true
          },
          {
            name: 'sharePaymentHistory',
            hasPermission: false
          }
        ];
      } else if (subject.roleId === 4) {
        actions = [
          {
            name: 'viewPaymentHistory',
            hasPermission: true
          },
          {
            name: 'editPaymentHistory',
            hasPermission: false
          },
          {
            name: 'sharePaymentHistory',
            hasPermission: false
          }
        ];
      }
    }
    return actions;
  }
}
