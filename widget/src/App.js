import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

const PRODUCTS_URL = "http://localhost:10000/all";

function App() {
  const [products, setProducts] = useState([]);

  // Placeholder url to get all products
  useEffect(() => {
    document.title = "Ratings Widget";
    //store products
    async function fetchAPI() {
      const all_prod = await getProducts();
      setProducts(all_prod);
    }
    fetchAPI();
  }, []);

  async function getProducts() {
    const res = await fetch(PRODUCTS_URL);
    const data = await res.json();
    return data;
  }

  const rate = (pID, uID, rating) => {};

  return (
    <div className="App">
      <header>
        <h1>Testing Area</h1>
      </header>
      <main>
        {products.map((prod) => (
          <Card
            id={prod.ID}
            title={prod.Title}
            desc={prod.desc}
            rating={prod.rating}
            onClick={rate}
          ></Card>
          // console.log(prod);
        ))}
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
