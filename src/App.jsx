import { useState } from "react";
import products from "./products.json";

// Recommendation function (option 3 from the requirement)
function recommendProducts(userCategory, allProducts) {
  if (!userCategory) return [];
  return allProducts.filter((p) => p.category === userCategory).slice(0, 3);
}

export default function EcommerceCatalog() {
  const [viewedCategory, setViewedCategory] = useState(null);
    // Stores the currently selected price filter option
  const [filterByPrice, setFilterByPrice] = useState("");

  const handleView = (category) => {
    setViewedCategory(category);
  };

  const recommendations = recommendProducts(viewedCategory, products);

  //filter logic based on price range
  const filteredProducts = products.filter((product) => {
    const price = Number(product.price);
    if (Number.isNaN(price)) return filterByPrice === "";

    //this returns filtered product based on selected range
    return (
      filterByPrice === "" ||
      (filterByPrice === "low" && price < 50) ||
      (filterByPrice === "medium" && price >= 50 && price <= 100) ||
      (filterByPrice === "high" && price > 100)
    );
  });

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
     

      <h1>Clothing Store</h1>

      <div style={
        { 
          marginBottom: "7px", 
          display: "flex", 
          justifyContent: "flex-end", 
          height:'30px', 
          borderRadius: "8px",
          fontSize: "14px"
         }
      }>
        <select value={filterByPrice} onChange={(e) => setFilterByPrice(e.target.value)} aria-label="Filter by price">
          <option value="">Filter By Price</option>
          <option value="low">Below $50</option>
          <option value="medium">$50 - $100</option>
          <option value="high">Above $100</option>
        </select>
      </div>

      <h2>All Products</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px",   }}>
        {filteredProducts.length === 0 ? (
          <div style={{ padding: "10px" }}>No products match that price range</div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                width: "190px",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => handleView(product.category)}
            >
              <img src={product.image} alt={product.name} width="180" height="160" />
              <h4>{product.name}</h4>
              <p>${product.price}</p>
            </div>
          ))
        )}
      </div>

      {recommendations.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <h2>Recommended for You</h2>
          <div style={{ display: "flex", gap: "20px" }}>
            {recommendations.map((product) => (
              <div
                key={product.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  width: "190px",
                  textAlign: "center",
                }}
              >
                <img src={product.image} alt={product.name} width="150" height="150" />
                <h4>{product.name}</h4>
                <p>${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
