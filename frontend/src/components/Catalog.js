import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Catalog.css";
import { useEffect } from "react";

const Catalog = () => {
  const [filteredFoods, setFilteredFoods] = useState([]);
  const location = useLocation();
  const foodEndpoint = location.pathname.split("/")[2];
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchFoodType = async () => {
      const res = await fetch(
        `http://localhost:8080/product?category=${foodEndpoint}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setFilteredFoods(data);
    };
    fetchFoodType();
  }, [foodEndpoint]);

  return (
    <div className="Catalog_container">
      <div className="Catalog_wrapper">
        {filteredFoods?.length !== 0 && (
          <h2 className="Catalog_title">
            The best {foodEndpoint} in the region
          </h2>
        )}
        <div className="Catalog_foods">
          {filteredFoods.length !== 0 ? (
            filteredFoods.map((f) => (
              <Link to={`/food/${f._id}`} key={f._id} className="food">
                <div className="Catalog_imgContainer">
                  <img
                    src={`http://localhost:8080/images/${f?.img}`}
                    className="foodImg"
                  />
                </div>
                <div className="Catalog_foodDetails">
                  <h4 className="Catalog_foodTitle">{f?.title}</h4>
                  <span className="price">
                    <span>$</span> {f?.price}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <h1 className="noQuantity">
              No {foodEndpoint} available right now...
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
