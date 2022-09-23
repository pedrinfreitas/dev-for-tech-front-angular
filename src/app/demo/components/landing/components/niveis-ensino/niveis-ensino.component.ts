import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'landing-niveis-ensino',
  templateUrl: './niveis-ensino.component.html',
  styleUrls: ['./niveis-ensino.component.scss']
})
export class NiveisEnsinoComponent implements OnInit {
    nivel: number = 1;

    routeItems!: MenuItem[];

    unidades: any = "520";
    instMund: any = "9.400";
    alunosMundo: any = "200.000";


  constructor() { }

  ngOnInit(): void {

      this.routeItems = [
          { label: 'Personal', routerLink: 'personal' },
      ];


  }

    changeNivel(nivel: number){
      this.nivel = nivel;
    }

}
