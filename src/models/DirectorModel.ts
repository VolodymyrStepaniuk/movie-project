import Country from "./CountryModel";

class Director {
  constructor(
    private _id: number,
    private _firstName: string,
    private _lastName: string,
    private _birthDate: Date,
    private _birthCountry: Country,
    private _description: string,
    private _imageUrls: string[]
  ) {}

  public get id(): number {
    return this._id;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public get birthDate(): Date {
    return this._birthDate;
  }

  public get birthCountry(): Country {
    return this._birthCountry;
  }

  public get description(): string {
    return this._description;
  }

  public get imageUrls(): string[] {
    return this._imageUrls;
  }
}

export default Director;
