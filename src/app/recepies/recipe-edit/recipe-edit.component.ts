import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
    id: number;
    editMode = false;
    recipeForm: FormGroup;

    constructor(private route: ActivatedRoute,
                private recipeService: RecipeService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.id = +params.id;
            this.editMode = params.id != null;
            this.initForm();
        });
    }

    private initForm() {
        let recipeName = '';
        let recipeImagePath = '';
        let recipeDescription = '';
        const recipeIngredients = new FormArray([]);

        if (this.editMode) {
            const recipe = this.recipeService.getRecipe(this.id);
            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.description;

            if (recipe.ingredients) {
                recipe.ingredients.forEach(ingredient => {
                    recipeIngredients.push(
                        // I have 2 controls, this - FormGroup
                        new FormGroup({
                            name: new FormControl(ingredient.name, Validators.required),
                            amount: new FormControl(ingredient.amount, [
                                Validators.required,
                                Validators.pattern(/^[1-9]+[0-9]*$/)
                            ]),
                        })
                    );
                });
            }
        }

        this.recipeForm = new FormGroup({
            name: new FormControl(recipeName, Validators.required),
            imagePath: new FormControl(recipeImagePath, Validators.required),
            description: new FormControl(recipeDescription, Validators.required),
            ingredients: recipeIngredients
        });
    }

    // a getter!
    get controls() {
        return (this.recipeForm.get('ingredients') as FormArray).controls;
    }

    onSubmit() {
        if (this.editMode) {
            // this.recipeForm.value has the same structure as below:
            /* const recipeToUpdate = new Recipe(
                 this.recipeForm.value.name,
                 this.recipeForm.value.description,
                 this.recipeForm.value.imagePath,
                 this.recipeForm.value.ingredients,
             );*/
            this.recipeService.updateRecipe(this.id, this.recipeForm.value);
        } else {
            this.recipeService.addRecipe(this.recipeForm.value);
        }

        this.onCancel();
    }

    addIngredient() {
        (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
            name: new FormControl(null, Validators.required),
            amount: new FormControl(null, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
            ]),
        }));
    }

    onCancel() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    onDeleteIngredient(index: number) {
        (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
    }

}
