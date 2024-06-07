import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="relative min-h-screen w-full overflow-x-hidden font-poppins">
      <main className="container">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  ),
});
