/**
 * Runs before first paint so the page never flashes the wrong colour scheme,
 * and marks the document as script-enabled so reveal animations only hide
 * content when something is able to reveal it again.
 */
export function ThemeScript() {
  const script = `(function(){var d=document.documentElement;d.classList.add('js');try{var s=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var dark=s==='dark'||((!s||s==='system')&&m);d.classList.toggle('dark',dark);d.style.colorScheme=dark?'dark':'light';}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}