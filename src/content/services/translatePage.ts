const IGNORE_TAGS = [
  "NAV", "HEADER", "FOOTER", "ASIDE", "SCRIPT", "STYLE", "NOSCRIPT",
];

const IGNORE_CLASSES = [
  // basics
  "navbar", "sidebar", "footer", "nav", "menu", "breadcrumb", "pagination",
  // code
  "code", "codeblock"
];

function isIgnorableElement(el: Element): boolean {
  if (IGNORE_TAGS.includes(el.tagName)) return true;
  if (el.classList && [...el.classList].some(cls =>
      IGNORE_CLASSES.some(ignore => cls.toLowerCase().includes(ignore)))) {
    return true;
  }
  if (el.getAttribute("role") &&  /(navigation|banner|complementary|contentinfo|tab|tabpanel|button)/i.test(el.getAttribute("role")!)) {
    return true;
  }
  return false;
}

export function extractParagraphsFromPage(): string[] {
  const result: string[] = [];
  const selector = [
    "p", "li", "blockquote", "pre", "li",
    "h1", "h2", "h3", "h4", "h5", "h6",  
  ].join(",");
  const nodes = Array.from(document.body.querySelectorAll(selector));

  // Skip elements whose parent (or ancestor) is ignorable
  for (const el of nodes) {
    let skip = false;
    let parent: Element | null = el;
    while (parent) {
      if (parent instanceof Element && isIgnorableElement(parent)) {
        skip = true;
        break;
      }
      parent = parent.parentElement;
    }
    if (skip) continue;

    const txt = el.textContent?.trim();
    if (txt && txt.length > 0) result.push(txt);
  }
  return result;
}