import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./style.css";
import { useDispatch } from "react-redux";
import { ADD } from "../redux/actions/action";
import { Rating } from "./RatingComp";

const Cards = () => {
  const [data, setData] = useState([]);
  const [initialFoodData, setInitialFoodData] = useState([]);

  useEffect(() => {
    fetch("http://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
        setInitialFoodData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const dispatch = useDispatch();

  const send = (e) => {
    // console.log(e);
    dispatch(ADD(e));
  };
  

  return (
    <div className="container mt-3">
      <button
        className="buttonVeg"
        onClick={() => {
          setData(initialFoodData.filter((item) => item.isVeg));

        }}
      ></button>
      <button
        className="buttonNonVeg"
        onClick={() => {
          setData(initialFoodData.filter((item) => !item.isVeg));
        }}
      ></button>
      <button
        className="buttonAll"
        onClick={() => {
          setData(initialFoodData);
        }}
      ></button>
      {/* <form onSubmit={(e)=>{
        filterData()
      }}> */}
      <label className="filterrating">Rating</label>
        <input type="text" placeholder="rating" onChange={(e) => {
          setData(initialFoodData.filter(item => e.target.value <= item.rating))
        }} />
    <label className="filterprice">Price</label>
    <input type="text" placeholder="price" onChange={(e) => {
          setData(initialFoodData.filter(item => e.target.value <= item.price))
        }} />
       
      <h2 className="text-center">PIZZA STORE</h2>
      {/* <p>{JSON.stringify(data)}</p> */}
      <div className="row d-flex justify-content-center align-items-center">
        {data.length ?data.map((element, id) => {
          return (
            <>
              <Card
                style={{ width: "22rem", border: "none" }}
                className="mx-2 mt-4 card_style"
              >
                <Card.Img
                  variant="top"
                  src={element.img_url}
                  style={{ height: "16rem" }}
                  className="mt-3"
                />
                <Card.Body>
                  <Card.Title>{element.name}</Card.Title>
                  <Card.Text>Price : ₹ {element.price}</Card.Text>
                  <Rating
                    value={element.rating}
                    maxStars={5}
                    starSize={20}
                    color={"#fd7e14"}
                  />
                  <div className="button_div d-flex justify-content-center">
                    <Button
                      variant="primary"
                      onClick={() => send(element)}
                      className="col-lg-12"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </>
          );
        })
      : <>no data</>}
      </div>
    </div>
  );
};

export default Cards;
