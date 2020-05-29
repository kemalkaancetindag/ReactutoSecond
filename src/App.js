import React, { Component } from "react";
import Navi from "./Navi";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";
import alertify from "alertifyjs";
import { Switch, Route } from "react-router-dom";
import NotFound from "./NotFound";
import CartList from "./CartList";
import { BrowserRouter as Router } from "react-router-dom";

export default class App extends Component {
  state = {
    currentCategory: "",
    productInfo: { title: "Product List" },
    categoryInfo: { title: "Category List" },
    products: [],
    cart: [],
  };

  changeCategory = (category) => {
    this.setState({
      currentCategory: category.categoryName,
    });

    this.getProducts(category.id);
  };

  getProducts = async (categoryId) => {
    let url = "http://localhost:3000/products";

    if (categoryId) {
      url = url + "?categoryId=" + categoryId;
    }

    await fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({
      cart: newCart,
    });
  };

  componentDidMount() {
    this.getProducts();
  }

  addProductToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem) {
      return (addedItem.quantity += 1);
    }
    newCart.push({ product: product, quantity: 1 });

    this.setState({
      cart: newCart,
    });

    alertify.success(product.productName + " Added To Cart");
  };

  render() {
    return (
      <Router>
        <Switch>
          <div className="App">
            <Container>
              <Navi
                removeFromCart={this.removeFromCart}
                cart={this.state.cart}
              ></Navi>

              <Row className="mt-4">
                <Col xs="3">
                  <CategoryList
                    currentCategory={this.state.currentCategory}
                    changeCategory={this.changeCategory}
                    info={this.state.categoryInfo}
                  ></CategoryList>
                </Col>

                <Col xs="9">
                  
                  <Route
                    exact
                    path="/"
                    render={(props) => (
                      <ProductList
                        {...props}
                        addProductToCart={this.addProductToCart}
                        products={this.state.products}
                        category={this.state.currentCategory}
                        info={this.state.productInfo}
                      ></ProductList>
                    )}
                  ></Route>
                  <Route
                    exact
                    path="/cart"
                    render={(props) => (
                      <CartList
                        {...props}
                        removeFromCart={this.removeFromCart}
                        cart={this.state.cart}
                      ></CartList>
                    )}
                  ></Route>
                </Col>
              </Row>
            </Container>
          </div>
        </Switch>
      </Router>
    );
  }
}
