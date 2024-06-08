import { FilterService } from './../../services/filter.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OceanData } from '../../interfaces/oceanData';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})

export class FilterComponent {

  oceanData: OceanData[] = [];
  temp: OceanData[] = [];

  constructor(private filterService: FilterService) { }

  listar(): void {
    this.filterService.listar().subscribe((data) => (this.oceanData = data));
    this.temp = this.oceanData;
  }

  mostrarRegioes(): void {
    const filtroRegiao = document.querySelector('#region');
    const regioesUnicas = new Set<string>();

    this.oceanData.forEach(data => {
      if (data.regiao) {
        regioesUnicas.add(data.regiao);
      }
    });

    regioesUnicas.forEach(regiao => {
      const opcao = document.createElement('option');
      opcao.value = regiao;
      opcao.innerHTML = regiao;
      filtroRegiao?.appendChild(opcao);
    });
  }

  mostrarEspecies(): void {
    const filtroEspecie = document.querySelector('#species');
    const especiesUnicas = new Set<string>();

    this.oceanData.forEach(data => {
      data.especies?.forEach(especie => {
        if (especie.nome) {
          especiesUnicas.add(especie.nome);
        }
      });
    });

    especiesUnicas.forEach(especie => {
      const opcao = document.createElement('option');
      opcao.value = especie;
      opcao.innerHTML = especie;
      filtroEspecie?.appendChild(opcao);
    });
  }

  mostrarStatus(): void {
    const filtroEspecie = document.querySelector('#conservationStatus');
    const especiesUnicas = new Set<string>();

    this.oceanData.forEach(data => {
      data.especies?.forEach(especie => {
        if (especie.status) {
          especiesUnicas.add(especie.status);
        }
      });
    });

    especiesUnicas.forEach(especie => {
      const opcao = document.createElement('option');
      opcao.value = especie;
      opcao.innerHTML = especie;
      filtroEspecie?.appendChild(opcao);
    });
  }

  mostrarPoluicao(): void {
    const filtroPoluicao = document.querySelector('#pollutionLevels');
    const tiposPoluicao = new Set<string>();

    this.oceanData.forEach(data => {
      if (data.nivelPoluicao) {
        tiposPoluicao.add(data.nivelPoluicao);
      }
    });

    tiposPoluicao.forEach(poluicao => {
      const opcao = document.createElement('option');
      opcao.value = poluicao;
      opcao.innerHTML = poluicao;
      filtroPoluicao?.appendChild(opcao);
    });
  }

  aplicarFiltro(): void {
    const btnSearch = document.querySelector('#btnSearch');

    btnSearch?.addEventListener('click', e => {
      e.preventDefault();
      const filtroRegiao = document.querySelector('#region') as HTMLSelectElement;
      const filtroEspecie = document.querySelector('#species') as HTMLSelectElement;
      const filtroStatus = document.querySelector('#conservationStatus') as HTMLSelectElement;
      const filtroTemperatura = document.querySelector('#waterTemperature') as HTMLSelectElement;
      const filtroPh = document.querySelector('#ph') as HTMLSelectElement;
      const filtroPoluicao = document.querySelector('#pollutionLevels') as HTMLSelectElement;

      const dadosFiltrados = this.temp.filter(data => {

        if (filtroRegiao.value != 'all' && data.regiao != filtroRegiao.value) {
          return false;
        }

        let validacaoEspecie = true;
        if (filtroEspecie.value != 'all') {
          validacaoEspecie = false;
          data.especies?.forEach(especie => {
            if (filtroEspecie.value == especie.nome) {
              validacaoEspecie = true;
            }
          });
        }

        if (!validacaoEspecie) {
          return false;
        }

        let validacaoStatus = true;
        if (filtroStatus.value != 'all') {
          validacaoStatus = false;
          data.especies?.forEach(especie => {
            if (filtroStatus.value == especie.status) {
              validacaoStatus = true;
            }
          });
        }

        if (!validacaoStatus) {
          return false;
        }

        if (filtroTemperatura.value != '' && data.temperaturaAgua != parseFloat(filtroTemperatura.value)) {
          return false;
        }

        if (filtroPh.value != '' && data.pH != parseFloat(filtroPh.value)) {
          return false;
        }

        if (filtroPoluicao.value != 'all' && data.nivelPoluicao != filtroPoluicao.value) {
          return false;
        }
        return true;

      });
      this.oceanData = dadosFiltrados;

    });
  }

  ngOnInit(): void {
    this.listar();
    this.mostrarRegioes();
    this.mostrarEspecies();
    this.mostrarStatus();
    this.mostrarPoluicao();
    this.aplicarFiltro();
  }
}
