import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AlertComponent} from './alert/alert.component';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {PlaceholderDirective} from './placeholder/placeholder.directive';
import {DropdownDirective} from './dropdown-directive';


@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective
    ],
    imports: [
        CommonModule
    ],
    // we won't use these features in Shared module, but will use them in other modules
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule
    ],
    entryComponents: [ // dynamic components, that will be created without html selector, or rout config (but from code)
        AlertComponent // for Angular >9, you may not indicate it
    ]
})
export class SharedModule {
}
