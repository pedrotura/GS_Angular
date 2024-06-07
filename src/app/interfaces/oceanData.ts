import { ConservationProject } from './conservationProject';
import { Species } from './species';

export interface OceanData {
  region?: string,
  waterTemperature: number,
  ph: number,
  pollutionLevels?: string,
  species: Species[],
  conservationProjects: ConservationProject[]
}
