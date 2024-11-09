import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Recipe } from '../core/model/recipe.model';
import { RecipesService } from '../core/services/recipes.service';
@Component({
  selector: 'app-recipesfilter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recipesfilter.component.html',
  styleUrl: './recipesfilter.component.css',
})
export class RecipesfilterComponent {
  private formBuilder = inject(FormBuilder);

  filterForm = this.formBuilder.group<Recipe>({
    title: '',
    category: '',
    ingredients: [''],
    tags: '',
    prepTime: undefined,
    cookingTime: undefined,
  });

  constructor(private service: RecipesService) {}

  filterResults() {
    this.service.updateFilter(<Recipe>this.filterForm.value);
  }
  clearFilters() {
    this.filterForm.reset();
  }
}
