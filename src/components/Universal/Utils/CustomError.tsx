const CustomError: React.FC<{ error: any }> = (props) => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold text-white">
          {props.error.statusCode}
        </h1>
        <p className="fs-3">
          <span className="text-danger">Opps!</span>
        </p>
        <p className="lead text-white">{props.error.message}</p>
        <a href="/" className="btn btn-outline-danger btn-lg">
          Go Home
        </a>
      </div>
    </div>
  );
};

export default CustomError;
