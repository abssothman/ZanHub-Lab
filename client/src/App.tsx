import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { sitePagePaths, type SitePage } from "./lib/siteCopy";

const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, "");
const pageByPath = Object.fromEntries(
  Object.entries(sitePagePaths).map(([page, routePath]) => [routePath, page]),
) as Record<string, SitePage>;

function getCurrentPage(): SitePage | undefined {
  let pathname = window.location.pathname;
  if (BASE_PATH) {
    if (pathname === BASE_PATH) pathname = "/";
    else if (pathname.startsWith(`${BASE_PATH}/`)) pathname = pathname.slice(BASE_PATH.length);
    else return undefined;
  }

  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  return pageByPath[normalizedPath];
}

function Router() {
  const page = getCurrentPage();
  return (
    <Switch>
      <Route>{page ? <Home page={page} /> : <NotFound />}</Route>
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
