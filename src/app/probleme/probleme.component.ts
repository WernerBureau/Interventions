import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/caracteres-validator';
import { emailMatcherValidator } from '../shared/emailMatcher-validator';
import { TypeproblemeService } from './typeprobleme.service';
import { ITypeProbleme } from './typeprobleme';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {

  problemeForm: FormGroup;
  typeProbleme: ITypeProbleme[];
  errorMessage: string;

  constructor(private fb: FormBuilder, private probleme: TypeproblemeService) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenomUtilisateur: ['',[VerifierCaracteresValidator.longueurMinimum(3), VerifierCaracteresValidator.sansEspaces(), Validators.required ]],
      nomUtilisateur: ['',[VerifierCaracteresValidator.longueurMinimum(3), VerifierCaracteresValidator.sansEspaces(), Validators.required ]],
      noTypeProbleme: ['',Validators.required],
      zoneTelephone: [{value: '', disabled: true}],
      notification:['NePasMeNotifier'],
      courrielGroup: this.fb.group({
        zoneCourriel: [{value: '', disabled: true}],
        zoneVerifCourriel: [{value: '', disabled: true}]
      }),
      descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]],
      noUnite: '',
      dateProbleme: {value: Date(), disabled: true}
    });

    this.probleme.obtenirTypeProbleme()
    .subscribe(type => this.typeProbleme = type,
               error => this.errorMessage = <any>error);

    this.problemeForm.get('notification').valueChanges
    .subscribe(value => this.appliquerNotifications(value));
  } // ngOnInit

  appliquerNotifications(notification:string): void{
    const zoneCourrielControl = this.problemeForm.get('courrielGroup.zoneCourriel');
    const zoneVerifCourrielControl = this.problemeForm.get('courrielGroup.zoneVerifCourriel');
    const zoneTelephoneControl = this.problemeForm.get('zoneTelephone');
    const courrielGroupControl = this.problemeForm.get('courrielGroup');
    
    zoneCourrielControl.clearValidators();
    zoneCourrielControl.reset();
    zoneCourrielControl.disable();

    zoneVerifCourrielControl.clearValidators();
    zoneVerifCourrielControl.reset();
    zoneVerifCourrielControl.disable();

    zoneTelephoneControl.clearValidators();
    zoneTelephoneControl.reset();
    zoneTelephoneControl.disable();

    if (notification === 'ParCourriel') {

      zoneCourrielControl.setValidators([Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+")]);
      zoneCourrielControl.enable();

      zoneVerifCourrielControl.setValidators([Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+")]);
      zoneVerifCourrielControl.enable();

      courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielConfirmation()])]);
    }

    if (notification === 'ParTelephone') {

      zoneTelephoneControl.setValidators([Validators.required, Validators.pattern("[0-9]+"), Validators.minLength(10), Validators.maxLength(10)]);
      zoneTelephoneControl.enable();
    }

    zoneCourrielControl.updateValueAndValidity();
    zoneVerifCourrielControl.updateValueAndValidity();
    zoneTelephoneControl.updateValueAndValidity();
    courrielGroupControl.updateValueAndValidity();
  }
}
