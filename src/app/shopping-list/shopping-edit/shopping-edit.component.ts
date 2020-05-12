import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
    @ViewChild('name') nameElement: ElementRef;
    @ViewChild('amount') amountElement: ElementRef;

    @Output() ingredientAdded = new EventEmitter<Ingredient>();

    constructor() {
    }

    ngOnInit(): void {
    }

    saveIngredient() {
        const ingredient = new Ingredient(this.nameElement.nativeElement.value, this.amountElement.nativeElement.value)
        this.ingredientAdded.emit(ingredient)
    }
}
