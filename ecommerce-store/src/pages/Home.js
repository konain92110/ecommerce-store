import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetch('https://muhammadfarhandeveloper.github.io/E-Commerce-fakeapi/products.json')
      .then((res) => {
        if (!res.ok) throw new Error('Data fetch karne me masla hua.');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        const uniqueCategories = ['all', ...new Set(data.map((item) => item.category))];
        setCategories(uniqueCategories);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = products;

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      result = result.filter((p) => {
        const name = p.title || p.name || '';
        return name.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, products]);

  if (loading) return <div className="text-center my-5"><h3>Products Load Ho Rahi Hain...</h3></div>;
  if (error) return <div className="text-center text-danger my-5"><h3>Error: {error}</h3></div>;

  return (
    <div className="container my-4">
      <div className="row mb-4">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select text-capitalize"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))
        ) : (
          <p className="text-center">Koi product nahi mili.</p>
        )}
      </div>
    </div>
  );
}

export default Home;