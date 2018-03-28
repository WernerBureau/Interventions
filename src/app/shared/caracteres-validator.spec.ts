import { VerifierCaracteresValidator } from "./caracteres-validator";

describe('Caracteres Validator', () => {
    it('plage pour la valeur valide limite 1', () => {
        let validator = VerifierCaracteresValidator.plage();
        let result = validator(null);
        expect(result['plage']).toBe(true);
    });
});