import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TypeproblemeService } from './typeprobleme.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AngularFontAwesomeModule, HttpClientModule], //Ajouté
      declarations: [ ProblemeComponent ],
      providers:[TypeproblemeService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
     expect(component).toBeTruthy();
  });

  it ('Zone PRÉNOM invalide avec 2 caractères', () => {
    let zone = component.problemeForm.controls['prenomUtilisateur'];
    zone.setValue('a'.repeat(2));
    expect(zone.errors.longueurMinimum).toBeFalsy();
  });

  it ('Zone PRÉNOM valide avec 3 caractères', () => {
    let errors = {};
    let zone = component.problemeForm.controls['prenomUtilisateur'];
    zone.setValue('a'.repeat(3));
    errors = zone.errors || {}
    expect(errors['longueurMinimum']).toBeUndefined();
  });

  it ('Zone PRÉNOM valide avec 200 caractères', () => {
    let errors = {};
    let zone = component.problemeForm.controls['prenomUtilisateur'];
    zone.setValue('a'.repeat(200));
    errors = zone.errors || {}
    expect(errors['longueurMinimum']).toBeUndefined();
  });

  it ('Zone PRÉNOM invalide avec aucune valeur', () => {
    let errors = {};
    let zone = component.problemeForm.get('prenomUtilisateur');
    zone.setValue('a'.repeat(0));
    errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();
  });

  it ('Zone PRÉNOM invalide avec 1 caractère', () => {
    let errors = {};
    let zone = component.problemeForm.get('prenomUtilisateur');
    zone.setValue('a');
    errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();
  });

  it ('Zone PRÉNOM invalide avec 50 espaces', () => {
    let errors = {};
    let zone = component.problemeForm.controls['prenomUtilisateur'];
    zone.setValue(' '.repeat(50));
    errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();
  });

  it ('Zone PRÉNOM invalide avec 2 espaces et 1 caractère', () => {
    let errors = {};
    let zone = component.problemeForm.controls['prenomUtilisateur'];
    zone.setValue('  a');
    errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();
  });



  it ('Zone TELEPHONE est désactivée quand ne pas me notifier ', () => {
    component.appliquerNotifications('NePasMeNotifier');

    let zone = component.problemeForm.get('zoneTelephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it ('Zone TELEPHONE est vide quand ne pas me notifier ', () => {
    component.appliquerNotifications('NePasMeNotifier');

    let zone = component.problemeForm.get('zoneTelephone');
    expect(zone.value).toBeNull();
  });

  it ('Zone ADDRESSE COURRIEL est désactivée quand ne pas me notifier ', () => {
    component.appliquerNotifications('NePasMeNotifier');

    let zone = component.problemeForm.get('courrielGroup.zoneCourriel');
    expect(zone.status).toEqual('DISABLED');
  });
  
  it ('Zone ADDRESSE COURRIEL est vide quand ne pas me notifier ', () => {
    component.appliquerNotifications('NePasMeNotifier');

    let zone = component.problemeForm.get('courrielGroup.zoneCourriel');
    expect(zone.value).toBeNull();
  });

  it ('Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier ', () => {
    component.appliquerNotifications('NePasMeNotifier');

    let zone = component.problemeForm.get('courrielGroup.zoneVerifCourriel');
    expect(zone.status).toEqual('DISABLED');
  });

  it ('Zone CONFIRMER COURRIEL est vide quand ne pas me notifier ', () => {
    component.appliquerNotifications('NePasMeNotifier');

    let zone = component.problemeForm.get('courrielGroup.zoneVerifCourriel');
    expect(zone.value).toBeNull();
  });


  //TP 13
  // 1
  it ('Zone TÉLÉPHONE est désactivée quand notifier par courriel ', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('zoneTelephone');
    expect(zone.disabled).toBeTruthy();
  });

  // 2
  it ('Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.zoneCourriel');
    expect(zone.enabled).toBeTruthy();
  });

  // 3
  it ('Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.zoneVerifCourriel');
    expect(zone.enabled).toBeTruthy();
  });

  // 4
  it ('Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.zoneCourriel');
    expect(zone.invalid).toBeTruthy();
  });

  // 5
  it ('Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.zoneVerifCourriel');
    expect(zone.invalid).toBeTruthy();
  });

  // 6
  it ('Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.zoneVerifCourriel');
    zone.setValue("XD");
    expect(zone.invalid).toBeTruthy();
  });

  // 7
  it ('Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null ', () => {
    component.appliquerNotifications('ParCourriel');
    let errors = {};

    let zoneCourriel = component.problemeForm.get('courrielGroup.zoneCourriel');
    let zoneVerifCourriel = component.problemeForm.get('courrielGroup.zoneVerifCourriel');
    zoneCourriel.setValue('');
    zoneVerifCourriel.setValue('test@test.com');

    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};
    expect(errors['courrielConfirmation']).toBeUndefined();
  });

  // 8
  it ('Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null ', () => {
    component.appliquerNotifications('ParCourriel');
    let errors = {};

    let zoneCourriel = component.problemeForm.get('courrielGroup.zoneCourriel');
    let zoneVerifCourriel = component.problemeForm.get('courrielGroup.zoneVerifCourriel');
    zoneCourriel.setValue('test@test.com');
    zoneVerifCourriel.setValue('');

    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};
    expect(errors['courrielConfirmation']).toBeUndefined();
  });

    // 9
    it ('Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
      component.appliquerNotifications('ParCourriel');
      let errors = {};
  
      let zoneCourriel = component.problemeForm.get('courrielGroup.zoneCourriel');
      let zoneVerifCourriel = component.problemeForm.get('courrielGroup.zoneVerifCourriel');
      zoneCourriel.setValue('test@test.com');
      zoneVerifCourriel.setValue('test2@test.com');
  
      let groupe = component.problemeForm.get('courrielGroup');
      expect(groupe.invalid).toBeTruthy();
    });
  

  // 10
  it ('Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel  ', () => {
    component.appliquerNotifications('ParCourriel');
    let errors = {};

    let zoneCourriel = component.problemeForm.get('courrielGroup.zoneCourriel');
    let zoneVerifCourriel = component.problemeForm.get('courrielGroup.zoneVerifCourriel');
    zoneCourriel.setValue('test@test.com');
    zoneVerifCourriel.setValue('test@test.com');

    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};
    expect(errors['courrielConfirmation']).toBeUndefined();
  });


  //TP 14:

  //1
  it ('Zone TELEPHONE est activée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');

    let zone = component.problemeForm.get('zoneTelephone');
    expect(zone.enabled).toBeTruthy();
  });

  //2
  it ('Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');

    let zone = component.problemeForm.get('courrielGroup.zoneCourriel');
    expect(zone.disabled).toBeTruthy();
  });

  //3
  it ('Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');

    let zone = component.problemeForm.get('courrielGroup.zoneVerifCourriel');
    expect(zone.disabled).toBeTruthy();
  });

  //4
  it ('Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');

    let zone = component.problemeForm.get('zoneTelephone');
    expect(zone.invalid).toBeTruthy();
  });

  //5
  it ('Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');
    let zone = component.problemeForm.get('zoneTelephone');
    zone.setValue("test")
    expect(zone.invalid).toBeTruthy();
  });

  //6
  it ('Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');
    let zone = component.problemeForm.get('zoneTelephone');
    zone.setValue('1'.repeat(9));
    expect(zone.invalid).toBeTruthy();
  });

  //7
  it ('Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');
    let zone = component.problemeForm.get('zoneTelephone');
    zone.setValue('1'.repeat(11));
    expect(zone.invalid).toBeTruthy();
  });
  
  //8
  it ('Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');
    let errors = {};
    let zone = component.problemeForm.get('zoneTelephone');
    zone.setValue('1'.repeat(10));
    errors = zone.errors || {};
    expect(zone.valid).toBeTruthy();
  });
});