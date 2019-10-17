import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxComponent } from './checkbox.component';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: `app-host-component`,
  template: `
    <checkbox-question #tested [label]="label" [formControl]="checkBox"></checkbox-question>
  `
})
class TestHostComponent {
  @ViewChild('tested', {static: false})
  testedComponent: CheckboxComponent;
  checkBox: FormControl;
  label = 'Accept';
  constructor() {
    this.checkBox = new FormControl();
  }
}

describe('CheckboxQuestionComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [CheckboxComponent, TestHostComponent]
    }).compileComponents();
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostFixture.autoDetectChanges();
    testHostComponent = testHostFixture.componentInstance;
  }));

  it('should exist', () => {
    expect(testHostComponent.testedComponent).toBeDefined();
  });

  it('should show a label', () => {
    const label = testHostComponent.label;
    const hostElement: HTMLElement = testHostFixture.debugElement.nativeElement;
    expect(hostElement.querySelector('#checkbox').textContent.indexOf(label) !== -1).toBeTruthy();
  });
  it('should be able to change value', () => {
    const hostElement: HTMLElement = testHostFixture.debugElement.nativeElement;
    const label = hostElement.querySelector('#checkbox') as HTMLElement;
    label.click();
    expect(testHostComponent.checkBox.value).toBeTruthy();

    label.click();
    expect(testHostComponent.checkBox.value).toBeFalsy();
    label.click();
    expect(testHostComponent.checkBox.value).toBeTruthy();

    label.click();
    label.click();
    expect(testHostComponent.checkBox.value).toBeTruthy();

    label.click();
    label.click();
    label.click();
    expect(testHostComponent.checkBox.value).toBeFalsy();
    label.click();
    expect(testHostComponent.checkBox.value).toBeTruthy();
  });

  it('should be two-way databinded', () => {
    testHostComponent.checkBox.patchValue(true);

    expect(testHostComponent.checkBox.value === testHostComponent.testedComponent.value).toBeTruthy();
  });
});
