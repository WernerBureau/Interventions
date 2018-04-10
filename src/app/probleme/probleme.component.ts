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
      nomUtilisateur: ['',[VerifierCaracteresValidator.longueurMinimum(3), VerifierCaracteresValidator.sansEspaces(), Validators.required ]]
    });   
    
    this.probleme.obtenirTypeProbleme()
    .subscribe(type => this.typeProbleme = type,
               error => this.errorMessage = <any>error);    
  }
}
