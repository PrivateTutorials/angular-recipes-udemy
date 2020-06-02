import {Component} from '@angular/core';
import {animate, group, keyframes, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.componen.html',
    animations: [
        trigger('divState', [
            state('normal', style({
                'background-color': 'red', // or backgroundColor
                transform: 'translateX(0)' // to have it on default position and not to move it to left or right
            })),
            state('highlighted', style({
                'background-color': 'blue',
                transform: 'translateX(100px)' // to move it 100 px right
            })),
            transition('normal <=> highlighted', animate(300)), // ms, <=> in both directions
            // transition('highlighted => normal', animate(1000)) // ms
        ]),
        trigger('wildState', [
            state('normal', style({
                'background-color': 'red', // or backgroundColor
                transform: 'translateX(0) scale(1)' // to have it on default position and not to move it to left or right
            })),
            state('highlighted', style({
                'background-color': 'blue',
                transform: 'translateX(100px) scale(1)' // to move it 100 px right
            })),
            state('shrunken', style({
                'background-color': 'green',
                transform: 'translateX(0) scale(0.5)' // to move it 100 px right
            })),
            transition('normal => highlighted', animate(300)),
            transition('highlighted => normal', animate(800)),
            transition('shrunken <=> *', [ // phases
                style({
                    'background-color': 'orange',
                }),
                animate(1000, style({
                    'border-radius': '50px'
                })),
                animate(500) // animate without style - transition to the end state
            ])
            /*transition('shrunken <=> *', animate(500, style({
                borderRadius: '50px'
            }))),*/
        ]),
        trigger('list1', [
            state('in', style({ // this is the final (or default) state, that the element will be animated to
                opacity: 1,
                transform: 'translateX(0)'
            })),
            transition('void => *', [ // from not existent to any state
                style({  // if style parent of animate(), then this is the initial state, that the element will be animated from
                    opacity: 0,
                    transform: 'translateX(-100px)'
                }),
                animate(300) // will animate to the state above
            ]),
            transition('* => void', [
                animate(300, style({ // if style inside animate() - it will be the final state
                    opacity: 0,
                    transform: 'translateX(100px)' // flight right
                }))
            ]),
        ]),
        trigger('list2', [
            state('in', style({
                opacity: 1,
                transform: 'translateX(0)'
            })),
            transition('void => *', [
                animate(1000, keyframes([ // overal animation - 1 sec. keyframes - its stages
                    style({
                        transform: 'translateX(-100px)',
                        opacity: 0,
                        offset: 0 // timing stage
                    }),
                    style({
                        transform: 'translateX(-50px)',
                        opacity: 0.5,
                        offset: 0.3 // 30% of animation time
                    }),
                    style({
                        transform: 'translateX(-20px)',
                        opacity: 1,
                        offset: 0.8
                    }),
                    style({
                        transform: 'translateX(0)',
                        opacity: 1,
                        offset: 1
                    })
                ]))
            ]),
            transition('* => void', [
                group([
                    animate(300,
                        style({
                            color: 'red'
                        })
                    ),
                    animate(800,
                        style({ // if style inside animate() - it will be the final state
                            opacity: 0,
                            transform: 'translateX(100px)' // flight right
                        })
                    )
                ])
            ]),
        ]),
    ]
})
export class AppComponen {
    list = ['Milk', 'Sugar', 'Bread'];
    state = 'normal';
    wildState = 'normal';

    onAdd(item) {
        this.list.push(item);
    }

    onAnimate() {
        this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
        this.wildState === 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
    }

    onShrink() {
        this.wildState = 'shrunken';
    }

    onDelete(item) {
        const index = this.list.indexOf(item);
        if (index !== -1) {
            this.list.splice(index, 1);
        }
    }

    animationStarted(event) {
        console.log(event);
    }

    animationEnded(event) {
        console.log(event);
    }
}
