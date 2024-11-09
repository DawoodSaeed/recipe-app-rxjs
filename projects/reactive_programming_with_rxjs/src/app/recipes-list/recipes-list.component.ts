import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RecipesService } from '../core/services/recipes.service';
import { DataViewModule } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { RecipesfilterComponent } from '../recipesfilter/recipesfilter.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { combineLatest, map } from 'rxjs';
import { Recipe } from '../core/model/recipe.model';
@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [DataViewModule, CommonModule, RecipesfilterComponent],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.
})
export class RecipesListComponent implements OnInit {
  // recipes!: Recipe[];

  // Datastream
  recipes$ = this.service.recipes$;
  // ActionStream
  filterRecipesAction$ = this.service.filterRecipesAction$;

  // Combining both streams.
  filteredRecipes$ = combineLatest([
    this.recipes$,
    this.filterRecipesAction$,
  ]).pipe(
    map(([recipe, filter]: [Recipe[], Recipe]) => {
      const filterTitle = filter?.title?.toLowerCase() ?? '';
      return recipe.filter((recipe) =>
        recipe.title?.toLowerCase().includes(filterTitle)
      );
    })
  );
  constructor(private service: RecipesService) {
    // this.service
    //   .getRecipes()
    //   .pipe(takeUntilDestroyed())
    //   .subscribe((recipes) => {
    //     this.recipes = recipes;
    //   });
  }

  // destory$ = new Subject<void>();
  ngOnInit(): void {}

  // ngOnDestroy(): void {
  //   this.destory$.next();
  //   this.destory$.complete();
  // }
}
