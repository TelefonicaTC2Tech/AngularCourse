import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentAttributionComponent } from './content-attribution.component';

describe('ContentAttributionComponent', () => {
  let component: ContentAttributionComponent;
  let fixture: ComponentFixture<ContentAttributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentAttributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentAttributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
