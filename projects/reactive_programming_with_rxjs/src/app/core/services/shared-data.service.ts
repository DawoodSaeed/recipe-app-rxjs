import { Injectable } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  constructor() {}

  private selectedRecipeSubject = new BehaviorSubject<Recipe | undefined>(
    undefined
  );

  selectedRecipe$ = this.selectedRecipeSubject.asObservable();

  updateSelectedRecipe(recipe: Recipe) {
    this.selectedRecipeSubject.next(recipe);
  }
}
