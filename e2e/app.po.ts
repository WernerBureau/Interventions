import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/probleme');
  }

  getParagraphText() {
    return element(by.css('Inter-root h5')).getText();
  }

  setChampsValidesScenarioNominal() : void {
    element(by.id('prenomUtilisateurId')).sendKeys('Werner');
    element(by.id('nomUtilisateurId')).sendKeys('Burat');    
    // Sélectionner le premier élément dans la zone de liste déroulante
    element(by.id('noTypeProblemeId')).all(by.tagName('option')).get(2).click();      
    // Cliquer sur la première option du bouton radio
    element.all(by.id('notificationId')).get(0).click();      
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }

  setChampsValidesScenarioAlternatifParMessageTexte() : void {
    element(by.id('prenomUtilisateurId')).clear();
    element(by.id('prenomUtilisateurId')).sendKeys('Werner');
    element(by.id('nomUtilisateurId')).clear();
    element(by.id('nomUtilisateurId')).sendKeys('Burat');    
    // Sélectionner le premier élément dans la zone de liste déroulante
    element(by.id('noTypeProblemeId')).all(by.tagName('option')).get(2).click();      
    // Cliquer sur la première option du bouton radio
    element.all(by.id('notificationId')).get(2).click(); 
    element(by.id('telephoneId')).sendKeys('4501234567');
    element(by.id('descriptionProblemeId')).clear();
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...'); 
  }

  setChampsValidesScenarioAlternatifParCourriel() : void {
    element(by.id('prenomUtilisateurId')).clear();
    element(by.id('prenomUtilisateurId')).sendKeys('Werner');
    element(by.id('nomUtilisateurId')).clear();
    element(by.id('nomUtilisateurId')).sendKeys('Burat');    
    // Sélectionner le premier élément dans la zone de liste déroulante
    element(by.id('noTypeProblemeId')).all(by.tagName('option')).get(2).click();      
    // Cliquer sur la première option du bouton radio
    element.all(by.id('notificationId')).get(1).click(); 
    element(by.id('courrielId')).sendKeys('aa@bbb.com');
    element(by.id('confirmerCourrielId')).sendKeys('aa@bbb.com');
    element(by.id('descriptionProblemeId')).clear();
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...'); 
  }

  boutonSubmit() : ElementFinder { 
    return element(by.buttonText('Sauvegarder'));
  }   

  setZoneDescriptionProblemeCaracteresSuffisant() : void {
    element(by.id('descriptionProblemeId')).clear();
    element(by.id('descriptionProblemeId')).sendKeys('XXXXX');
  }

  setZoneDescriptionProblemeCaracteresInsuffisant() : void {
    element(by.id('descriptionProblemeId')).clear();
    element(by.id('descriptionProblemeId')).sendKeys('XXXX');
  }

  obtenirClasseZoneDescriptionProbleme()   { 
    return element(by.id('descriptionProblemeId')).getAttribute("class");
  } 
}


