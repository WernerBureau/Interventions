import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/caracteres-validator';
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
      notification:['ChoixNotification'],
      courrielGroup: this.fb.group({
        zoneCourriel: [{value: '', disabled: true}],
        zoneVerifCourriel: [{value: '', disabled: true}]
      })
    });   
    
    this.probleme.obtenirTypeProbleme()
    .subscribe(type => this.typeProbleme = type,
               error => this.errorMessage = <any>error);
  }

  appliquerNotifications(typeNotification:string): void{
    const zoneCourrielControl = this.problemeForm.get('courrielGroup.zoneCourriel');
    const zoneVerifCourrielControl = this.problemeForm.get('courrielGroup.zoneVerifCourriel');
    const zoneTelephoneControl = this.problemeForm.get('zoneTelephone');
    
    zoneCourrielControl.clearValidators();
    zoneCourrielControl.reset();
    zoneCourrielControl.disable();

    zoneVerifCourrielControl.clearValidators();
    zoneVerifCourrielControl.reset();
    zoneVerifCourrielControl.disable();

    zoneTelephoneControl.clearValidators();
    zoneTelephoneControl.reset();
    zoneTelephoneControl.disable();

    if (typeNotification === 'ParCourriel') {

      zoneCourrielControl.setValidators([Validators.required]);
      zoneCourrielControl.enable();

      zoneVerifCourrielControl.setValidators([Validators.required]);
      zoneVerifCourrielControl.enable();
    }

    if (typeNotification === 'ParTelephone') {

      zoneTelephoneControl.setValidators([Validators.required]);
      zoneTelephoneControl.enable();
    }

    zoneCourrielControl.updateValueAndValidity();
    zoneVerifCourrielControl.updateValueAndValidity();
    zoneTelephoneControl.updateValueAndValidity();
  }
}
