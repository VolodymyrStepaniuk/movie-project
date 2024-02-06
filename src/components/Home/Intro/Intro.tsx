const Intro = () => {
  const backgroundImageUrl =
    "https://media.istockphoto.com/id/1136207217/photo/panorama-of-an-empty-cinema-hall-as-creative-abstract-blur-background.jpg?s=170667a&w=0&k=20&c=mom92byojWKLjJ8otyd9qjFWD1xyDCVfCVi4y1_Z9pE=";

  const containerStyle = {
    backgroundImage: `url('${backgroundImageUrl}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    overflow: "hidden",
  };

  const DownArrowIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-arrow-down font-weight-bold"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M8 1.5a.5.5 0 0 1 .5.5v10.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 1 1 .708-.708L7.5 12.293V1.5a.5.5 0 0 1 .5-.5z"
      />
    </svg>
  );

  return (
    <div className="d-flex align-items-center" style={containerStyle}>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-7">
          <div className="text-center text-white">
            <h1 className="fw-bold">Як працює VS Video?</h1>
            <p className="fw-bold">
             Дуже просто. Ви можете обрати один з фільмів які є на нашій платформі, та орендувати його для перегляду. Ви можете переглянути фільм в будь-який час, та в будь-якому місці. Вам лише потрібно зареєструватись на нашому сайті, та ви зможете насолоджуватись переглядом фільмів.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Intro;
