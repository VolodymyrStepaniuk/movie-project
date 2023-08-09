class Movie{
    constructor(private _id:number,private _title: string,private _year: number,
        private _production: string,private _genres: string[],private _director: string,
        private _duration: number,private _language: string,
        private _description:string,private _imgUrl:string){

    }
    public get id(): number {
        return this._id;
    }

    public set id(id: number) {
        this._id = id;
    }

    public get title(): string {
        return this._title;
    }

    public set title(title: string) {
        this._title = title;
    }

    public get year(): number {
        return this._year;
    }

    public set year(year: number) {
        this._year = year;
    }

    public get production(): string {
        return this._production;
    }

    public set production(production: string) {
        this._production = production;
    }

    public get genres(): string[] {
        return this._genres;
    }

    public set genres(genres: string[]) {
        this._genres = genres;
    }

    public get director(): string {
        return this._director;
    }

    public set director(director: string) {
        this._director = director;
    }

    public get duration(): number {
        return this._duration;
    }

    public set duration(duration: number) {
        this._duration = duration;
    }

    public get language(): string {
        return this._language;
    }

    public set language(language: string) {
        this._language = language;
    }

    public get imgUrl():string{
        return this._imgUrl;
    }

    public set imgUrl(imgUrl:string){
        this._imgUrl = imgUrl;
    }
    public get description():string{
        return this._description;
    }

    public set description(description:string){
        this._description = description;
    }
}

export default Movie;