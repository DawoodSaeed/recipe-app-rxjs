import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import * as recipeTags from '../core/model/tags';
import { Recipe } from '../core/model/recipe.model';
import { RecipesService } from '../core/services/recipes.service';
import {
  BehaviorSubject,
  catchError,
  concatMap,
  debounce,
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-new-recipe',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.css',
})
export class NewRecipeComponent {
  // tags = recipeTags.TAGS;
  constructor(private fb: FormBuilder, private service: RecipesService) {}
  dropdown = false;
  recipeForm = this.fb.group({
    id: this.fb.control<number>(Math.floor(1000 + Math.random() * 9000)),
    title: this.fb.control<string | null>(null),
    ingredients: this.fb.array([
      this.fb.control<string | null>(null, Validators.required),
    ]),
    tags: this.fb.control<string | null>(''),
    imageUrl: this.fb.control<string | null>(null),
    cookingTime: this.fb.control<number | null>(null),
    prepTime: this.fb.control<number | null>(null),
    yield: this.fb.control<number>(0),
    steps: this.fb.array([this.fb.control<string | null>(null)]),
    category: this.fb.control<string | null>(null),
    rating: this.fb.control<number | null>(null),
  });

  valueChanges$ = this.recipeForm.valueChanges.pipe(
    // debounceTime(500),
    // distinctUntilChanged(),
    switchMap((formValue) => this.service.saveRecipe(<Recipe>formValue)),
    catchError((errors) => of(errors)),
    tap((result) => this.saveSuccess(result))
  );

  tagInput = this.recipeForm.get('tags') as FormControl;

  tagValues$ = this.tagInput.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((term: string) => this.service.getTag$(term)),
    tap((tags) => {
      console.log('Tags:', tags);

      if (tags.length) {
        this.dropdown = true;
      }
    })
  );
  // Getter for the steps FormArray

  get steps(): FormArray {
    return this.recipeForm.get('steps') as FormArray;
  }

  addStep(): void {
    this.steps.push(this.fb.control<string | null>(null));
  }

  removeStep(index: number): void {
    this.steps.removeAt(index);
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.fb.control('', Validators.required));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      console.log(this.recipeForm.value);
    }
  }

  onCancel() {
    this.recipeForm.reset();
  }

  saveSuccess(_result: Recipe) {
    console.log('Saved successfully');
  }

  setTagFormValue(tag: recipeTags.Tag) {
    this.recipeForm.patchValue({ tags: tag.name?.toLocaleLowerCase() });
    this.dropdown = false;
  }

  // Getting the tag array logic from the server
  // Using switchMap...
}
