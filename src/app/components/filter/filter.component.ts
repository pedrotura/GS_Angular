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
  teste?: string;

  constructor(private filterService: FilterService) { }

  listar(): void {
    this.filterService.listar().subscribe((data) => (this.oceanData = data));
  }

  ngOnInit(): void {
    this.listar();
  }

}
