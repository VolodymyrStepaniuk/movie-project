class Review {
  constructor(
    private _id: number,
    private _movieId: number,
    private _userId: number,
    private _rating: number,
    private _comment: string,
    private _createdAt: Date,
    private _lastModifiedAt: Date
  ) {}

    get id(): number {
        return this._id;
    }

    get movieId(): number {
        return this._movieId;
    }

    get userId(): number {
        return this._userId;
    }

    get rating(): number {
        return this._rating;
    }

    get comment(): string {
        return this._comment;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get lastModifiedAt(): Date {
        return this._lastModifiedAt;
    }
}

export default Review;