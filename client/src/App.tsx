import { RouterProvider, createRouter } from "@tanstack/react-router";
import { FC } from "react";
import { routeTree } from "@/routeTree.gen";
import ErrorPage from "@/pages/Error";
import NotFound from "@/pages/NotFound";
import { LoadingFullPage } from "./components/Loading";

const router = createRouter({
  routeTree,
  defaultPendingComponent: LoadingFullPage,
  defaultErrorComponent: ErrorPage,
  defaultNotFoundComponent: NotFound,
  defaultPreload: "intent",
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App: FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
