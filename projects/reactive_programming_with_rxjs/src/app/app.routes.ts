import { Routes } from '@angular/router';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
export const routes: Routes = [
  {
    path: '',
    title: 'Home - Recipe Book',
    component: RecipesListComponent,
  },
  {
    path: 'new-recipe',
    title: 'Add New Recipe - Recipe Book',
    component: NewRecipeComponent,
  },

  {
    path: 'recipe-details',
    title: 'Recipe Details - Recipe Book',
    component: RecipeDetailsComponent,
  },

  {
    path: '**',
    title: '404 Page - Recipe Book',
    component: PageNotFoundComponent,
  },
];
