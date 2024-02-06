import { useEffect, useState } from "react";
import Review from "../../models/ReviewModel";
import CustomError from "../Universal/Utils/CustomError";
import SpinnerLoading from "../Universal/Utils/SpinnerLoading";
import { BASE_URL } from "../../constants/BASE_URL";
import ReviewComponent from "./ReviewComponent";

const Reviews : React.FC<{ movieId: string }> = (props) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetcReviews = async () => {
      const baseUrl = BASE_URL + "/review?movieId="+props.movieId;
      const response = await fetch(baseUrl);
      const responseJson = await response.json();
      console.log(baseUrl);
      if (!response.ok) {
        setHttpError(responseJson);
        throw new Error("Something went wrong!");
      }
      const responseData = responseJson.content;
      const loadedReviews: Review[] = [];
      for (const key in responseData) {
        loadedReviews.push(
          new Review(
            responseData[key].id,
            responseData[key].username,
            responseData[key].movieId,
            responseData[key].rating,
            responseData[key].comment,
            responseData[key].createdAt,
            responseData[key].lastModifiedAt
          )
        );
      };

      setReviews(loadedReviews);
      setIsLoading(false);
      console.log(loadedReviews);
    };
    fetcReviews().catch((error: any) => {
      setIsLoading(false);
      console.log(error.message);
    });
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return <CustomError error={httpError} />;
  }
  return (
    <div className="container mt-3 w-50">
      <div className="row mt-3">
        <div className="col-md-12">
          <h3 className="fw-bold text-white text-center">Відгуки</h3>
          {reviews.map((review) => (
            <ReviewComponent review={review} key={review.id}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
