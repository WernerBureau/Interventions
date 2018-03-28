import { VerifierCaracteresValidator } from "./caracteres-validator";
import { AbstractControl } from "@angular/forms";

describe('sansEspaces Validator', () => {
    it('une chaine vide est invalide', () => {
        let control = {value: ""};
        let validator = VerifierCaracteresValidator.sansEspaces();
        let result = validator(control as AbstractControl);
        expect(result['sansEspaces']).toBe(false);
    });    
    
    it('une chaine avec 10 espaces est invalide', () => {
        let control = {value: ' '.repeat(10)};
        let validator = VerifierCaracteresValidator.sansEspaces();
        let result = validator(control as AbstractControl);
        expect(result['sansEspaces']).toBe(false);
    });

    it('une phrase avec des mots est valide', () => {
        let control = {value: "phrase avec des mots"};
        let validator = VerifierCaracteresValidator.sansEspaces();
        let result = validator(control as AbstractControl);
        expect(result['sansEspaces']).toBe(true);
    });

    it('une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () => {
        let control = {value: "   des mots   "};
        let validator = VerifierCaracteresValidator.sansEspaces();
        let result = validator(control as AbstractControl);
        expect(result['sansEspaces']).toBe(true);
    });
});

describe('longueurMinimum Validator', () => {
    it('une expression avec 1 espaces et 2 caractères est invalide.', () => {
        let control = {value: " xx"};
        let validator = VerifierCaracteresValidator.longueurMinimum(3);
        let result = validator(control as AbstractControl);
        expect(result['longueurMinimum']).toBe(false);
    });

    it('une expression avec 2 espaces et 1 caractères est invalide.', () => {
        let control = {value: "  x"};
        let validator = VerifierCaracteresValidator.longueurMinimum(3);
        let result = validator(control as AbstractControl);
        expect(result['longueurMinimum']).toBe(false);
    });

    it('une expression avec 3 espaces et 3 caractères est valide.', () => {
        let control = {value: "   J'aime angular"};
        let validator = VerifierCaracteresValidator.longueurMinimum(3);
        let result = validator(control as AbstractControl);
        expect(result['longueurMinimum']).toBe(true);
    });   

    it('une expression avec 5 espaces, 5 caractères et 5 espces est valide.', () => {
        let control = {value: "     J'aime angular     "};
        let validator = VerifierCaracteresValidator.longueurMinimum(3);
        let result = validator(control as AbstractControl);
        expect(result['longueurMinimum']).toBe(true);
    });   

});