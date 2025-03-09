import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "./styles.css";
import reportWebVitals from "./reportWebVitals.ts";

import App from "./App.tsx";
import { Heavy0 } from "./pages/Heavy0.tsx";
import { HeavyA } from "./pages/HeavyA.tsx";
import { Inventory } from "./pages/Inventory.tsx";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: App,
});

const inventoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/inventory",
  component: Inventory,
});

const heavy0Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/heavy/0",
  component: Heavy0,
});

const heavyARoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/heavy/a",
  component: HeavyA,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  inventoryRoute,
  heavyARoute,
  heavy0Route,
]);

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
