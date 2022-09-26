export interface IVaccine {
    id: number;
    name: string;
    description: string;
    numberOfDoses: number;
    releaseDate: Date;
    photoUrl: string;
    isMandatory: boolean;
  }
  
  export type IVaccineToInsert = Omit<IVaccine, "id">;
  