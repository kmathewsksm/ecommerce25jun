import React from "react";

export const ProductView3x3 = () => {}; //function to fetch products list and view 3x3

export function ProductList() {
  return (
    <>
      <div>
        <input type="text" placeholder="search for your item" />
      </div>
      <div>{ProductView3x3}</div>
    </>
  );
}
