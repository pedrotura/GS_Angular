import { ConservationProject } from './../../interfaces/conservationProject';
import { FilterService } from './../../services/filter.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OceanData } from '../../interfaces/oceanData';
import { Species } from '../../interfaces/species';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})

export class FilterComponent {

  oceanData: OceanData[] = [];
  species: Species[] = [];
  conservationProjects: ConservationProject[] = [];

  constructor(private filterService: FilterService) { }

  // getOceanData(): void {
  //   this.filterService.getOceanData().subscribe(oceanData => this.oceanData = oceanData);

  //   this.oceanData.forEach(data => {
  //     console.log(data);

  //   })

  // }

  listar(): void {
    this.filterService.listar().subscribe((data) => (this.oceanData= data));

    this.oceanData.forEach(data => {
      console.log(data);

    })

  }

  ngOnInit(): void {
    this.listar();
  }

}
