import { ProjetoConservacao } from './projetoConservacao';
import { Especies } from './especies';

export interface OceanData {
  regiao?: string,
  temperaturaAgua: number,
  pH: number,
  nivelPoluicao?: string,
  especies?: Especies[],
  projetosConservacao?: ProjetoConservacao[]
}
