import {CalculatorServic, LoggerService} from './calculator.servic';
import {TestBed} from "@angular/core/testing";

// TestBed allows to provide dependencies to our services by using Dependency Injection

describe('CalculatorService', () => {
    let calculatorService: CalculatorServic;
    let loggerSpy: any;

    beforeEach(() => {
        // createSpyObj - we create fake LoggerService, instead of having its real instance. In [] brackets - its f()s
        // if we wanted to return any value: loggerSpy.printLog.and.returnValue('Fake value that is returned after f() is called')
        loggerSpy = jasmine.createSpyObj('LoggerService', ["printLog"])

        // const calculatorService = new CalculatorServic(loggerSpy);

        TestBed.configureTestingModule({
            providers: [
                CalculatorServic,
                // instead of using another LoggerService instance, we replace it with provider:
                // useValue - provides a value, that will be used when we need LoggerService
                {provide: LoggerService, useValue: loggerSpy} // LoggerService - DI token - unique key
            ]
        })

        calculatorService = TestBed.inject(CalculatorServic);
    })

    it('should add 2 numbers', () => {
        const result = calculatorService.add(4, 3);

        expect(result).toBe(7);
        expect(loggerSpy.printLog).toHaveBeenCalledTimes(1); // how much f() was called
    });

    it('should subtract 2 numbers', () => {
        // 1 WAY
        // real LoggerService instance
        // const calculatorService =  new CalculatorServic(new LoggerService());

        // 2 WAY
        // real LoggerService instance
        // const logger = new LoggerService();
        // const calculatorService = new CalculatorServic(logger);

        // the original f() printLog() in the service instance will be replaced by Jasmine its implementation (wrapper)
        // spyOn(logger, 'printLog'); // spy on service f()

        const result = calculatorService.subtract(4, 3);

        expect(result).toBe(1, 'Unexpected subtraction result');
        expect(loggerSpy.printLog).toHaveBeenCalledTimes(1); // how much f() was called
    });
});
