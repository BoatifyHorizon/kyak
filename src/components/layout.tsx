import React, { ReactNode } from "react";
import { User, Component, CalendarFold, CalendarSearch, Info, LogOut } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";

interface Route {
  title: string;
  icon: ReactNode;
  route: string;
}

const Layout = (props: React.PropsWithChildren) => {
  return (
    <div className="flex w-full justify-center m-4">
      <div className="flex min-w-[70rem] border rounded-md">
        <Navbar />
        <Separator orientation="vertical" />
        <div className="p-3 w-full">{props.children}</div>
      </div>
    </div>
  );
};

const routes: Route[] = [
  { title: "Profil", icon: <User className="h-6 w-6" />, route: "/" },
  { title: "Asortyment", icon: <Component className="h-6 w-6" />, route: "/asortyment" },
  { title: "Rezerwacje", icon: <CalendarFold className="h-6 w-6" />, route: "/rezerwacje" },
  { title: "Historia", icon: <CalendarSearch className="h-6 w-6" />, route: "/historia" },
];

const Navbar = () => {
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-5 min-w-10 items-center p-3 justify-between min-h-[30rem]">
        <div className="flex flex-col gap-5">
          {routes.map((r) => (
            <Tooltip key={`navbar-tooltip-${r.title}`}>
              <TooltipTrigger asChild>
                <Link
                  to={r.route}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  {r.icon}
                  <span className="sr-only">{r.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{r.title}</TooltipContent>
            </Tooltip>
          ))}
        </div>
        <div className="flex flex-col gap-5">
          <Tooltip key={`navbar-tooltip-informacje`}>
            <TooltipTrigger asChild>
              <div className="flex h-9 w-9 items-center cursor-pointer justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                <Info className="h-6 w-6" />
                <span className="sr-only">Informacje</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">Informacje</TooltipContent>
          </Tooltip>
          <Tooltip key={`navbar-tooltip-logout`}>
            <TooltipTrigger asChild>
              <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                <LogOut className="h-6 w-6" />
                <span className="sr-only">Wyloguj</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">Wyloguj</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Layout;
