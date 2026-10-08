import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, MapPin, ShieldCheck, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { demoProducts, demoSellers, IMAGES } from "@/lib/demo-data";
import { slugifyStoreName } from "@/lib/storefront";

export const Route = createFileRoute("/store/$slug")({
  loader: ({ params }) => {
    const seller = demoSellers.find((item) => slugifyStoreName(item.storeName) === params.slug);
    return {
      seller,
      products: seller
        ? demoProducts.filter(
            (product) =>
              product.sellerId === seller.id && product.status === "ACTIVE" && product.stock > 0,
          )
        : [],
    };
  },
  head: ({ loaderData }) => {
    const title = loaderData.seller
      ? `${loaderData.seller.storeName} — HomeHub`
      : "Store unavailable — HomeHub";
    const description = loaderData.seller
      ? `${loaderData.seller.description} Shop this local maker's HomeHub storefront.`
      : "This HomeHub storefront could not be found.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: PublicStorefront,
});

function PublicStorefront() {
  const { seller, products } = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="/" className="font-display text-xl font-semibold">HomeHub</a>
          <Button variant="outline" asChild><a href="/"> <ArrowLeft /> Marketplace</a></Button>
        </div>
      </header>
      {seller ? (
        <>
          <section className="border-b border-border/60 bg-secondary/35">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
              <div className="flex flex-wrap items-center gap-2 text-sm text-primary">
                <span>HomeHub maker</span>
                {seller.verified && <><span aria-hidden="true">·</span><span className="inline-flex items-center gap-1"><ShieldCheck className="size-4" /> Verified seller</span></>}
              </div>
              <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">{seller.storeName}</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{seller.description}</p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><MapPin className="size-4" />{seller.location}</span>
                {seller.rating > 0 && <span className="inline-flex items-center gap-1.5"><Star className="size-4 fill-warning text-warning" />{seller.rating.toFixed(1)} maker rating</span>}
              </div>
            </div>
          </section>
          <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4"><div><p className="text-sm font-medium text-primary">Made with care</p><h2 className="mt-1 font-display text-3xl">Available from this maker</h2></div><span className="text-sm text-muted-foreground">{products.length} products</span></div>
            {products.length ? <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{products.map((product) => <article key={product.id} className="overflow-hidden rounded-xl border border-border bg-card"><img src={IMAGES[product.image]} alt={product.name} className="aspect-[1.08] w-full object-cover" /><div className="p-4"><p className="text-xs font-medium text-primary">{product.category}</p><h3 className="mt-1 font-semibold">{product.name}</h3><p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">{product.description}</p><div className="mt-4 flex items-center justify-between"><span className="font-semibold">₹{product.price.toLocaleString("en-IN")}</span><span className="text-xs text-muted-foreground">{product.delivery}</span></div></div></article>)}</div> : <div className="mt-8 border-t border-border py-12 text-center text-muted-foreground">This maker has no available products right now.</div>}
          </section>
        </>
      ) : (
        <section className="mx-auto max-w-3xl px-4 py-24 text-center"><h1 className="font-display text-3xl">Store not found</h1><p className="mt-3 text-muted-foreground">This storefront may have moved or the link may be incomplete.</p><Button className="mt-6" asChild><a href="/">Return to HomeHub</a></Button></section>
      )}
    </main>
  );
}