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
    let zone = component.problemeForm.controls['prenomUtilisateur'];
    zone.setValue('a'.repeat(3));
    expect(zone.errors.longueurMinimum).toBeTruthy();
  });

  it ('Zone PRÉNOM valide avec 200 caractères', () => {
    let zone = component.problemeForm.controls['prenomUtilisateur'];
    zone.setValue('a'.repeat(200));
    expect(zone.errors.longueurMinimum).toBeTruthy();
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
    errors = zone.errors.longueurMinimum || {};
    expect(errors['longueurMinimum']).toBeFalsy();
  });

  it ('Zone PRÉNOM invalide avec 50 espaces', () => {
    let zone = component.problemeForm.controls['prenomUtilisateur'];
    zone.setValue(' '.repeat(50));
    expect(zone.errors.sansEspace).toBeFalsy();
  });

  it ('Zone PRÉNOM invalide avec 2 espaces et 1 caractère', () => {
    let zone = component.problemeForm.controls['prenomUtilisateur'];
    zone.setValue('  a');
    expect(zone.errors.longueurMinimum).toBeFalsy();
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
});
