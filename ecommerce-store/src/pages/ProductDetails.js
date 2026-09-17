import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://muhammadfarhandeveloper.github.io/E-Commerce-fakeapi/products.json')
      .then((res) => res.json())
      .then((data) => {
        const foundProduct = data.find((p) => p.id === parseInt(id));
        setProduct(foundProduct);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center my-5"><h3>Details Load Ho Rahi Hain...</h3></div>;
  if (!product) return <div className="text-center my-5"><h3>Product Nahi Mili.</h3></div>;

  // Title/Name aur Description keys ki handling
  const productName = product.title || product.name || 'No Title Available';
  const productDesc = product.description || product.desc || 'No Description Available';

  return (
    <div className="container my-5">
      <Link to="/" className="btn btn-outline-secondary mb-4">&larr; Back to Products</Link>
      <div className="row align-items-center">
        <div className="col-md-6 text-center">
          <img src={product.image} alt={productName} style={{ maxHeight: '350px', objectFit: 'contain' }} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <span className="badge bg-secondary mb-2 text-capitalize">{product.category}</span>
          <h2>{productName}</h2>
          <p className="text-muted">{productDesc}</p>
          <h4 className="text-primary my-3">${product.price}</h4>
          <button onClick={() => addToCart(product)} className="btn btn-success">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;