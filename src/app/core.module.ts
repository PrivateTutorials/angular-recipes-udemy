import { NgModule } from '@angular/core';
import {RecipeService} from "./recepies/recipe.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";

@NgModule({
  providers: [
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true // allow multiple interceptors
    }
  ]
})
export class CoreModule { }
