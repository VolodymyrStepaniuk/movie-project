import React from "react";

const SpinnerLoading = () => {
  return (
    <div
      className="container-fluid mt-5 d-flex justify-content-center"
      style={{ height: 500 }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default SpinnerLoading;
