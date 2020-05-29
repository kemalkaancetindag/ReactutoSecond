import React, { Component } from "react";
import { Table } from "reactstrap";

export default class CartList extends Component {
  renderCart() {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Id</th>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Units ın Stock</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {this.props.cart.map((item) => (
            <tr key={item.product.id}>
              <th>{item.product.id}</th>
              <th>{item.product.categoryId}</th>
              <th>{item.product.productName}</th>
              <th>{item.product.unitPrice}</th>
              <th>{item.product.unitsInStock}</th>
              <th>{item.quantity}</th>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  render() {
    return <div>{this.renderCart()}</div>;
  }
}
