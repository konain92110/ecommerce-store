import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const productsSectionRef = useRef(null);

  const initialProducts = [
    {
      id: 1,
      title: 'Polarized Aviator Sunglasses',
      category: 'Accessories',
      price: 59,
      oldPrice: 79,
      rating: 4.8,
      reviews: 88,
      badge: 'Limited',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
      description: 'Premium gold-frame polarized aviator sunglasses with gradient tint.'
    },
    {
      id: 2,
      title: 'Classic Brown Leather Boots',
      category: 'Shoes',
      price: 149,
      oldPrice: 189,
      rating: 4.9,
      reviews: 112,
      badge: 'Best Seller',
      image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500',
      description: 'Handcrafted genuine leather boots with durable rubber grip soles.'
    },
    {
      id: 3,
      title: 'Luxury Gold-Buckle Belt',
      category: 'Accessories',
      price: 45,
      oldPrice: 60,
      rating: 4.6,
      reviews: 54,
      badge: 'New',
      image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=500',
      description: 'Sleek black leather belt with a polished metallic gold buckle.'
    },
    {
      id: 4,
      title: 'Floral Print Summer Dress',
      category: 'Women',
      price: 79,
      oldPrice: 99,
      rating: 4.7,
      reviews: 67,
      badge: 'Sale',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500',
      description: 'Lightweight, breathable cotton floral dress perfect for warm weather.'
    },
    {
      id: 5,
      title: 'Urban White Sneakers',
      category: 'Shoes',
      price: 119,
      oldPrice: 149,
      rating: 4.9,
      reviews: 120,
      badge: 'Trending',
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500',
      description: 'Minimalist white leather sneakers designed for all-day comfort.'
    },
    {
      id: 6,
      title: 'Vintage Denim Jacket',
      category: 'Men',
      price: 89,
      oldPrice: 110,
      rating: 4.6,
      reviews: 58,
      badge: 'Popular',
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500',
      description: 'Classic washed blue denim jacket with sturdy bronze buttons.'
    },
    {
      id: 7,
      title: 'Slim Bi-Fold Leather Wallet',
      category: 'Accessories',
      price: 39,
      oldPrice: 55,
      rating: 4.8,
      reviews: 84,
      badge: 'Hot Deal',
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
      description: 'Handcrafted genuine leather wallet with RFID protection.'
    },
    {
      id: 8,
      title: 'Casual Cotton Hoodie',
      category: 'Women',
      price: 65,
      oldPrice: 85,
      rating: 4.7,
      reviews: 42,
      badge: 'New',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500',
      description: 'Cozy and lightweight cotton hoodie perfect for casual wear.'
    }
  ];

  useEffect(() => {
    setProducts(initialProducts);
    setFilteredProducts(initialProducts);
  }, []);

  useEffect(() => {
    let result = products;

    if (activeCategory !== 'All') {
      result = result.filter(
        (item) => item.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    if (searchTerm.trim() !== '') {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [activeCategory, searchTerm, products]);

  const handleShopClick = () => {
    setActiveCategory('All');
    setSearchTerm('');
    setIsCartOpen(false);
    setSelectedProduct(null);

    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="shopease-container">
      {/* Top Navbar */}
      <nav className="shopease-nav">
        <div className="nav-brand" onClick={handleShopClick} style={{ cursor: 'pointer' }}>
          <span className="brand-icon">✨</span> AuraWear
        </div>
        <div className="nav-search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="nav-actions">
          <button type="button" className="nav-shop-btn" onClick={handleShopClick}>
            Shop
          </button>
          <button type="button" className="nav-cart-btn" onClick={() => setIsCartOpen(true)}>
            🛒 Cart <span className="cart-badge">{totalCartCount}</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <div className="hero-header">
          <h1>Elevate Your Everyday Style</h1>
          <p>Curated fashion and premium accessories for modern lifestyles.</p>
        </div>

        <div ref={productsSectionRef}>
          {/* Category Pills */}
          <div className="category-pills">
            {['All', 'Men', 'Women', 'Shoes', 'Accessories'].map((cat) => (
              <button
                key={cat}
                type="button"
                className={`pill-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="product-grid">
            {filteredProducts.length === 0 ? (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0' }}>
                No products found.
              </p>
            ) : (
              filteredProducts.map((item) => (
                <div className="shopease-card" key={item.id}>
                  <div className="card-image-box">
                    {item.badge && <span className="item-badge">{item.badge}</span>}
                    <img src={item.image} alt={item.title} />
                  </div>

                  <div className="card-info">
                    <span className="card-category">{item.category}</span>
                    <h3 className="card-title">{item.title}</h3>

                    <div className="card-price-row">
                      <span className="current-price">${item.price}</span>
                      {item.oldPrice && <span className="old-price">${item.oldPrice}</span>}
                    </div>

                    <div className="card-rating">
                      ⭐ {item.rating} <span className="reviews-count">({item.reviews})</span>
                    </div>

                    <div className="card-buttons">
                      <button
                        type="button"
                        className="details-link-btn"
                        onClick={() => setSelectedProduct(item)}
                      >
                        Details
                      </button>
                      <button
                        type="button"
                        className="add-cart-blue-btn"
                        onClick={() => addToCart(item)}
                      >
                        🛒 Add
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="modal-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h2>Your Cart</h2>
              <button
                type="button"
                className="close-drawer-btn"
                onClick={() => setIsCartOpen(false)}
              >
                &times;
              </button>
            </div>

            <div className="drawer-body">
              {cart.length === 0 ? (
                <p className="empty-cart-text">Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="drawer-item">
                    <img src={item.image} alt={item.title} />
                    <div className="item-details">
                      <h4>{item.title}</h4>
                      <p>${item.price} x {item.qty}</p>
                    </div>
                    <button
                      type="button"
                      className="remove-item-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="drawer-footer">
                <h3>Total: ${totalCartPrice}</h3>
                <button
                  type="button"
                  className="checkout-btn"
                  onClick={() => alert('Order Placed Successfully!')}
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="details-popup" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="close-drawer-btn"
              onClick={() => setSelectedProduct(null)}
            >
              &times;
            </button>
            <div className="details-popup-content">
              <img src={selectedProduct.image} alt={selectedProduct.title} />
              <div className="details-info">
                <h2>{selectedProduct.title}</h2>
                <span className="card-category">{selectedProduct.category}</span>
                <p className="description-text">{selectedProduct.description}</p>
                <div className="card-price-row">
                  <span className="current-price">${selectedProduct.price}</span>
                  {selectedProduct.oldPrice && (
                    <span className="old-price">${selectedProduct.oldPrice}</span>
                  )}
                </div>
                <button
                  type="button"
                  className="add-cart-blue-btn full-width"
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;