class Country {
  constructor(
    private _id: number,
    private _name: string,
    private _imageUrl: string
  ) {}

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get imageUrl(): string {
    return this._imageUrl;
  }
}

export default Country;
