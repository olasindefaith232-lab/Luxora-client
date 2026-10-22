import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Heart,
  Instagram,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  X,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "The Everyday Tote",
    category: "Bags",
    price: 48500,
    oldPrice: null,
    rating: "4.9",
    badge: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85",
    detail:
      "A little room for everything. Made with soft, structured vegan leather and finished with thoughtful details for wherever the day takes you.",
    color: "Warm caramel",
  },
  {
    id: 2,
    name: "Solstice Eau de Parfum",
    category: "Beauty",
    price: 32000,
    oldPrice: null,
    rating: "4.8",
    badge: "NEW ARRIVAL",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85",
    detail:
      "A sun-warmed blend of bergamot, soft jasmine, and sandalwood. An intimate, lingering scent made for everyday rituals.",
    color: "Amber glass",
  },
  {
    id: 3,
    name: "Sculpted Gold Hoops",
    category: "Jewelry",
    price: 18500,
    oldPrice: null,
    rating: "4.9",
    badge: "",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85",
    detail:
      "An understated statement in a sculptural silhouette. Lightweight, comfortable, and easy to wear from morning to evening.",
    color: "Polished gold",
  },
  {
    id: 4,
    name: "Linen Sunday Shirt",
    category: "Fashion",
    price: 27500,
    oldPrice: 34000,
    rating: "4.7",
    badge: "−19%",
    image:
      "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=85",
    detail:
      "Relaxed, breathable linen with an easy drape. Your new favorite layer, cut to feel just as good as it looks.",
    color: "Soft ivory",
  },
  {
    id: 5,
    name: "The Mini Crossbody",
    category: "Bags",
    price: 36500,
    oldPrice: null,
    rating: "4.8",
    badge: "NEW ARRIVAL",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    detail:
      "A hands-free everyday favorite with a considered shape, adjustable strap, and room for all the little essentials.",
    color: "Soft sand",
  },
  {
    id: 6,
    name: "The Weekend Knit",
    category: "Fashion",
    price: 39000,
    oldPrice: null,
    rating: "4.8",
    badge: "",
    image:
      "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=900&q=85",
    detail:
      "An easy, softly textured knit made for slow mornings, long lunches, and everything in between.",
    color: "Oatmeal",
  },
  {
    id: 7,
    name: "Petal Hand Cream",
    category: "Beauty",
    price: 12500,
    oldPrice: null,
    rating: "4.7",
    badge: "",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85",
    detail:
      "A nourishing, quick-absorbing hand cream with a delicate floral scent for a small moment of care anywhere.",
    color: "Rose and shea",
  },
  {
    id: 8,
    name: "Golden Hour Necklace",
    category: "Jewelry",
    price: 22000,
    oldPrice: null,
    rating: "4.9",
    badge: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85",
    detail:
      "A delicate gold-tone chain with a subtle, sculptural pendant that layers beautifully or shines all on its own.",
    color: "Warm gold",
  },
];

const categories = [
  {
    name: "Fashion",
    count: "2 considered pieces",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Bags",
    count: "2 considered pieces",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Beauty",
    count: "2 considered pieces",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Jewelry",
    count: "2 considered pieces",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=85",
  },
];

const formatPrice = (price) =>
  `₦${new Intl.NumberFormat("en-NG").format(price)}`;

function getRoute(pathname) {
  if (pathname === "/") return { type: "home" };
  if (pathname === "/new-in") return { type: "new-in" };
  if (pathname === "/shop") return { type: "shop" };
  if (pathname === "/our-story") return { type: "story" };
  if (pathname === "/journal") return { type: "journal" };
  if (pathname === "/delivery") return { type: "info", title: "Delivery & returns", eyebrow: "HERE TO HELP" };
  if (pathname === "/faqs") return { type: "info", title: "Frequently asked questions", eyebrow: "A FEW GOOD ANSWERS" };
  if (pathname === "/contact") return { type: "info", title: "Get in touch", eyebrow: "WE’RE HERE FOR YOU" };
  if (pathname === "/account") return { type: "info", title: "Your account", eyebrow: "YOUR LITTLE CORNER" };
  if (pathname === "/privacy") return { type: "info", title: "Privacy policy", eyebrow: "THE LITTLE DETAILS" };
  if (pathname === "/terms") return { type: "info", title: "Terms & conditions", eyebrow: "THE LITTLE DETAILS" };

  const collection = categories.find(
    (item) => `/collections/${item.name.toLowerCase()}` === pathname,
  );
  if (collection) return { type: "collection", category: collection };
  return { type: "not-found" };
}

function ProductCard({ product, wishlist, onSelect, onToggleWishlist, onAdd }) {
  const isSaved = wishlist.includes(product.id);
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <button
          className="product-image-button"
          type="button"
          onClick={() => onSelect(product)}
          aria-label={`View ${product.name}`}
        >
          <img src={product.image} alt={product.name} loading="lazy" />
        </button>
        {product.badge && (
          <span className={`product-badge ${product.badge.includes("−") ? "sale-badge" : ""}`}>
            {product.badge}
          </span>
        )}
        <button
          className={`heart-button ${isSaved ? "is-saved" : ""}`}
          type="button"
          aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          onClick={() => onToggleWishlist(product.id)}
        >
          <Heart size={17} fill={isSaved ? "currentColor" : "none"} />
        </button>
        <button className="quick-add" type="button" onClick={() => onAdd(product.id)}>
          <Plus size={15} /> Quick add
        </button>
      </div>
      <div className="product-details">
        <div className="product-title-row">
          <button type="button" onClick={() => onSelect(product)}>{product.name}</button>
          <span className="rating"><Star size={12} fill="currentColor" /> {product.rating}</span>
        </div>
        <div className="product-price">
          <span>{formatPrice(product.price)}</span>
          {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
        </div>
      </div>
    </article>
  );
}

function PageContent({ route, products, wishlist, showWishlist, search, onSelect, onToggleWishlist, onAdd }) {
  if (route.type === "collection") {
    const collectionProducts = products.filter(
      (product) => product.category === route.category.name,
    );
    return (
      <>
        <section className="collection-hero">
          <img src={route.category.image} alt="" />
          <div className="collection-hero-shade" />
          <div className="collection-hero-copy">
            <p className="eyebrow light-eyebrow"><span /> THE LUXORA COLLECTION</p>
            <h1>{route.category.name}<br /><em>for every day.</em></h1>
            <p>Thoughtfully chosen pieces to bring a little more lovely to the everyday.</p>
          </div>
        </section>
        <section className="section collection-products">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{route.category.count.toUpperCase()}</p>
              <h2>Meet the <em>{route.category.name.toLowerCase()} edit.</em></h2>
            </div>
          </div>
          <div className="product-grid">
            {collectionProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                wishlist={wishlist}
                onSelect={onSelect}
                onToggleWishlist={onToggleWishlist}
                onAdd={onAdd}
              />
            ))}
          </div>
        </section>
      </>
    );
  }

  if (route.type === "shop" || route.type === "new-in") {
    const listing = (route.type === "new-in"
      ? products.filter((product) => product.badge === "NEW ARRIVAL" || product.id > 4)
      : products
    ).filter((product) =>
      (!search || `${product.name} ${product.category}`.toLowerCase().includes(search.toLowerCase()))
      && (!showWishlist || wishlist.includes(product.id)),
    );
    const isNewIn = route.type === "new-in";
    return (
      <>
        <section className="page-intro">
          <p className="eyebrow">{isNewIn ? "FRESHLY FOUND" : "THOUGHTFULLY FOUND, MADE TO BE LOVED"}</p>
          <h1>{showWishlist ? <>Your saved <em>favorites.</em></> : isNewIn ? <>Just in, just <em>for you.</em></> : <>The full <em>Luxora edit.</em></>}</h1>
          <p>{isNewIn ? "Meet the newest little things to find their way into our world." : "Explore the pieces, makers, and everyday luxuries we can't wait to share."}</p>
        </section>
        <section className="section collection-products">
          <div className="product-grid">
            {listing.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                wishlist={wishlist}
                onSelect={onSelect}
                onToggleWishlist={onToggleWishlist}
                onAdd={onAdd}
              />
            ))}
          </div>
          {!listing.length && <p className="page-empty">No pieces found. Try another search.</p>}
        </section>
      </>
    );
  }

  if (route.type === "story") {
    return (
      <section className="editorial-page">
        <div className="editorial-image">
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=85" alt="A sunlit boutique filled with carefully chosen pieces" />
        </div>
        <div className="editorial-copy">
          <p className="eyebrow">OUR POINT OF VIEW</p>
          <h1>A more thoughtful<br /><em>kind of mall.</em></h1>
          <p>Luxora began with a simple idea: finding something beautiful should feel as good as bringing it home. We bring together independent makers and considered brands, with a little care in every detail.</p>
          <p>From the pieces we choose to the people who make them, everything here is picked to be loved, used, and lived in.</p>
        </div>
      </section>
    );
  }

  if (route.type === "journal") {
    return (
      <section className="journal-page">
        <div className="page-intro">
          <p className="eyebrow">NOTES FROM OUR LITTLE CORNER</p>
          <h1>The Luxora <em>journal.</em></h1>
          <p>Good stories, thoughtful finds, and small ways to make the everyday lovely.</p>
        </div>
        <div className="section journal-grid">
          {[
            {
              title: "A softer way to get dressed",
              image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85",
              category: "THE EVERYDAY EDIT",
            },
            {
              title: "The little things worth keeping",
              image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85",
              category: "OBJECTS WITH A STORY",
            },
            {
              title: "A moment for your own ritual",
              image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=85",
              category: "A LITTLE SELF-CARE",
            },
          ].map((story) => (
            <article className="journal-card" key={story.title}>
              <img src={story.image} alt="" loading="lazy" />
              <p className="eyebrow">{story.category}</p>
              <h2>{story.title}</h2>
              <span>Coming soon <ArrowRight size={14} /></span>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (route.type === "info") {
    return (
      <section className="page-intro">
        <p className="eyebrow">{route.eyebrow}</p>
        <h1>{route.title.split(" ").slice(0, -1).join(" ")} <em>{route.title.split(" ").slice(-1)}</em></h1>
        <p>This page is being prepared with care. In the meantime, explore our collections or get in touch through our social channel.</p>
        <a className="button button-dark" href="/shop">Explore the edit <ArrowRight size={16} /></a>
      </section>
    );
  }

  return (
    <section className="page-intro">
      <p className="eyebrow">OH, THIS IS AWKWARD</p>
      <h1>We can’t find <em>that page.</em></h1>
      <p>It may have moved, but there are plenty of lovely things to discover.</p>
      <a className="button button-dark" href="/">Back to home <ArrowRight size={16} /></a>
    </section>
  );
}

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showWishlist, setShowWishlist] = useState(false);
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const route = getRoute(currentPath);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function navigate(path) {
    if (window.location.pathname !== path) window.history.pushState({}, "", path);
    setCurrentPath(path);
    setMobileMenuOpen(false);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const visibleProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return products.filter((product) => {
      const categoryMatches =
        activeCategory === "All" || product.category === activeCategory;
      const wishlistMatches =
        !showWishlist || wishlist.includes(product.id);
      const searchMatches =
        !normalizedSearch ||
        `${product.name} ${product.category}`.toLowerCase().includes(normalizedSearch);
      return categoryMatches && wishlistMatches && searchMatches;
    });
  }, [activeCategory, search, showWishlist, wishlist]);

  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const cartTotal = products.reduce(
    (sum, product) => sum + product.price * (cart[product.id] || 0),
    0,
  );

  function addToCart(productId) {
    setCart((current) => ({
      ...current,
      [productId]: (current[productId] || 0) + 1,
    }));
  }

  function updateQuantity(productId, change) {
    setCart((current) => {
      const nextQuantity = (current[productId] || 0) + change;
      const next = { ...current };
      if (nextQuantity <= 0) delete next[productId];
      else next[productId] = nextQuantity;
      return next;
    });
  }

  function toggleWishlist(productId) {
    setWishlist((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  }

  function chooseCategory(category) {
    setActiveCategory(category);
    setSearch("");
    setShowWishlist(false);
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  }

  function subscribe(event) {
    event.preventDefault();
    if (email.trim()) setSubscribed(true);
  }

  return (
    <div className="site-shell">
      <div className="announcement">
        <span>THE LITTLE THINGS, BEAUTIFULLY CONSIDERED</span>
        <span className="announcement-note">Complimentary delivery on orders over ₦75,000</span>
        <ArrowRight size={14} aria-hidden="true" />
      </div>

      <header className="site-header">
        <button
          className="icon-button menu-toggle"
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <a className="wordmark" href="/" onClick={(event) => { event.preventDefault(); navigate("/"); }} aria-label="Luxora home">
          LUXORA<span>®</span>
          <small>THE EVERYDAY EDIT</small>
        </a>
        <nav className={`main-nav ${mobileMenuOpen ? "is-open" : ""}`}>
          <a href="/new-in" onClick={(event) => { event.preventDefault(); navigate("/new-in"); }}>New in</a>
          <div className="nav-dropdown">
            <a href="/shop" onClick={(event) => { event.preventDefault(); navigate("/shop"); }}>
              Shop all <ChevronDown size={13} />
            </a>
            <div className="dropdown-menu">
              {categories.map((category) => (
                <a
                  href={`/collections/${category.name.toLowerCase()}`}
                  key={category.name}
                  onClick={(event) => { event.preventDefault(); navigate(`/collections/${category.name.toLowerCase()}`); }}
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>
          <a href="/our-story" onClick={(event) => { event.preventDefault(); navigate("/our-story"); }}>Our story</a>
          <a href="/journal" onClick={(event) => { event.preventDefault(); navigate("/journal"); }}>The journal</a>
        </nav>
        <div className="header-actions">
          <label className="search-control">
            <Search size={17} aria-hidden="true" />
            <input
              aria-label="Search products"
              placeholder="Search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setShowWishlist(false);
                setActiveCategory("All");
                if (event.target.value && route.type === "home") {
                  document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              onFocus={() => setMobileMenuOpen(false)}
            />
          </label>
          <button
            className="icon-button wishlist-shortcut"
            type="button"
            aria-label={`${showWishlist ? "Show all products" : "Show saved favorites"}, ${wishlist.length} saved`}
            onClick={() => {
              if (route.type !== "home") navigate("/shop");
              setActiveCategory("All");
              setSearch("");
              setShowWishlist((current) => !current);
              if (route.type === "home") document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Heart size={19} />
            {wishlist.length > 0 && <span className="action-count">{wishlist.length}</span>}
          </button>
          <button
            className="icon-button bag-button"
            type="button"
            aria-label={`Open shopping bag, ${cartCount} items`}
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag size={19} />
            <span className="action-count">{cartCount}</span>
          </button>
        </div>
      </header>

      <main>
        {route.type !== "home" ? (
          <PageContent
            route={route}
            products={route.type === "collection"
              ? products.filter((product) => product.category === route.category.name)
              : products}
            wishlist={wishlist}
            showWishlist={showWishlist}
            search={search}
            onSelect={setSelectedProduct}
            onToggleWishlist={toggleWishlist}
            onAdd={addToCart}
          />
        ) : (
          <>
        <section className="hero" aria-label="Featured collection">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2200&q=90"
            alt="Friends exploring a considered fashion collection"
          />
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="eyebrow light-eyebrow"><span /> A MORE THOUGHTFUL KIND OF MALL</p>
            <h1>Discover luxury.<br /><em>Shop your style.</em></h1>
            <p className="hero-copy">
              The pieces you love, the brands you believe in, all in one beautiful place.
            </p>
            <div className="hero-actions">
              <a className="button button-light" href="/shop" onClick={(event) => { event.preventDefault(); navigate("/shop"); }}>
                Explore the edit <ArrowRight size={16} />
              </a>
              <a className="text-link light-link" href="/our-story" onClick={(event) => { event.preventDefault(); navigate("/our-story"); }}>Our point of view <ArrowUpRight size={15} /></a>
            </div>
          </div>
          <div className="hero-caption">
            <span>01 / 04</span>
            <span className="caption-line" />
            <span>THE NEW SEASON, IN GOOD COMPANY</span>
          </div>
          <a href="#categories" className="scroll-cue" aria-label="Scroll to explore">
            <ArrowDown size={16} />
          </a>
        </section>

        <section className="intro-strip" id="story">
          <Sparkles size={17} strokeWidth={1.4} />
          <p>A curated world of <em>good things</em> for the way you live.</p>
          <span>Thoughtfully found. Made to be loved.</span>
        </section>

        <section className="section category-section" id="categories">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A LITTLE SOMETHING FOR EVERY YOU</p>
              <h2>Find your <em>something.</em></h2>
            </div>
            <button className="text-link" type="button" onClick={() => navigate("/shop")}>
              Explore all categories <ArrowRight size={16} />
            </button>
          </div>
          <div className="category-grid">
            {categories.map((category, index) => (
              <button
                className="category-card"
                type="button"
                key={category.name}
                onClick={() => navigate(`/collections/${category.name.toLowerCase()}`)}
              >
                <img src={category.image} alt="" loading="lazy" />
                <span className="category-number">0{index + 1}</span>
                <span className="category-info">
                  <span><strong>{category.name}</strong><small>{category.count}</small></span>
                  <span className="circle-arrow"><ArrowUpRight size={16} /></span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section shop-inner">
            <div className="section-heading shop-heading">
              <div>
                <p className="eyebrow">{showWishlist ? "YOUR LITTLE COLLECTION" : "GOOD THINGS, JUST IN"}</p>
                <h2>{showWishlist ? <>Your saved <em>favorites.</em></> : search ? <>A little something for <em>“{search}”</em></> : <>The latest & <em>greatest.</em></>}</h2>
              </div>
              <div className="shop-controls">
                <div className="filter-tabs" aria-label="Filter products by category">
                  {["All", "Fashion", "Bags", "Beauty", "Jewelry"].map((category) => (
                    <button
                      className={activeCategory === category ? "active" : ""}
                      type="button"
                      key={category}
                      onClick={() => { setActiveCategory(category); setShowWishlist(false); }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <div className="carousel-arrows">
                  <button type="button" aria-label="Previous products" onClick={() => setActiveCategory("All")}><ArrowLeft size={16} /></button>
                  <button type="button" aria-label="Next products" onClick={() => setActiveCategory("All")}><ArrowRight size={16} /></button>
                </div>
              </div>
            </div>
            {visibleProducts.length ? (
              <div className="product-grid">
                {visibleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    wishlist={wishlist}
                    onSelect={setSelectedProduct}
                    onToggleWishlist={toggleWishlist}
                    onAdd={addToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-products">
                <Search size={24} />
                <p>{showWishlist ? "Your favorites will feel right at home here." : "No pieces found just yet."}</p>
                <button type="button" onClick={() => { setSearch(""); setActiveCategory("All"); setShowWishlist(false); navigate("/shop"); }}>Explore the edit</button>
              </div>
            )}
            <div className="view-all-wrap">
              <button className="button button-outline" type="button" onClick={() => { setActiveCategory("All"); setSearch(""); setShowWishlist(false); navigate("/shop"); }}>
                View the full edit <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        <section className="campaign">
          <div className="campaign-image">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=85" alt="Sunlit boutique with a thoughtfully selected collection" loading="lazy" />
          </div>
          <div className="campaign-copy">
            <p className="eyebrow light-eyebrow"><span /> A SMALL CELEBRATION OF THE EVERYDAY</p>
            <h2>Make room for<br /><em>the good stuff.</em></h2>
            <p>Find pieces that feel like you. Meet the independent makers and considered brands making everyday a little more special.</p>
            <a className="button button-light" href="/shop" onClick={(event) => { event.preventDefault(); navigate("/shop"); }}>Meet the collection <ArrowRight size={16} /></a>
            <span className="campaign-flower" aria-hidden="true">✳</span>
          </div>
        </section>

        <section className="values-section">
          <div className="section values-inner">
            <div className="values-heading">
              <p className="eyebrow">THE LUXORA DIFFERENCE</p>
              <h2>Considered in<br /><em>every way.</em></h2>
            </div>
            <div className="value-item">
              <span className="value-icon"><Sparkles size={19} /></span>
              <h3>Curated with care</h3>
              <p>Good design, thoughtful makers, and pieces worth keeping.</p>
            </div>
            <div className="value-item">
              <span className="value-icon"><Truck size={19} /></span>
              <h3>Lovely delivery</h3>
              <p>A little joy at your door, with complimentary delivery over ₦75,000.</p>
            </div>
            <div className="value-item">
              <span className="value-icon"><Heart size={19} /></span>
              <h3>Here for you</h3>
              <p>Real people, ready to help make every order feel just right.</p>
            </div>
          </div>
        </section>

        <section className="newsletter" id="journal">
          <div className="newsletter-content">
            <span className="newsletter-spark">✳</span>
            <p className="eyebrow">A NOTE FROM US, NOW AND THEN</p>
            <h2>A little more <em>lovely</em> in your inbox.</h2>
            <p className="newsletter-copy">New finds, good stories, and first dibs on the things you’ll love. Never too much, always worth a read.</p>
            {subscribed ? (
              <p className="subscribe-success"><Check size={17} /> Thanks for your interest. Newsletter sign-up is coming soon.</p>
            ) : (
              <form className="subscribe-form" onSubmit={subscribe}>
                <label className="visually-hidden" htmlFor="newsletter-email">Your email address</label>
                <input id="newsletter-email" type="email" required placeholder="Your email address" value={email} onChange={(event) => setEmail(event.target.value)} />
                <button type="submit">Count me in <ArrowRight size={15} /></button>
              </form>
            )}
            <small>By signing up, you agree to our privacy policy. Unsubscribe whenever.</small>
          </div>
        </section>
          </>
        )}
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="wordmark footer-wordmark" href="/" onClick={(event) => { event.preventDefault(); navigate("/"); }}>LUXORA<span>®</span><small>THE EVERYDAY EDIT</small></a>
            <p>A considered little corner of the internet for finding things you’ll love, made by people who care.</p>
            <a className="social-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Visit Instagram"><Instagram size={18} /></a>
          </div>
          <div className="footer-column">
            <h3>Come on in</h3>
            <a href="/shop" onClick={(event) => { event.preventDefault(); navigate("/shop"); }}>Shop all</a>
            <a href="/collections/fashion" onClick={(event) => { event.preventDefault(); navigate("/collections/fashion"); }}>Fashion</a>
            <a href="/collections/bags" onClick={(event) => { event.preventDefault(); navigate("/collections/bags"); }}>Bags & accessories</a>
            <a href="/collections/beauty" onClick={(event) => { event.preventDefault(); navigate("/collections/beauty"); }}>Beauty & self-care</a>
            <a href="/collections/jewelry" onClick={(event) => { event.preventDefault(); navigate("/collections/jewelry"); }}>Jewelry</a>
          </div>
          <div className="footer-column">
            <h3>Here to help</h3>
            <a href="/delivery" onClick={(event) => { event.preventDefault(); navigate("/delivery"); }}>Delivery & returns</a>
            <a href="/faqs" onClick={(event) => { event.preventDefault(); navigate("/faqs"); }}>FAQs</a>
            <a href="/contact" onClick={(event) => { event.preventDefault(); navigate("/contact"); }}>Get in touch</a>
            <a href="/account" onClick={(event) => { event.preventDefault(); navigate("/account"); }}>Your account</a>
          </div>
          <div className="footer-column">
            <h3>The little details</h3>
            <a href="/our-story" onClick={(event) => { event.preventDefault(); navigate("/our-story"); }}>Our story</a>
            <a href="/journal" onClick={(event) => { event.preventDefault(); navigate("/journal"); }}>The journal</a>
            <a href="/privacy" onClick={(event) => { event.preventDefault(); navigate("/privacy"); }}>Privacy policy</a>
            <a href="/terms" onClick={(event) => { event.preventDefault(); navigate("/terms"); }}>Terms & conditions</a>
          </div>
        </div>
        <div className="footer-bottom" id="footer">
          <span>© {new Date().getFullYear()} Luxora. Made with care.</span>
          <span>Thoughtfully found, made to be loved.</span>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top <ArrowUpRight size={14} /></button>
        </div>
      </footer>

      {cartOpen && (
        <div className="overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}>
          <aside className="side-drawer" aria-label="Shopping bag">
            <div className="drawer-header">
              <div><p className="eyebrow">A GOOD CHOICE</p><h2>Your bag <span>({cartCount})</span></h2></div>
              <button className="icon-button" type="button" aria-label="Close bag" onClick={() => setCartOpen(false)}><X size={21} /></button>
            </div>
            {cartCount ? (
              <>
                <div className="cart-items">
                  {products.filter((product) => cart[product.id]).map((product) => (
                    <div className="cart-item" key={product.id}>
                      <img src={product.image} alt="" />
                      <div className="cart-item-info">
                        <strong>{product.name}</strong><span>{formatPrice(product.price)}</span>
                        <div className="quantity-control">
                          <button type="button" aria-label={`Remove one ${product.name}`} onClick={() => updateQuantity(product.id, -1)}><Minus size={13} /></button>
                          <span>{cart[product.id]}</span>
                          <button type="button" aria-label={`Add one ${product.name}`} onClick={() => updateQuantity(product.id, 1)}><Plus size={13} /></button>
                        </div>
                      </div>
                      <button className="remove-item" type="button" aria-label={`Remove ${product.name}`} onClick={() => setCart((current) => { const next = { ...current }; delete next[product.id]; return next; })}><X size={15} /></button>
                    </div>
                  ))}
                </div>
                <div className="drawer-summary">
                  <div><span>Subtotal</span><strong>{formatPrice(cartTotal)}</strong></div>
                  <p>Delivery is calculated at checkout.</p>
                  <button className="button button-dark" type="button" disabled>Checkout coming soon</button>
                  <button className="continue-shopping" type="button" onClick={() => setCartOpen(false)}>Keep looking around</button>
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <ShoppingBag size={30} strokeWidth={1.3} />
                <h3>It’s a little quiet in here.</h3>
                <p>Your next favorite thing is waiting to be found.</p>
                <button className="button button-dark" type="button" onClick={() => setCartOpen(false)}>Explore the edit <ArrowRight size={16} /></button>
              </div>
            )}
          </aside>
        </div>
      )}

      {selectedProduct && (
        <div className="overlay modal-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProduct(null); }}>
          <section className="product-modal" role="dialog" aria-modal="true" aria-label={selectedProduct.name}>
            <button className="modal-close icon-button" type="button" aria-label="Close product details" onClick={() => setSelectedProduct(null)}><X size={21} /></button>
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <div className="modal-info">
              <p className="eyebrow">{selectedProduct.category} · {selectedProduct.color}</p>
              <h2>{selectedProduct.name}</h2>
              <div className="modal-rating"><Star size={14} fill="currentColor" /> {selectedProduct.rating} <span>· A little customer favorite</span></div>
              <p className="modal-description">{selectedProduct.detail}</p>
              <div className="modal-price">{formatPrice(selectedProduct.price)} {selectedProduct.oldPrice && <del>{formatPrice(selectedProduct.oldPrice)}</del>}</div>
              <button className="button button-dark modal-add" type="button" onClick={() => addToCart(selectedProduct.id)}>Add to bag <ShoppingBag size={16} /></button>
              <p className="delivery-note"><Truck size={15} /> Complimentary delivery over ₦75,000</p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
