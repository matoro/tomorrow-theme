# Tomorrow theme
A simple userscript to use native site controls to automatically enable an appropriate native dark theme on various sites for cookie-disabled browsers.

## Name
The name of the script comes from the classic 4chan theme "Tomorrow".  This does *not* mean that it is meant to apply the Tomorrow theme globally or to sites unrelated to 4chan, but rather the most popular dark theme built into each site.

## Purpose
The idea behind this script is to use built-in site controls to apply a dark theme to various sites without requiring cookies to be set.  This script is ideal for you if:

- You do not want persistent cookies, but still want sites to remember your theme settings
- You do not want to load additional addons dedicated to themes (e.g. Stylish) and would prefer to use a userscript manager which you already have installed
- You find that applying global CSS to sites usually just ends up looking uglier

Advantages over global CSS:

- Themes created by the owners of a site are usually best-optimized for that particular site's design/color scheme
- Themes built into a site do not need to be updated for breaking DOM changes

## Approach
- Sites which do not provide a native dark theme (e.g. Github at the time of this writing) will not be included
- Simulating clicks on built-in site elements is the preferred approach
- If a site has multiple available dark themes, the most popular should be chosen; if this is not obvious then the choice is up to the discretion of the author
- Theme-select code should be added to `document.onload` in order to guarantee that control elements are loaded
- Each individual site is enclosed in a case block
- List of sites should be kept in alphabetical order, numbers at the top
- For sites with multiple domains, case fall-through code should be used, with the lower domains listed immediately after the first one in alphabetical order even if this breaks order.  E.g.:

```
switch(location.hostname)
{
  case apples.com:
    //code
    break;
  case clementines.oranges.com:
  case oranges.com:
  case tangerines.oranges.com:
    //code
    break;
  case pears.com:
    //code
    break;
}
```

## Contributing
Feel free to add a site you use regularly.  Make sure to follow the approach rules above and bump the version.  Site additions that do not break the structure should bump the patch number (third number in semver scheme).
