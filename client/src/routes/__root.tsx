import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="relative min-h-screen w-full px-2 py-2 md:py-8 overflow-x-auto font-poppins">
      <main className="container">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  ),
});
