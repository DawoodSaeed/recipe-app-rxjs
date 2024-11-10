import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../core/services/shared-data.service';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css',
})
export class RecipeDetailsComponent {
  constructor(private sharedData: SharedDataService) {}

  recipe$ = this.sharedData.selectedRecipe$;
}
