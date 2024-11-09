import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  concatMap,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { Recipe } from '../model/recipe.model';
import { environment } from '../../../environments/environment';
import { Tag } from '../model/tags';
const BASE_PATH = environment.basePath;

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private pageNumber = new BehaviorSubject<number>(1);

  pageNumber$ = this.pageNumber.asObservable();
  updatePageNumber(pageNumber: number) {
    this.pageNumber.next(pageNumber);
  }

  // Reactive pattern for fetching the data

  // recipes$ = this.httpClient
  //   .get<Recipe[]>(`${BASE_PATH}/recipes`, {
  //     params: {
  //       limit: 10,
  //     },
  //   })
  //   .pipe(catchError((_) => of([])));

  recipes$ = this.pageNumber$.pipe(
    concatMap((pageNumber: number) =>
      this.httpClient.get<Recipe[]>(`${BASE_PATH}/recipes`, {
        params: {
          limit: 10,
          page: pageNumber,
        },
      })
    )
  );

  // Subjects are observales and observer as well.
  // They are used for multicasting...
  // BehviourSubjects are sepecial kind of subjects that need an initial value
  // whenever new subscriber subscribes it provide it the lasted emitted
  // value.
  private filterRecipeSubject = new BehaviorSubject<Recipe>({
    id: 0,
    title: '',
    ingredients: [''],
    imageUrl: '',
    yield: 0,
    rating: 0,
  });

  filterRecipesAction$ = this.filterRecipeSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  // classic pattern for fetching the data
  getRecipes(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(`${BASE_PATH}/recipes`);
  }

  updateFilter(filterBy: Recipe) {
    this.filterRecipeSubject.next(filterBy);
  }

  saveRecipe(formValue: Recipe): Observable<Recipe> {
    return this.httpClient.post<Recipe>(`${BASE_PATH}/recipes`, formValue);
  }

  // Getting the tag array logic from the server
  // Using switchMap...

  getTag$: (term: string) => Observable<Tag[]> = (term) => {
    return this.httpClient.get<Tag[]>(`${BASE_PATH}/tags`, {
      params: {
        criteria: term,
      },
    });
  };
}
