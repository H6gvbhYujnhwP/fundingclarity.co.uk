import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import WhyApplicationsFail from "./pages/WhyApplicationsFail";
import WhoIsThisFor from "./pages/WhoIsThisFor";
import WhatWeDo from "./pages/WhatWeDo";
import Contact from "./pages/Contact";
import Quiz from "./pages/Quiz";
import Booking from "./pages/Booking";
import LeadMagnet from "./pages/LeadMagnet";
import Header from "./components/Header";
import Footer from "./components/Footer";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/how-it-works"} component={HowItWorks} />
      <Route path={"/why-applications-fail"} component={WhyApplicationsFail} />
      <Route path={"/who-is-this-for"} component={WhoIsThisFor} />
      <Route path={"/what-we-do"} component={WhatWeDo} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/quiz"} component={Quiz} />
      <Route path={"/booking"} component={Booking} />
      <Route path={"/guide"} component={LeadMagnet} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Header />
          <Router />
          <Footer />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
