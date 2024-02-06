import Country from "./CountryModel";
import Director from "./DirectorModel";
import Genre from "./GenreModel";

class Movie{
    constructor(private _id:number, private _title:string, private _requiredAge:number, private _year:number,
        private _producingCountries: Country[], private _genres: Genre[], private _directors: Director[],
        private _duration: string, private _language:string, private _description:string, private _trailerUrl:string,
        private _videoUrl:string, private _imageUrls:string[])
        {}

    public get id(): number {
        return this._id;
    }

    public get title(): string {
        return this._title;
    }

    public get requiredAge(): number {
        return this._requiredAge;
    }

    public get year(): number {
        return this._year;
    }

    public get producingCountries(): Country[] {
        return this._producingCountries;
    }

    public get genres(): Genre[] {
        return this._genres;
    }

    public get directors(): Director[] {
        return this._directors;
    }

    public get duration(): string {
        return this._duration;
    }

    public get language(): string {
        return this._language;
    }

    public get description(): string {
        return this._description;
    }

    public get trailerUrl(): string {
        return this._trailerUrl;
    }

    public get videoUrl(): string {
        return this._videoUrl;
    }

    public get imageUrls(): string[] {
        return this._imageUrls;
    }
}

export default Movie;