import 'zone.js/dist/zone';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  selector: 'notify-options',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngFor="let option of checkBoxArray; let i = index" class="form-check form-check-inlin col-md-2" 
      [hidden]="!option.show">
      <label class="form-check-label" [for]="option.id">
      <input  [id]="option.id" type="checkbox" 
              class="form-check-input" 
              [value]="selected"
              [checked]="option.checked"         
              (change)="setCheckedValue(option, i)">
          {{option.label}}
      </label>
    </div>
  `,
})
export class NotifyOptions {
  @Output() onCheckBoxUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Input() updatedFromPerant: any;

  checkBoxArray = OPTIONS;
  selected: OPTIONMODEL;

  ngOnInit() {
    // this.setSelectedOption(0);
    // this.setCheckedOption(0);
  }

  setCheckedValue(option, index) {
    this.selected = option;
    this.checkBoxArray[index].checked = !this.checkBoxArray[index].checked;
    if (option.id === 'none') this.checkNone();
    else {
      this.checkBoxArray[0].checked = false;
      this.checkIfOptionSelected();
      this.checkIfBothEmailSms();
    }
    this.onCheckBoxUpdate.emit(this.selected);
  }

  checkNone() {
    const isSelectedNone = this.selected.id === 'none';
    const isNoneChecked = !this.checkBoxArray[0].checked;

    if (isSelectedNone && isNoneChecked) this.selected = null;

    this.unsetOptions();
  }

  checkIfOptionSelected() {
    const selectedOption = this.checkBoxArray.filter((item) => item.checked);
    selectedOption[0] !== undefined
      ? (this.selected = selectedOption[0])
      : (this.selected = null);
  }

  checkIfBothEmailSms() {
    const emailChecked = this.checkBoxArray[1].checked;
    const smsChecked = this.checkBoxArray[2].checked;
    if (!emailChecked && !smsChecked) this.unsetOptions();
    if (emailChecked && smsChecked) this.setSelectedOption(3);
  }

  unsetOptions() {
    OPTIONS.filter((item) => item.id !== 'none').forEach((eachItem) => {
      eachItem.checked = false;
    });
    return;
  }

  setCheckedOption(i: number) {
    OPTIONS[i].checked = true;
  }
  setSelectedOption(i: number) {
    this.selected = OPTIONS[i];
  }
}
