class Genre{
    constructor(private _id:number, private _genreName:string){}

    public get id(): number {
        return this._id;
    }

    public get genreName(): string {
        return this._genreName;
    }
}

export default Genre;