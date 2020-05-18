import {EventEmitter, Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'}
)
export class UserServi {
    // old approach:
    // activatedEmitter = new EventEmitter<boolean>();
    activatedEmitterSubject = new Subject<boolean>();
}
