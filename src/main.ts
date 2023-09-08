import 'zone.js/dist/zone';
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { NotifyOptions } from './notify-options/notify-options';
interface OPTIONMODEL {
  id: string;
  label: string;
  value: string;
  checked: boolean;
  show: boolean;
}
const OPTIONS: any[] = [
  {
    id: 'none',
    label: 'None',
    checked: null,
    value: '0',
    show: true,
  },
  {
    id: 'sms',
    label: 'SMS',
    checked: null,
    value: '1',
    show: true,
  },
  {
    id: 'email',
    label: 'Email',
    checked: null,
    value: '2',
    show: true,
  },
  {
    id: 'both',
    label: 'Email and SMS',
    checked: null,
    value: '3',
    show: false,
  },
];
@Component({
  standalone: true,
  selector: 'my-app',
  imports: [CommonModule, NotifyOptions],
  template: `
  <br/>
  <notify-options 
    [updatedFromPerant]=''
    (onCheckBoxUpdate)='updateNotifyBenficiary($event)'>
  </notify-options>
  <br/>
  <div *ngIf="selectedNotify?.id === 'sms' || selectedNotify?.id === 'both'">
    <label>SMS</label>
    <input type="text">
  </div>
  <div *ngIf="selectedNotify?.id === 'email' || selectedNotify?.id === 'both'">
    <label>Email</label>
    <input type="text">
  </div>
  `,
})
export class PerantComponent {
  selectedNotify;
  updateNotifyBenficiary(evnt) {
    this.selectedNotify = evnt;
    console.log(evnt);
  }
  random(evnt) {
    // const random = (Math.random() * 3) | 0;
    console.log('random', evnt.target.value);
  }
}

bootstrapApplication(PerantComponent);
