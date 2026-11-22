import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, "");
const HOME_PATH = BASE_PATH ? `${BASE_PATH}/` : "/";
const NOT_FOUND_PATH = BASE_PATH ? `${BASE_PATH}/404` : "/404";

function Router() {
  const currentPath = window.location.pathname;
  if (BASE_PATH && (currentPath === BASE_PATH || currentPath === `${BASE_PATH}/`)) {
    return <Home />;
  }

  return (
    <Switch>
      <Route path={HOME_PATH} component={Home} />
      <Route path={NOT_FOUND_PATH} component={NotFound} />
      <Route component={NotFound} />
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
