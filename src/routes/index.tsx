import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  BookOpen,
  Check,
  ChevronDown,
  ClipboardList,
  CreditCard,
  Heart,
  LayoutDashboard,
  Leaf,
  Menu,
  Package,
  Plus,
  Search,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Store,
  Tag,
  TrendingUp,
  Truck,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/lib/guidance-content";
import {
  demoOrders,
  demoProducts,
  demoReports,
  demoSellers,
  IMAGES,
  REGISTRATION_FEE,
} from "@/lib/demo-data";
import type { OrderStatus, Product, ProductStatus } from "@/lib/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HomeHub — Discover local makers" },
      {
        name: "description",
        content:
          "Shop thoughtful products from small Indian businesses and give your own homegrown brand a place to grow.",
      },
      { property: "og:title", content: "HomeHub — Discover local makers" },
      {
        property: "og:description",
        content: "A trusted marketplace for India's small and local sellers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomeHub,
});

type View = "discover" | "orders" | "seller" | "admin" | "guidance";
type RoleView = "BUYER" | "SELLER" | "ADMIN";

const orderLabels: Record<OrderStatus, string> = {
  NEW: "New",
  CONFIRMED: "Confirmed",
  PACKED: "Packed",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

const statusLabels: Record<ProductStatus, string> = {
  PENDING_PAYMENT: "Payment pending",
  PAYMENT_SUCCESS: "Payment received",
  PENDING_REVIEW: "Awaiting review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  CHANGES_REQUIRED: "Changes required",
  ACTIVE: "Live",
  OUT_OF_STOCK: "Out of stock",
  UNAVAILABLE: "Unavailable",
};

const formatPrice = (value: number) => `₹${value.toLocaleString("en-IN")}`;

function HomeHub() {
  const [view, setView] = useState<View>("discover");
  const [role, setRole] = useState<RoleView>("BUYER");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [notice, setNotice] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const cartProducts = demoProducts.filter((product) => cart[product.id]);
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const cartTotal = cartProducts.reduce(
    (sum, product) => sum + product.price * (cart[product.id] ?? 0),
    0,
  );

  const filteredProducts = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return demoProducts.filter((product) => {
      const matchesSearch =
        !needle ||
        [product.name, product.description, product.category, ...product.tags]
          .join(" ")
          .toLowerCase()
          .includes(needle);
      const matchesCategory = category === "All" || product.category === category;
      return product.status === "ACTIVE" && product.stock > 0 && matchesSearch && matchesCategory;
    });
  }, [category, search]);

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2800);
  }

  function addToCart(product: Product) {
    setCart((current) => ({ ...current, [product.id]: (current[product.id] ?? 0) + 1 }));
    showNotice(`${product.name} added to your bag`);
  }

  function navigate(nextView: View) {
    setView(nextView);
    setMobileMenu(false);
    setSelectedProduct(null);
  }

  function changeRole(nextRole: RoleView) {
    setRole(nextRole);
    navigate(nextRole === "BUYER" ? "discover" : nextRole === "SELLER" ? "seller" : "admin");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" className="h-auto gap-2 p-0 hover:bg-transparent" onClick={() => navigate("discover")}>
            <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-sm">
              <Store className="size-5" />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">HomeHub</span>
          </Button>

          <nav className="hidden items-center gap-1 md:flex">
            <NavButton active={view === "discover"} onClick={() => navigate("discover")}>
              Discover
            </NavButton>
            <NavButton active={view === "orders"} onClick={() => navigate("orders")}>
              My orders
            </NavButton>
            <NavButton active={view === "guidance"} onClick={() => navigate("guidance")}>
              Seller guidance
            </NavButton>
          </nav>

          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="icon" className="relative" aria-label="Notifications" onClick={() => showNotice("You have 3 unread updates")}>
              <Bell />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-accent" />
            </Button>
            <Button variant="outline" size="icon" className="relative" aria-label="Shopping bag" onClick={() => setShowCart(true)}>
              <ShoppingBag />
              {cartCount > 0 && <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">{cartCount}</span>}
            </Button>
            <Button variant="outline" className="hidden gap-2 sm:flex" onClick={() => changeRole(role === "BUYER" ? "SELLER" : role === "SELLER" ? "ADMIN" : "BUYER")}>
              <UserRound className="size-4" />
              {role === "BUYER" ? "Nikhil Sharma" : role === "SELLER" ? "Rutuja's store" : "Admin"}
              <ChevronDown className="size-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" onClick={() => setMobileMenu((current) => !current)}>
              <Menu />
            </Button>
          </div>
        </div>
        {mobileMenu && (
          <div className="border-t border-border/70 px-4 py-3 md:hidden">
            <div className="grid gap-1">
              <NavButton active={view === "discover"} onClick={() => navigate("discover")}>Discover</NavButton>
              <NavButton active={view === "orders"} onClick={() => navigate("orders")}>My orders</NavButton>
              <NavButton active={view === "guidance"} onClick={() => navigate("guidance")}>Seller guidance</NavButton>
              <NavButton active={view === "seller"} onClick={() => navigate("seller")}>Seller workspace</NavButton>
            </div>
          </div>
        )}
      </header>

      {notice && (
        <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm text-background shadow-lift">
          <Check className="size-4 text-success" /> {notice}
        </div>
      )}

      <main>
        {view === "discover" && (
          <DiscoverView
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            products={filteredProducts}
            onProduct={setSelectedProduct}
            onAdd={addToCart}
            onSeller={() => navigate("seller")}
          />
        )}
        {view === "orders" && <OrdersView onContinue={() => navigate("discover")} />}
        {view === "guidance" && <GuidanceView onStart={() => navigate("seller")} />}
        {view === "seller" && <SellerView onNotice={showNotice} />}
        {view === "admin" && <AdminView onNotice={showNotice} />}
      </main>

      {selectedProduct && <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={addToCart} />}
      {showCart && (
        <CartPanel
          products={cartProducts}
          cart={cart}
          total={cartTotal}
          onClose={() => setShowCart(false)}
          onChange={(id, amount) => setCart((current) => ({ ...current, [id]: Math.max(0, amount) }))}
          onCheckout={() => {
            setShowCart(false);
            setCart({});
            showNotice("Order placed — we will keep you posted");
          }}
        />
      )}
    </div>
  );
}

function NavButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return <Button variant="ghost" onClick={onClick} className={active ? "bg-secondary text-primary" : "text-muted-foreground"}>{children}</Button>;
}

function DiscoverView({
  search,
  setSearch,
  category,
  setCategory,
  products,
  onProduct,
  onAdd,
  onSeller,
}: {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  products: Product[];
  onProduct: (product: Product) => void;
  onAdd: (product: Product) => void;
  onSeller: () => void;
}) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.08fr_0.92fr] md:py-20 lg:px-8">
          <div className="relative z-10">
            <Badge variant="secondary" className="mb-5 gap-1.5 px-3 py-1 text-primary"><Sparkles className="size-3.5" /> Made close to home</Badge>
            <h1 className="max-w-xl font-display text-5xl leading-[0.98] tracking-tight text-foreground sm:text-6xl">Good things, <span className="text-gradient-brand">made small.</span></h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">Find thoughtful products from people who make them with care — and help a small business take its next step.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}>Explore the marketplace <ArrowRight /></Button>
              <Button size="lg" variant="outline" onClick={onSeller}>I sell something <Store /></Button>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <span><strong className="text-foreground">120+</strong> local makers</span><span className="h-4 w-px bg-border" /><span><strong className="text-foreground">4.8/5</strong> average rating</span>
            </div>
          </div>
          <div className="relative min-h-[310px] overflow-hidden rounded-3xl bg-gradient-brand p-5 shadow-lift sm:min-h-[390px]">
            <div className="absolute -right-12 -top-12 size-48 rounded-full bg-background/20 blur-2xl" />
            <div className="absolute bottom-0 left-0 h-32 w-full bg-foreground/10" />
            <img src={IMAGES.giftbox} alt="Handmade gift hamper" className="absolute bottom-0 left-1/2 z-10 h-[82%] w-[78%] -translate-x-1/2 object-contain drop-shadow-2xl" />
            <div className="absolute left-5 top-5 z-20 rounded-2xl bg-background/85 px-4 py-3 backdrop-blur-sm"><p className="text-xs font-medium text-muted-foreground">Maker spotlight</p><p className="mt-0.5 font-semibold">Handmade Gift Corner</p><p className="text-xs text-muted-foreground">Hyderabad · 4.9 rating</p></div>
            <div className="absolute bottom-5 right-5 z-20 rounded-2xl bg-background/90 px-4 py-3 text-right backdrop-blur-sm"><p className="text-xs text-muted-foreground">Starting from</p><p className="font-display text-xl font-semibold">₹199</p></div>
          </div>
        </div>
      </section>

      <section id="shop" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-medium text-primary">The marketplace</p><h2 className="mt-1 font-display text-3xl tracking-tight">Made by someone, for someone</h2></div><p className="max-w-sm text-sm text-muted-foreground sm:text-right">Every order supports a small business, a maker, or a family building something of their own.</p></div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search candles, plants, gifts..." className="h-11 pl-10" /></div><div className="flex gap-2 overflow-x-auto pb-1">{["All", ...CATEGORIES].map((item) => <Button key={item} variant={category === item ? "default" : "outline"} size="sm" className="shrink-0" onClick={() => setCategory(item)}>{item}</Button>)}</div></div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => <ProductCard key={product.id} product={product} onOpen={() => onProduct(product)} onAdd={() => onAdd(product)} />)}
        </div>
        {products.length === 0 && <div className="py-20 text-center"><Search className="mx-auto size-8 text-muted-foreground" /><h3 className="mt-4 font-display text-2xl">Nothing matched that search</h3><p className="mt-2 text-sm text-muted-foreground">Try a different word or browse all categories.</p><Button className="mt-5" variant="outline" onClick={() => { setSearch(""); setCategory("All"); }}>Clear filters</Button></div>}
      </section>
      <section className="border-y border-border/60 bg-secondary/35"><div className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8"><TrustItem icon={<Heart />} title="People-first shopping" text="Meet the makers behind what you buy." /><TrustItem icon={<Package />} title="Small-batch quality" text="Thoughtfully made, never mass produced." /><TrustItem icon={<Truck />} title="Clear delivery" text="Know when your order will arrive." /></div></section>
      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"><p>© 2026 HomeHub</p><p>Built for small businesses, loved by local shoppers.</p></footer>
    </>
  );
}

function ProductCard({ product, onOpen, onAdd }: { product: Product; onOpen: () => void; onAdd: () => void }) {
  return <article className="group overflow-hidden rounded-2xl border border-border/80 bg-card transition-shadow hover:shadow-lift"><div className="relative aspect-[1.08] overflow-hidden bg-secondary"><Button variant="ghost" className="block h-full w-full rounded-none p-0 hover:bg-transparent" aria-label={`View ${product.name}`} onClick={onOpen}><img src={IMAGES[product.image]} alt={product.name} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" /></Button><Button variant="outline" size="icon" className="absolute right-3 top-3 bg-background/85" aria-label="Save product"><Heart className="size-4" /></Button></div><div className="p-4"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-medium text-primary">{product.category}</p><h3 className="mt-1 line-clamp-1 font-semibold">{product.name}</h3></div><span className="whitespace-nowrap font-semibold">{formatPrice(product.price)}</span></div><p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">{product.description}</p><div className="mt-4 flex items-center justify-between gap-2"><span className="flex items-center gap-1 text-xs text-muted-foreground"><span className="text-warning">★</span> {product.sellerId === "s-2" ? "4.9" : "4.8"} · {demoSellers.find((seller) => seller.id === product.sellerId)?.storeName}</span><Button size="sm" onClick={onAdd}><Plus /> Add</Button></div></div></article>;
}

function TrustItem({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="flex gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background text-primary shadow-sm">{icon}</span><div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm text-muted-foreground">{text}</p></div></div>; }

function ProductDetail({ product, onClose, onAdd }: { product: Product; onClose: () => void; onAdd: (product: Product) => void }) {
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/35 p-0 backdrop-blur-sm sm:items-center sm:p-6"><div className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-card shadow-lift sm:rounded-3xl"><Button variant="outline" size="icon" className="absolute right-4 top-4 z-10 bg-background/90" aria-label="Close product details" onClick={onClose}><X /></Button><div className="grid md:grid-cols-2"><div className="aspect-square bg-secondary"><img src={IMAGES[product.image]} alt={product.name} className="size-full object-cover" /></div><div className="p-6 sm:p-8"><p className="text-sm font-medium text-primary">{product.category}</p><h2 className="mt-2 font-display text-3xl leading-tight">{product.name}</h2><p className="mt-3 font-display text-2xl font-semibold">{formatPrice(product.price)}</p><p className="mt-5 text-sm leading-6 text-muted-foreground">{product.description}</p><div className="mt-6 grid grid-cols-2 gap-3 border-y border-border py-4 text-sm"><div><p className="text-muted-foreground">Size</p><p className="mt-1 font-medium">{product.size}</p></div><div><p className="text-muted-foreground">Delivery</p><p className="mt-1 font-medium">{product.delivery.replace(" across India", "")}</p></div></div><div className="mt-6 flex gap-3"><Button className="flex-1" onClick={() => { onAdd(product); onClose(); }}>Add to bag <ShoppingBag /></Button><Button variant="outline" size="icon" aria-label="Save product"><Heart /></Button></div><p className="mt-4 text-xs text-muted-foreground">Sold by {demoSellers.find((seller) => seller.id === product.sellerId)?.storeName}</p></div></div></div></div>;
}

function CartPanel({ products, cart, total, onClose, onChange, onCheckout }: { products: Product[]; cart: Record<string, number>; total: number; onClose: () => void; onChange: (id: string, amount: number) => void; onCheckout: () => void }) {
  return <div className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm"><div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-card shadow-lift"><div className="flex items-center justify-between border-b border-border p-5"><div><h2 className="font-display text-2xl">Your bag</h2><p className="text-sm text-muted-foreground">{products.length ? `${Object.values(cart).reduce((sum, value) => sum + value, 0)} items` : "Nothing here yet"}</p></div><Button variant="outline" size="icon" aria-label="Close bag" onClick={onClose}><X /></Button></div><div className="flex-1 overflow-y-auto p-5">{products.length === 0 ? <div className="py-20 text-center"><ShoppingBag className="mx-auto size-10 text-muted-foreground" /><p className="mt-4 text-sm text-muted-foreground">Add something lovely from the marketplace.</p></div> : <div className="space-y-4">{products.map((product) => <div key={product.id} className="flex gap-3"><img src={IMAGES[product.image]} alt="" className="size-20 rounded-xl object-cover" /><div className="min-w-0 flex-1"><p className="line-clamp-1 font-medium">{product.name}</p><p className="mt-1 text-sm text-muted-foreground">{formatPrice(product.price)}</p><div className="mt-2 flex items-center gap-2"><Button variant="outline" size="icon" className="size-7" onClick={() => onChange(product.id, (cart[product.id] ?? 1) - 1)}>−</Button><span className="w-5 text-center text-sm">{cart[product.id]}</span><Button variant="outline" size="icon" className="size-7" onClick={() => onChange(product.id, (cart[product.id] ?? 0) + 1)}>+</Button></div></div><p className="font-semibold">{formatPrice(product.price * (cart[product.id] ?? 0))}</p></div>)}</div>}</div>{products.length > 0 && <div className="border-t border-border p-5"><div className="flex justify-between text-sm text-muted-foreground"><span>Subtotal</span><span>{formatPrice(total)}</span></div><div className="mt-2 flex justify-between text-sm text-muted-foreground"><span>Delivery</span><span className="text-success">Free</span></div><div className="mt-4 flex justify-between text-lg font-semibold"><span>Total</span><span>{formatPrice(total)}</span></div><Button className="mt-5 w-full" size="lg" onClick={onCheckout}>Checkout securely <CreditCard /></Button><p className="mt-3 text-center text-xs text-muted-foreground">Demo checkout · no payment is collected</p></div>}</div></div>;
}

function OrdersView({ onContinue }: { onContinue: () => void }) {
  return <PageFrame eyebrow="Your account" title="Orders" description="Keep an eye on your latest finds and the makers behind them."><div className="grid gap-4">{demoOrders.slice(0, 4).map((order) => <div key={order.id} className="rounded-2xl border border-border bg-card p-4 sm:p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs text-muted-foreground">Order {order.id} · {order.placedAt}</p><h3 className="mt-1 font-semibold">{order.items[0]?.name}{order.items.length > 1 ? ` + ${order.items.length - 1} more` : ""}</h3></div><Badge variant={order.status === "DELIVERED" ? "default" : "secondary"}>{orderLabels[order.status]}</Badge></div><div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4"><div className="flex items-center gap-2 text-sm text-muted-foreground"><Truck className="size-4 text-primary" />{order.status === "DELIVERED" ? "Delivered to Pune" : "On its way to Pune"}</div><span className="font-semibold">{formatPrice(order.amount + order.delivery)}</span></div></div>)}</div><div className="mt-8 rounded-2xl bg-secondary/60 p-6 sm:p-8"><div className="flex items-start gap-4"><span className="flex size-11 items-center justify-center rounded-xl bg-background text-primary"><Heart /></span><div><h3 className="font-display text-xl">Keep discovering small</h3><p className="mt-1 max-w-md text-sm leading-6 text-muted-foreground">Your next favourite thing might be made just around the corner.</p><Button className="mt-4" onClick={onContinue}>Browse marketplace <ArrowRight /></Button></div></div></div></PageFrame>;
}

function GuidanceView({ onStart }: { onStart: () => void }) {
  const topics = [{ icon: ClipboardList, title: "Get your basics in order", text: "A simple checklist for identity, address and banking details." }, { icon: Tag, title: "Understand your category", text: "See the registrations and product information that may apply." }, { icon: TrendingUp, title: "Build with confidence", text: "Practical next steps for moving beyond WhatsApp and Instagram." }];
  return <PageFrame eyebrow="For makers and sellers" title="Your next step starts here." description="HomeHub helps you turn a small idea or an existing local business into a storefront people can trust."><div className="grid gap-4 md:grid-cols-3">{topics.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl border border-border bg-card p-5"><span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary"><Icon className="size-5" /></span><h3 className="mt-5 font-display text-xl">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div>)}</div><div className="mt-8 grid gap-6 rounded-2xl bg-foreground p-6 text-background sm:grid-cols-[1fr_auto] sm:items-center sm:p-8"><div><p className="text-sm text-background/70">Ready when you are</p><h2 className="mt-1 font-display text-2xl">Open your HomeHub store</h2><p className="mt-2 max-w-lg text-sm leading-6 text-background/70">Register your details, add your first product, and reach buyers looking for something made with care.</p></div><Button variant="secondary" onClick={onStart}>Start seller setup <ArrowRight /></Button></div></PageFrame>;
}

function SellerView({ onNotice }: { onNotice: (message: string) => void }) {
  const seller = demoSellers[0];
  const products = demoProducts.filter((product) => product.sellerId === seller.id);
  const orders = demoOrders.filter((order) => order.sellerId === seller.id);
  const [showRegister, setShowRegister] = useState(false);
  const [tab, setTab] = useState<"overview" | "products" | "orders">("overview");
  const [registered, setRegistered] = useState(false);
  return <PageFrame eyebrow="Seller workspace" title={`Good morning, ${seller.storeName.split(" ")[0]}.`} description="Here is what is happening with your store today."><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Metric icon={<TrendingUp />} label="Store views" value="2,026" detail="+18% this month" /><Metric icon={<ShoppingBag />} label="Orders" value="18" detail="4 need attention" /><Metric icon={<CreditCard />} label="This month" value="₹12,480" detail="After delivery fees" /><Metric icon={<Bell />} label="Updates" value="3" detail="Unread notifications" /></div><div className="mt-8 flex gap-1 overflow-x-auto border-b border-border">{(["overview", "products", "orders"] as const).map((item) => <Button key={item} variant="ghost" className={`shrink-0 rounded-b-none ${tab === item ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`} onClick={() => setTab(item)}>{item[0].toUpperCase() + item.slice(1)}</Button>)}</div>{tab === "overview" && <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]"><div className="rounded-2xl border border-border bg-card p-5"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Store performance</p><h3 className="mt-1 font-display text-2xl">You are building momentum</h3></div><Badge variant="secondary" className="text-success">Growing</Badge></div><div className="mt-8 flex h-36 items-end gap-2">{[42, 55, 48, 68, 60, 79, 92, 86, 100, 84, 108, 118].map((height, index) => <div key={index} className="flex flex-1 flex-col justify-end gap-2"><div className="rounded-t-md bg-gradient-brand" style={{ height: `${height}px` }} /><span className="text-center text-[10px] text-muted-foreground">{index % 3 === 0 ? `W${index / 3 + 1}` : ""}</span></div>)}</div></div><div className="rounded-2xl border border-border bg-card p-5"><div className="flex items-start justify-between"><div><p className="text-sm text-muted-foreground">Your checklist</p><h3 className="mt-1 font-display text-2xl">Ready to grow?</h3></div><BookOpen className="size-5 text-primary" /></div><div className="mt-5 space-y-4"><CheckItem done text="Store profile completed" /><CheckItem done text="First product approved" /><CheckItem done={false} text="Add a second product" /><CheckItem done={false} text="Complete business guidance" /></div><Button variant="outline" className="mt-6 w-full" onClick={() => onNotice("Guidance checklist opened")}>View guidance <ArrowRight /></Button></div></div>}{tab === "products" && <ProductManager products={products} onRegister={() => setShowRegister(true)} onNotice={onNotice} />}{tab === "orders" && <SellerOrders orders={orders} />}{showRegister && <RegisterProduct onClose={() => setShowRegister(false)} onComplete={() => { setShowRegister(false); setRegistered(true); onNotice("Product registration started"); }} />}{registered && <div className="mt-5 rounded-xl border border-success/30 bg-success/10 p-4 text-sm text-success-foreground">Your new product is saved as a draft. Complete the ₹{REGISTRATION_FEE} registration payment to send it for review.</div>}</PageFrame>;
}

function PageFrame({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: React.ReactNode }) { return <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8"><div className="max-w-2xl"><p className="text-sm font-medium text-primary">{eyebrow}</p><h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">{title}</h1><p className="mt-4 text-base leading-7 text-muted-foreground">{description}</p></div><div className="mt-10">{children}</div></div>; }
function Metric({ icon, label, value, detail }: { icon: React.ReactNode; label: string; value: string; detail: string }) { return <div className="rounded-2xl border border-border bg-card p-4"><div className="flex items-center justify-between"><span className="flex size-9 items-center justify-center rounded-xl bg-secondary text-primary">{icon}</span><span className="text-xs text-success">{detail.includes("+") ? detail : ""}</span></div><p className="mt-5 text-sm text-muted-foreground">{label}</p><p className="mt-1 font-display text-2xl">{value}</p><p className="mt-1 text-xs text-muted-foreground">{detail}</p></div>; }
function CheckItem({ done, text }: { done: boolean; text: string }) { return <div className="flex items-center gap-3 text-sm"><span className={`flex size-5 items-center justify-center rounded-full ${done ? "bg-success text-success-foreground" : "border border-border text-transparent"}`}><Check className="size-3" /></span><span className={done ? "text-muted-foreground line-through" : ""}>{text}</span></div>; }
function ProductManager({ products, onRegister, onNotice }: { products: Product[]; onRegister: () => void; onNotice: (message: string) => void }) { return <div><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-display text-2xl">Your products</h2><p className="mt-1 text-sm text-muted-foreground">Manage listings and keep your catalogue fresh.</p></div><Button onClick={onRegister}><Plus /> Register product</Button></div><div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card"><div className="divide-y divide-border">{products.map((product) => <div key={product.id} className="flex flex-wrap items-center gap-4 p-4"><img src={IMAGES[product.image]} alt="" className="size-14 rounded-xl object-cover" /><div className="min-w-44 flex-1"><p className="font-medium">{product.name}</p><p className="mt-1 text-xs text-muted-foreground">{product.views.toLocaleString("en-IN")} views · {product.stock} in stock</p></div><p className="font-semibold">{formatPrice(product.price)}</p><Badge variant={product.status === "ACTIVE" ? "default" : "secondary"}>{statusLabels[product.status]}</Badge><Button variant="ghost" size="sm" onClick={() => onNotice("Product editor opened")}>Edit</Button></div>)}</div></div></div>; }
function SellerOrders({ orders }: { orders: typeof demoOrders }) { return <div><h2 className="font-display text-2xl">Recent orders</h2><div className="mt-5 grid gap-3">{orders.map((order) => <div key={order.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4"><div><p className="font-medium">{order.id} · {order.items[0]?.name}</p><p className="mt-1 text-sm text-muted-foreground">{order.items[0]?.quantity} item · {order.address.city} · {order.placedAt}</p></div><div className="flex items-center gap-4"><span className="font-semibold">{formatPrice(order.amount)}</span><Badge variant="secondary">{orderLabels[order.status]}</Badge></div></div>)}</div></div>; }
function RegisterProduct({ onClose, onComplete }: { onClose: () => void; onComplete: () => void }) { const [step, setStep] = useState(1); return <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/35 p-0 backdrop-blur-sm sm:items-center sm:p-6"><div className="w-full max-w-xl rounded-t-3xl bg-card p-6 shadow-lift sm:rounded-3xl sm:p-8"><div className="flex items-start justify-between"><div><p className="text-sm font-medium text-primary">Product registration · step {step} of 2</p><h2 className="mt-1 font-display text-3xl">Add something new</h2></div><Button variant="outline" size="icon" aria-label="Close registration" onClick={onClose}><X /></Button></div>{step === 1 ? <div className="mt-7 space-y-4"><Input placeholder="Product name" /><Input placeholder="Price in rupees" type="number" /><Input placeholder="Category" /><Input placeholder="Short description" /><div className="rounded-xl bg-secondary/60 p-4 text-sm leading-6 text-muted-foreground">A clear photo and honest description help buyers shop with confidence. Your listing will be checked before it goes live.</div><Button className="w-full" onClick={() => setStep(2)}>Continue to registration <ArrowRight /></Button></div> : <div className="mt-7"><div className="rounded-2xl border border-primary/20 bg-primary/5 p-5"><div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"><CreditCard /></span><div><p className="font-semibold">One-time product registration</p><p className="text-sm text-muted-foreground">A small fee helps us review every listing.</p></div><p className="ml-auto font-display text-2xl">₹{REGISTRATION_FEE}</p></div></div><div className="mt-5 space-y-3"><Input placeholder="UPI ID or card number" /><Input placeholder="Name on payment method" /></div><Button className="mt-6 w-full" onClick={onComplete}>Pay ₹{REGISTRATION_FEE} and submit <Check /></Button><Button variant="ghost" className="mt-2 w-full" onClick={() => setStep(1)}>Back</Button></div>}</div></div>; }

function AdminView({ onNotice }: { onNotice: (message: string) => void }) { const [approved, setApproved] = useState<string[]>([]); const pendingProducts = demoProducts.filter((product) => ["PENDING_REVIEW", "CHANGES_REQUIRED"].includes(product.status)); return <PageFrame eyebrow="Admin console" title="Keep HomeHub trustworthy." description="Review sellers, approve products, and help buyers shop with confidence."><div className="grid gap-4 sm:grid-cols-3"><Metric icon={<Users />} label="Active sellers" value="124" detail="+12 this month" /><Metric icon={<Package />} label="Pending products" value={`${pendingProducts.length}`} detail="Needs review" /><Metric icon={<ClipboardList />} label="Open reports" value={`${demoReports.filter((report) => report.status === "OPEN").length}`} detail="Customer care" /></div><div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]"><div className="rounded-2xl border border-border bg-card p-5"><div className="flex items-center justify-between"><div><h2 className="font-display text-2xl">Product review queue</h2><p className="mt-1 text-sm text-muted-foreground">Make sure every listing earns its place.</p></div><Badge variant="secondary">{pendingProducts.length} waiting</Badge></div><div className="mt-5 space-y-3">{pendingProducts.map((product) => { const isApproved = approved.includes(product.id); return <div key={product.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-border p-3"><img src={IMAGES[product.image]} alt="" className="size-12 rounded-lg object-cover" /><div className="min-w-44 flex-1"><p className="font-medium">{product.name}</p><p className="text-xs text-muted-foreground">{demoSellers.find((seller) => seller.id === product.sellerId)?.storeName} · {product.registeredAt}</p></div><Badge variant={product.status === "CHANGES_REQUIRED" ? "outline" : "secondary"}>{isApproved ? "Approved" : statusLabels[product.status]}</Badge>{!isApproved && <Button size="sm" onClick={() => { setApproved((current) => [...current, product.id]); onNotice("Product approved and seller notified"); }}>Approve</Button>}</div>; })}</div></div><div className="rounded-2xl border border-border bg-card p-5"><h2 className="font-display text-2xl">Seller applications</h2><p className="mt-1 text-sm text-muted-foreground">One seller is ready for a first review.</p><div className="mt-5 rounded-xl bg-secondary/60 p-4"><div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-background text-primary"><Store /></span><div className="flex-1"><p className="font-semibold">Handmade Gift Corner</p><p className="text-xs text-muted-foreground">Hyderabad · Jewellery</p></div><Badge variant="outline">Pending</Badge></div><p className="mt-4 text-sm leading-6 text-muted-foreground">Custom gift hampers and handmade jewellery for weddings and festivals.</p><div className="mt-4 flex gap-2"><Button className="flex-1" size="sm" onClick={() => onNotice("Seller approved")}>Approve seller</Button><Button variant="outline" size="sm" onClick={() => onNotice("Seller details opened")}>Review</Button></div></div><div className="mt-6 border-t border-border pt-5"><h3 className="font-semibold">Reports needing attention</h3><div className="mt-3 space-y-3">{demoReports.filter((report) => report.status !== "RESOLVED").map((report) => <div key={report.id} className="flex gap-3 text-sm"><span className="mt-1 size-2 shrink-0 rounded-full bg-warning" /><div><p className="font-medium">{report.subject}</p><p className="mt-0.5 text-xs text-muted-foreground">{report.status.toLowerCase()} · {report.createdAt}</p></div></div>)}</div></div></div></div></PageFrame>; }
