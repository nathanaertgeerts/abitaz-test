import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "./components/ScrollToTop";
import { CartProvider } from "./context/CartContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Category from "./pages/Category.tsx";
import Categories from "./pages/Categories.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import Sale from "./pages/Sale.tsx";
import Search from "./pages/Search.tsx";
import Cart from "./pages/Cart.tsx";
import Checkout from "./pages/Checkout.tsx";
import OrderConfirmation from "./pages/OrderConfirmation.tsx";
import Brands from "./pages/Brands.tsx";
import Brand from "./pages/Brand.tsx";
import Sitemap from "./pages/Sitemap.tsx";
import {
  RoomsIndex,
  RoomDetail,
  InspirationIndex,
  InspirationDetail,
  NewArrivals,
  BestSellers,
  GiftCards,
  Wishlist,
  Login,
  Register,
  ForgotPassword,
  AccountOverview,
  AccountOrders,
  AccountAddresses,
  AccountReturns,
  Help,
  FAQ,
  Contact,
  Delivery,
  Returns,
  Warranty,
  TrackOrder,
  Pro,
  About,
  Sustainability,
  Careers,
  Press,
  Stores,
  Blog,
  BlogPost,
  Terms,
  Privacy,
  Cookies,
} from "./pages/skeletons.tsx";
import {
  CheckoutShipping,
  CheckoutPayment,
  CheckoutReturn,
  CheckoutPending,
  CheckoutFailed,
  Compare,
  LoginOtp,
  SignupParticulier,
  SignupB2B,
  AccountOrderDetail,
  AccountOrderTracking,
  AccountOrderRetryPay,
  AccountOrderReturn,
  AccountInvoices,
  AccountInvoiceDetail,
  AccountPaymentMethods,
  AccountPreferences,
  AccountDelete,
  GuestOrderLookup,
  GuideSizeSpec,
  GuideLightingPlanner,
  ProApply,
  ProQuote,
  ProProjects,
  ProBulkOrder,
  ProSpecSheets,
  ProFaq,
  Imprint,
  RightOfWithdrawal,
  PaymentOptions,
  ShippingPolicy,
  Accessibility,
  Maintenance,
  ServerError,
} from "./pages/skeletons-extra.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CartProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/categories/:slug" element={<Category />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/search" element={<Search />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/brands/:slug" element={<Brand />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            {/* Checkout substates (Stripe-via-Odoo, D1) */}
            <Route path="/checkout/shipping" element={<CheckoutShipping />} />
            <Route path="/checkout/payment" element={<CheckoutPayment />} />
            <Route path="/checkout/return" element={<CheckoutReturn />} />
            <Route path="/checkout/pending" element={<CheckoutPending />} />
            <Route path="/checkout/failed" element={<CheckoutFailed />} />
            {/* Collections (Payload curated) */}
            <Route path="/collections" element={<CollectionsIndex />} />
            <Route path="/collections/:slug" element={<CollectionDetail />} />
            {/* Compare */}
            <Route path="/compare" element={<Compare />} />
            {/* Guest order lookup */}
            <Route path="/orders/:id" element={<GuestOrderLookup />} />
            {/* Sitemap / dev hand-off */}
            <Route path="/sitemap" element={<Sitemap />} />
            {/* Rooms */}
            <Route path="/rooms" element={<RoomsIndex />} />
            <Route path="/rooms/:slug" element={<RoomDetail />} />
            {/* Inspiration & editorial */}
            <Route path="/inspiration" element={<InspirationIndex />} />
            <Route path="/inspiration/:slug" element={<InspirationDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            {/* Curated edits */}
            <Route path="/new" element={<NewArrivals />} />
            <Route path="/best-sellers" element={<BestSellers />} />
            <Route path="/gift-cards" element={<GiftCards />} />
            {/* Wishlist */}
            <Route path="/wishlist" element={<Wishlist />} />
            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/login/otp" element={<LoginOtp />} />
            <Route path="/signup/particulier" element={<SignupParticulier />} />
            <Route path="/signup/b2b" element={<SignupB2B />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/* Account */}
            <Route path="/account" element={<AccountOverview />} />
            <Route path="/account/orders" element={<AccountOrders />} />
            <Route path="/account/orders/:id" element={<AccountOrderDetail />} />
            <Route path="/account/orders/:id/tracking" element={<AccountOrderTracking />} />
            <Route path="/account/orders/:id/pay" element={<AccountOrderRetryPay />} />
            <Route path="/account/orders/:id/return" element={<AccountOrderReturn />} />
            <Route path="/account/invoices" element={<AccountInvoices />} />
            <Route path="/account/invoices/:id" element={<AccountInvoiceDetail />} />
            <Route path="/account/addresses" element={<AccountAddresses />} />
            <Route path="/account/payment-methods" element={<AccountPaymentMethods />} />
            <Route path="/account/returns" element={<AccountReturns />} />
            <Route path="/account/preferences" element={<AccountPreferences />} />
            <Route path="/account/delete-account" element={<AccountDelete />} />
            {/* Customer service */}
            <Route path="/help" element={<Help />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/warranty" element={<Warranty />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/guides/size-spec" element={<GuideSizeSpec />} />
            <Route path="/guides/lighting-planner" element={<GuideLightingPlanner />} />
            {/* Trade / Pro */}
            <Route path="/pro" element={<Pro />} />
            <Route path="/pro/apply" element={<ProApply />} />
            <Route path="/pro/quote" element={<ProQuote />} />
            <Route path="/pro/projects" element={<ProProjects />} />
            <Route path="/pro/bulk-order" element={<ProBulkOrder />} />
            <Route path="/pro/spec-sheets" element={<ProSpecSheets />} />
            <Route path="/pro/faq" element={<ProFaq />} />
            {/* Company */}
            <Route path="/about" element={<About />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/press" element={<Press />} />
            <Route path="/stores" element={<Stores />} />
            {/* Legal */}
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/imprint" element={<Imprint />} />
            <Route path="/right-of-withdrawal" element={<RightOfWithdrawal />} />
            <Route path="/payment-options" element={<PaymentOptions />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/accessibility" element={<Accessibility />} />
            {/* System */}
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/500" element={<ServerError />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
