import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Home from "./pages/Home/ProductHome";
import ProductView from "./pages/ProductView/ProductView";
import ProductList from "./pages/ProductList/ProductList";
import EditProduct from "./components/EditProduct/EditProduct";
import DeleteProduct from "./components/DeleteProduct/DeleteProduct";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product-view" component={ProductView} />
        <Route exact path="/product-list" component={ProductList} />
        <Route exact path="/edit/:productId" component={EditProduct} />
        <Route exact path="/delete/:productId" component={DeleteProduct} />
      </Switch>
    </Router>
  );
}

export default App;
