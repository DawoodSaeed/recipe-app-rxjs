import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    // Add HttpClientModule here
  ],
  exports: [
    HttpClientModule, // Export it so it can be used across your project
  ],
  providers: [
    FormBuilder, // Provide FormBuilder here
  ],
})
export class CoreModule {}
