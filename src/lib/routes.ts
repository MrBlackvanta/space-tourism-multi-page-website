import { navLinks } from "@/data";

export function routePath(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

export function routeOrder(pathname: string) {
  const route = routePath(pathname);
  return navLinks.findIndex(({ href }) => href === route);
}
