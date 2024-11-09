import { Routes } from '@angular/router';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

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
    path: '**',
    title: '404 Page - Recipe Book',
    component: PageNotFoundComponent,
  },
];
