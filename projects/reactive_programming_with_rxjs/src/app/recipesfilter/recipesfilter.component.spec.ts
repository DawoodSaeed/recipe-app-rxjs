import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesfilterComponent } from './recipesfilter.component';

describe('RecipesfilterComponent', () => {
  let component: RecipesfilterComponent;
  let fixture: ComponentFixture<RecipesfilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipesfilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipesfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
