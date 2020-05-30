import {Ingredient} from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}

export interface AppState {
    shoppingList: State // as in app.module
}


// state must be IMMUTABLE!!!
const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
        new Ingredient('Bananas', 7),
    ],
    editedIngredient: null,
    editedIngredientIndex: -1 // not type, but value. Thus: -1, because array doesn't have minus indexes
}

export function shoppingListReducer(state: State = initialState, action: any) { // state = initialState: default value
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT: // uppercase - convention
            return {
                ...state, // copy of Obj
                ingredients: [...state.ingredients, action.payload]// overriding 'ingredients' property and adding a new value there
            }
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                // ...ingredient,
                ...action.payload // will override upper cloned ingredient property, thus we comment it
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredientIndex: -1,
                editedIngredient: null
            }
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ingredient, index) => { // filter returns a new Array. Thus we have immutabilty
                    return index !== state.editedIngredientIndex;
                }),
                editedIngredientIndex: -1,
                editedIngredient: null
            }
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload, // action.payload - index of the ingredient
                editedIngredient: {...state.ingredients[action.payload]}
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        default:
            return state;
    }
}
