const FORBIDDEN_TAGS =
  /<\/?(?:script|foreignObject|iframe|object|embed|link|meta|audio|video|image)\b[^>]*>/gi;
const EVENT_HANDLER_ATTRS = /\son[a-z]+\s*=\s*(['"]).*?\1/gi;
const JS_URL_ATTRS =
  /\s(?:href|xlink:href|src)\s*=\s*(['"])\s*javascript:[^'"]*\1/gi;
const XML_NS_ATTRS = /\sxmlns:[a-z-]+\s*=\s*(['"]).*?\1/gi;

export function sanitizeGeneratedSvg(svg: string): string {
  if (!svg || !svg.toLowerCase().includes("<svg")) return "";

  const match = svg.match(/<svg[\s\S]*<\/svg>/i);
  if (!match) return "";

  return match[0]
    .replace(FORBIDDEN_TAGS, "")
    .replace(EVENT_HANDLER_ATTRS, "")
    .replace(JS_URL_ATTRS, "")
    .replace(XML_NS_ATTRS, "")
    .trim();
}

export function toResponsiveSvg(svg: string, preserveAspectRatio = "xMidYMid slice"): string {
  const safeSvg = sanitizeGeneratedSvg(svg);
  if (!safeSvg) return "";

  return safeSvg
    .replace(/<svg\b([^>]*)>/i, `<svg$1 width="100%" height="100%" preserveAspectRatio="${preserveAspectRatio}">`)
    .replace(/\swidth="[^"]*"/gi, ' width="100%"')
    .replace(/\sheight="[^"]*"/gi, ' height="100%"');
}
