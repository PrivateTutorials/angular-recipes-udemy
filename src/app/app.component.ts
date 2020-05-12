import {Component} from '@angular/core';
import {Recipe} from "./recepies/recipe.model";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    loadedFeature = 'recipes';

    onNavigate(link: string) {
        this.loadedFeature = link;
    }
}
