import { ValidatorFn, AbstractControl } from "@angular/forms";

export class VerifierCaracteresValidator {
    static sansEspaces(): ValidatorFn {
        return (c: AbstractControl): {[key: string]: boolean } | null => {
            if (c.value.trim().length != 0 ) {
                return {'sansEspaces': true};
            }
            return {'sansEspaces': false};
        };
    }

    static longueurMinimum(min: number): ValidatorFn {
        return (c: AbstractControl): {[key: string]: boolean } | null => {
            if (c.value.trim().length >= min ) {
                return {'longueurMinimum': true};
            }
            return {'longueurMinimum': false};
        };
    }
}