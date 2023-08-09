import { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      <nav className="navbar fixed-top bg-custom p-0">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
              onClick={handleMenuToggle}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand mx-4 " href="/">
              <img
                className="custom-logo-size"
                src="https://multiplex.ua/img/logo.svg"
                alt="brand-icon"
              />
            </a>
          </div>
          <div>
            <a href="/login" className="text-decoration-none text-reset">
              <span className="me-3 fw-bold d-none d-md-block">Увійти</span>
            </a>
          </div>
          <div
            className="offcanvas offcanvas-start"
            tabIndex={-1}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={handleMenuToggle}
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav text-center flex-grow-1 pe-3">
                <li className="nav-item active">
                  <a href="/">
                    <img
                      src="https://multiplex.ua/img/logo.svg"
                      alt="brand-icon"
                    />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Зараз у прокаті
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Огляди
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Купити квиток
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/search"
                  >
                    Каталог фільмів
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active fw-bold d-block d-md-none"
                    aria-current="page"
                    href="#"
                  >
                    Увійти
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
