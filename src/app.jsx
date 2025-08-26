import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, Heart, Search, Menu, X,
  Truck, CheckCircle, Package, SlidersHorizontal
} from "lucide-react";

/* ---- Data ---- */
const CATEGORIES = [
  "All","Special Offers","Ready to Wear","Luxury Formal","Luxury Pret",
  "Kids","Unstitched","Stitched","Menswear","Jewelry","Accessories"
];

const PRODUCTS = [
  { id: 1, name: "Embroidered Cotton Kurta", price: 40, category: "Menswear", img: "https://images.unsplash.com/photo-1562158070-0eb2ee9fefbd?q=80&w=800&auto=format&fit=crop" },
  { id: 2, name: "3 Piece Embroidered Lawn Suit", price: 63, category: "Ready to Wear", img: "https://images.unsplash.com/photo-1605731414532-6b26976cc153?q=80&w=800&auto=format&fit=crop" },
  { id: 3, name: "2 Piece Printed Linen Suit", price: 23, category: "Ready to Wear", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop" },
  { id: 4, name: "Luxury Formal Set – Saffron", price: 120, category: "Luxury Formal", img: "https://images.unsplash.com/photo-1582582429416-0d7a17b74eac?q=80&w=800&auto=format&fit=crop" },
  { id: 5, name: "Kids Festive Frock", price: 35, category: "Kids", img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop" },
  { id: 6, name: "Handcrafted Jhumka", price: 28, category: "Jewelry", img: "https://images.unsplash.com/photo-1617038260897-43fa7f7e1aa2?q=80&w=800&auto=format&fit=crop" },
  { id: 7, name: "Silk Dupatta – Rose Gold", price: 19, category: "Accessories", img: "https://images.unsplash.com/photo-1614850715733-94c6d2d2293d?q=80&w=800&auto=format&fit=crop" },
  { id: 8, name: "Unstitched Lawn – Emerald", price: 30, category: "Unstitched", img: "https://images.unsplash.com/photo-1582738412140-48e0d56cf7a5?q=80&w=800&auto=format&fit=crop" },
  { id: 9, name: "Stitched Kurti – Azure", price: 42, category: "Stitched", img: "https://images.unsplash.com/photo-1582582429416-0d7a17b74eac?q=80&w=800&auto=format&fit=crop" },
];

const FLOWER_BG =
  "bg-[radial-gradient(ellipse_at_top_right,rgba(236,72,153,0.15),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.12),transparent_40%)]";

/* ---- App ---- */
export default function App() {
  const [page, setPage] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("best");

  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(
      p =>
        (category === "All" ? true : p.category === category) &&
        p.name.toLowerCase().includes(query.toLowerCase())
    );
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [query, category, sort]);

  const toggleWish = (id) =>
    setWishlist(w => (w.includes(id) ? w.filter(x => x !== id) : [...w, id]));
  const addToCart = (id) => setCart(c => [...c, id]);

  return (
    <div className={`min-h-screen ${FLOWER_BG}`}>
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="md:hidden p-2 rounded-full hover:bg-gray-100" onClick={() => setMobileOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <div onClick={() => setPage("home")} className="text-2xl font-extrabold text-pink-700 cursor-pointer">
              Liyaana&apos;s Couture
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm">
            <a className="hover:text-pink-700 cursor-pointer" onClick={() => setPage("home")}>Home</a>
            <a className="hover:text-pink-700 cursor-pointer" onClick={() => setPage("track")}>Track Order</a>
            <a className="hover:text-pink-700" href="#newsletter">Newsletter</a>
            <a className="hover:text-pink-700" href="#contact">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 border rounded-full px-3 py-1.5 bg-white">
              <Search className="h-4 w-4" />
              <input
                className="outline-none text-sm w-48"
                placeholder="Search outfits"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100" onClick={() => setPage("track")}>
              <Truck className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100" onClick={() => setPage("home")}>
              <Heart className={`h-5 w-5 ${wishlist.length ? "fill-pink-500 text-pink-500" : ""}`} />
            </button>
            <div className="relative p-2 rounded-full hover:bg-gray-100">
              <ShoppingBag className="h-5 w-5" />
              {cart.length > 0 && <span className="badge">{cart.length}</span>}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              className="absolute left-0 top-0 bottom-0 w-72 bg-white p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold">Menu</div>
                <button onClick={() => setMobileOpen(false)}><X className="w-5 h-5"/></button>
              </div>
              <div className="flex flex-col gap-3 mb-4">
                <button className="text-left" onClick={() => {setPage("home"); setMobileOpen(false);}}>Home</button>
                <button className="text-left" onClick={() => {setPage("track"); setMobileOpen(false);}}>Track Order</button>
                <a href="#newsletter" onClick={() => setMobileOpen(false)}>Newsletter</a>
                <a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a>
              </div>
              <div className="pt-4 border-t">
                <div className="font-semibold mb-2">Categories</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {CATEGORIES.map(c => (
                    <span key={c} className="px-3 py-1 rounded-full bg-pink-50 text-pink-700">{c}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {page === "home" ? (
          <motion.main key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <Hero />
            <Toolbar
              category={category} setCategory={setCategory}
              sort={sort} setSort={setSort}
              setQuery={setQuery}
            />
            <ProductGrid
              products={filtered}
              wishlist={wishlist}
              toggleWish={toggleWish}
              addToCart={addToCart}
            />
            <Newsletter />
            <ContactSection />
            <Footer />
          </motion.main>
        ) : (
          <motion.main key="track" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <OrderTracking onBack={() => setPage("home")} />
            <ContactSection />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---- Sections ---- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* floating flower */}
      <motion.img
        src="https://images.unsplash.com/photo-1496062031456-07b8f162a322?q=80&w=1200&auto=format&fit=crop"
        alt="floral"
        className="absolute -top-12 -right-12 w-72 opacity-30 rotate-12 pointer-events-none select-none"
        animate={{ y: [0, 10, 0], rotate: [12, 15, 12] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-pink-700 leading-tight">Bloom with Elegance</h2>
          <p className="mt-4 text-gray-600 max-w-prose">
            Discover hand-finished designs crafted with love. From everyday pret to luxury formals,
            Liyaana&apos;s Couture is where your style blossoms.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#shop" className="px-6 py-2 rounded-full bg-pink-600 hover:bg-pink-700 text-white">Shop New Arrivals</a>
            <a href="#filters" className="px-6 py-2 rounded-full border hover:bg-gray-50">Browse Categories</a>
          </div>
          <div className="mt-4 flex gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1"><Truck className="h-4 w-4"/> Fast shipping</span>
            <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4"/> Secure checkout</span>
          </div>
        </div>
        <motion.div initial={{ scale: .95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} className="relative">
          <img
            src="https://images.unsplash.com/photo-1520975682031-e3b4babc6ecc?q=80&w=1200&auto=format&fit=crop"
            alt="hero outfit"
            className="rounded-3xl shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}

function Toolbar({ category, setCategory, sort, setSort, setQuery }) {
  return (
    <div id="filters" className="mx-auto max-w-7xl px-4 md:px-8 py-6 flex flex-wrap items-center gap-3 justify-between">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4" />
        <select
          className="rounded-full border px-4 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          className="rounded-full border px-4 py-2"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="best">Best selling</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
      <div className="flex items-center gap-2 border rounded-full px-3 py-1.5 bg-white">
        <Search className="h-4 w-4" />
        <input className="outline-none text-sm w-56" placeholder="Search products" onChange={(e) => setQuery(e.target.value)} />
      </div>
    </div>
  );
}

function ProductGrid({ products, wishlist, toggleWish, addToCart }) {
  return (
    <section id="shop" className="mx-auto max-w-7xl px-4 md:px-8 pb-14 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {products.map(p => (
        <motion.div key={p.id} whileHover={{ y: -6 }} className="card overflow-hidden">
          <div className="relative">
            <img src={p.img} alt={p.name} className="w-full h-80 object-cover" />
            <button
              className="absolute top-3 right-3 rounded-full bg-white/90 p-2 hover:bg-white"
              onClick={() => toggleWish(p.id)}
            >
              <Heart className={`h-5 w-5 ${wishlist.includes(p.id) ? "fill-pink-500 text-pink-500" : ""}`} />
            </button>
            <span className="absolute bottom-3 left-3 bg-white/90 text-gray-800 text-xs px-2 py-1 rounded-full">{p.category}</span>
          </div>
          <div className="p-5 text-center">
            <h3 className="font-semibold text-lg leading-tight">{p.name}</h3>
            <p className="text-pink-600 font-bold mt-1">US ${p.price}</p>
            <button onClick={() => addToCart(p.id)} className="mt-3 w-full rounded-full bg-pink-600 hover:bg-pink-700 text-white py-2">
              Add to Cart
            </button>
          </div>
        </motion.div>
      ))}
    </section>
  );
}

function Newsletter() {
  return (
    <section id="newsletter" className="bg-pink-50/70 py-14 mt-2">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h3 className="text-2xl font-bold text-pink-700">Sign Up for Our Newsletter</h3>
        <p className="text-gray-600 mt-2">Be the first to know about new collections, sales, and exclusive drops.</p>
        <div className="mt-5 flex justify-center">
          <input type="email" placeholder="Enter your email" className="rounded-l-full border px-4 py-2 w-72" />
          <button className="rounded-r-full bg-pink-600 hover:bg-pink-700 text-white px-4">Subscribe</button>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = () => {
    const to = "lianaskhichor@gmail.com";
    const subject = encodeURIComponent(`New inquiry from ${name || "Website Visitor"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-16">
      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
        <div className="card p-6">
          <h3 className="text-2xl font-bold text-pink-700 mb-1">Get in touch</h3>
          <p className="text-gray-600 mb-4">We usually reply within 24 hours.</p>
          <div className="space-y-3">
            <input className="w-full border rounded-xl p-3" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
            <input className="w-full border rounded-xl p-3" placeholder="Your email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
            <textarea className="w-full border rounded-xl p-3 min-h-[120px]" placeholder="Message" value={message} onChange={e=>setMessage(e.target.value)} />
            <button className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-5 py-2" onClick={submit}>Send Message</button>
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <h4 className="font-semibold">Contact Details</h4>
          <p>Email: <a className="text-pink-700" href="mailto:lianaskhichor@gmail.com">lianaskhichor@gmail.com</a></p>
          <p>WhatsApp: <span className="font-medium">+92 300 1234567</span> (demo)</p>
          <p>Hours: Mon–Sat, 10am – 7pm PKT</p>
          <div className="pt-4">
            <h4 className="font-semibold">Follow</h4>
            <p>Instagram · Facebook · TikTok</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function OrderTracking({ onBack }) {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);

  const demo = {
    LYA1001: { stage: 2, history: ["Order placed","Packed","Shipped","Out for delivery","Delivered"] },
    LYA2042: { stage: 1, history: ["Order placed","Packed","Shipped","Out for delivery","Delivered"] }
  };

  const lookup = () => {
    const key = orderId.trim().toUpperCase();
    if (demo[key]) setResult({ id: key, ...demo[key] });
    else setResult({ id: key, stage: -1, history: [] });
  };

  return (
    <section className="max-w-2xl mx-auto my-14 px-4">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="rounded-full border px-3 py-1.5 hover:bg-gray-50"><X className="h-4 w-4 inline mr-1"/>Back</button>
        <h2 className="text-2xl font-bold text-pink-700">Track Your Order</h2>
      </div>
      <div className="card p-6">
        <div className="grid sm:grid-cols-2 gap-3">
          <input placeholder="Order ID (e.g. LYA1001)" value={orderId} onChange={(e) => setOrderId(e.target.value)} className="border rounded-xl p-3"/>
          <input type="email" placeholder="Email used at checkout" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded-xl p-3"/>
        </div>
        <button className="mt-4 bg-pink-600 hover:bg-pink-700 text-white rounded-full px-5 py-2" onClick={lookup}>Track Order</button>

        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
              {result.stage === -1 ? (
                <p className="text-red-600">We couldn't find an order with ID <b>{result.id}</b>. Please check the ID and email.</p>
              ) : (
                <div>
                  <p className="text-gray-700">Order <b>{result.id}</b> — current status:</p>
                  <div className="mt-4 grid grid-cols-5 gap-2">
                    {result.history.map((label, i) => (
                      <div key={label} className={`text-center p-3 rounded-2xl border ${i <= result.stage ? "bg-green-50 border-green-300" : "bg-gray-50"}`}>
                        <div className="mb-1 flex justify-center">
                          {i === 0 && <Package className="h-4 w-4"/>}
                          {i === 1 && <CheckCircle className="h-4 w-4"/>}
                          {i === 2 && <Truck className="h-4 w-4"/>}
                          {i === 3 && <Truck className="h-4 w-4"/>}
                          {i === 4 && <CheckCircle className="h-4 w-4"/>}
                        </div>
                        <span className="text-xs font-medium">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t py-10 mt-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <h4 className="font-bold text-pink-700 mb-3">Liyaana&apos;s Couture</h4>
          <p>Timeless silhouettes. Contemporary flair. Crafted with care.</p>
        </div>
        <div>
          <h5 className="font-semibold mb-2">Shop</h5>
          <ul className="space-y-1">
            {CATEGORIES.slice(1).map(c => <li key={c} className="hover:text-pink-700 cursor-pointer">{c}</li>)}
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-2">Customer Care</h5>
          <ul className="space-y-1">
            <li>Shipping & Delivery</li>
            <li>Returns & Exchanges</li>
            <li>Size Guide</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-2">Get in touch</h5>
          <p>Email: <a className="text-pink-700" href="mailto:lianaskhichor@gmail.com">lianaskhichor@gmail.com</a></p>
          <p className="mt-2">WhatsApp: +92 300 1234567 (demo)</p>
        </div>
      </div>
      <p className="text-center text-xs text-gray-500 mt-6">© {new Date().getFullYear()} Liyaana&apos;s Couture. All rights reserved.</p>
    </footer>
  );
}
