import Review from "../../models/ReviewModel";
import StarReview from "../Universal/Star/StarReview";

const ReviewComponent: React.FC<{ review: Review }> = (props) => {
    return (
        <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex align-items-center mb-3">
            <div>
              <h4 className="mb-1">John Doe</h4>
              <StarReview rating={props.review.rating} size={15} />
            </div>
          </div>
            <p>{props.review.comment}</p>
        </div>
      </div>
    );
}

export default ReviewComponent;