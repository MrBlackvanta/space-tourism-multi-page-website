function stayOnPage(event: MouseEvent) {
  if (event.target instanceof Element && event.target.closest("a[href]")) {
    event.preventDefault();
  }
}

export function installLinkClicks() {
  document.addEventListener("click", stayOnPage);
  return () => document.removeEventListener("click", stayOnPage);
}
