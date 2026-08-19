# GalleryFilter jQuery Plugin

A responsive, animated image gallery plugin for jQuery with powerful filtering, multiple layout options, and customizable configurations.

## 🎯 Features

- **Responsive Layouts**: Masonry, Grid, and Bento layout options
- **Image Filtering**: Filter gallery items by category with smooth animations
- **Flexible Grid System**: Configurable columns with responsive breakpoints
- **Bento Layout**: Create complex grid designs with customizable item sizes
- **Smooth Animations**: CSS transitions for all layout changes
- **Callback Support**: Custom events for filter, layout, and item click actions
- **Easy Integration**: Simple jQuery plugin that works with minimal setup
- **Mobile Friendly**: Fully responsive with mobile-first design
- **Self-Healing Layout**: Re-measures on container resize, late fonts and late images — cards are never left stacked

## 📋 Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [HTML Structure](#html-structure)
4. [Configuration Options](#configuration-options)
5. [Usage Examples](#usage-examples)
6. [API Methods](#api-methods)
7. [Callbacks](#callbacks)
8. [Layout Types](#layout-types)
9. [Positioning & Layout Lifecycle](#positioning--layout-lifecycle)
10. [Responsive Breakpoints](#responsive-breakpoints)
11. [Browser Support](#browser-support)

## 📦 Installation

### Step 1: Include Files

Add the plugin CSS and JavaScript files to your HTML:

```html
<!-- Plugin CSS -->
<link rel="stylesheet" href="jquery.GalleryFilter.css">

<!-- jQuery (if not already included) -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- Plugin JavaScript -->
<script src="jquery.GalleryFilter.js"></script>
```

### Step 2: Create HTML Structure

Create a container with gallery items:

```html
<div id="my-gallery">
  <div class="filter-item" data-category="design">
    <div class="filter-thumb">
      <img src="image.jpg" alt="Gallery Image">
    </div>
    <div class="filter-body">
      <h3 class="filter-title">Image Title</h3>
      <span class="filter-tag">design</span>
    </div>
  </div>
  <!-- More items... -->
</div>
```

### Step 3: Initialize Plugin

```javascript
$(function() {
  $('#my-gallery').GalleryFilter({
    layout: 'bento',
    columns: 3
  });
});
```

## 🚀 Quick Start

### Minimal Setup

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="jquery.GalleryFilter.css">
</head>
<body>
  <div id="gallery">
    <div class="filter-item" data-category="nature">
      <div class="filter-thumb">
        <img src="nature-1.jpg" alt="">
      </div>
    </div>
    <div class="filter-item" data-category="city">
      <div class="filter-thumb">
        <img src="city-1.jpg" alt="">
      </div>
    </div>
  </div>

  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="jquery.GalleryFilter.js"></script>
  <script>
    $(function() {
      $('#gallery').GalleryFilter();
    });
  </script>
</body>
</html>
```

## 🏗️ HTML Structure

### Gallery Item Structure

Each gallery item must have the following structure:

```html
<div class="filter-item" data-category="category-name" data-cols="1" data-rows="1">
  <!-- Image container (required) -->
  <div class="filter-thumb">
    <img src="image.jpg" alt="Description">
  </div>

  <!-- Content container (optional) -->
  <div class="filter-body">
    <h3 class="filter-title">Title</h3>
    <span class="filter-tag">tag</span>
  </div>
</div>
```

### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `data-category` | string | Category for filtering (required) |
| `data-cols` | number | Column span in bento layout (optional, default: 1) |
| `data-rows` | number | Row span in bento layout (optional, default: 1) |

## ⚙️ Configuration Options

### Default Options

```javascript
{
  // Layout type: 'masonry', 'grid', or 'bento'
  layout: 'masonry',

  // Category attribute key in HTML data attributes
  categoryAttr: 'category',

  // Show/hide filter buttons
  showFilters: true,

  // Label for "Show All" filter button
  allLabel: 'All',

  // Horizontal gap between columns (pixels)
  colGap: 12,

  // Vertical gap between rows (pixels)
  rowGap: 12,

  // Number of columns (default for desktop)
  columns: 3,

  // Base unit height for bento layout (pixels)
  bentoUnitHeight: 140,

  // Thumbnail height for single-row items (pixels)
  thumbHeight: 90,

  // Enable/disable animations
  animate: true,

  // Animation duration (milliseconds)
  animationDuration: 380,

  // Extra CSS classes added to the filter bar element
  filterBarClass: '',

  // Extra CSS classes added to the filter bar button group
  filterBarBtnGroupClass: '',

  // Extra CSS classes added to every filter button
  filterBtnClass: '',
  
  // Responsive breakpoints configuration
  responsive: [
    { maxWidth: 480,  columns: 1, bentoUnitHeight: 160 },
    { maxWidth: 768,  columns: 2, bentoUnitHeight: 150 },
    { maxWidth: 1024, columns: 3, bentoUnitHeight: 140 }
  ],

  // Callbacks
  onFilter: null,      // function(category, visibleItems)
  onLayout: null,      // function(layoutName)
  onItemClick: null    // function(item, data)
}
```

## 💡 Usage Examples

### Example 1: Basic Gallery with Grid Layout

```javascript
$('#gallery').GalleryFilter({
  layout: 'grid',
  columns: 4,
  colGap: 10,
  rowGap: 10
});
```

### Example 2: Masonry Layout with Custom Animation

```javascript
$('#gallery').GalleryFilter({
  layout: 'masonry',
  columns: 3,
  animate: true,
  animationDuration: 500
});
```

### Example 3: Bento Layout with Responsive Design

```javascript
$('#gallery').GalleryFilter({
  layout: 'bento',
  columns: 3,
  bentoUnitHeight: 150,
  responsive: [
    { maxWidth: 480,  columns: 1, bentoUnitHeight: 180 },
    { maxWidth: 768,  columns: 2, bentoUnitHeight: 160 },
    { maxWidth: 1200, columns: 4, bentoUnitHeight: 140 }
  ]
});
```

### Example 4: With Callbacks

```javascript
$('#gallery').GalleryFilter({
  layout: 'grid',
  onFilter: function(category, visibleItems) {
    console.log('Filtered by: ' + category);
    console.log('Visible items: ' + visibleItems);
  },
  onItemClick: function(item, data) {
    console.log('Clicked item:', data);
    // Open lightbox, etc.
  },
  onLayout: function(layoutName) {
    console.log('Layout changed to: ' + layoutName);
  }
});
```

### Example 5: Hidden Filters (Programmatic Control)

```javascript
$('#gallery').GalleryFilter({
  layout: 'grid',
  showFilters: false  // Hide filter buttons
});

// Trigger filter programmatically
$('#gallery').data('plugin_GalleryFilter').filter('nature');
```

## 🔧 API Methods

After initializing the plugin, you can call methods on the gallery instance:

### Filter by Category

```javascript
var gallery = $('#gallery').data('plugin_GalleryFilter');
gallery.filter('nature');
```

### Get Current Filter

```javascript
var currentFilter = gallery.currentFilter;
console.log(currentFilter); // 'nature' or 'all'
```

### Refresh Layout

```javascript
gallery.layout();
```

### Get All Items

```javascript
var items = gallery.items;
console.log(items.length); // Number of gallery items
```

### Change Layout

```javascript
gallery.setLayout('masonry');   // fires the onLayout callback

// Equivalent without the callback:
gallery.currentLayout = 'masonry';
gallery.layout();
```

### Re-initialize (Ajax / Re-render)

Calling the plugin again on an element that already has an instance no longer
does nothing — it merges any options you pass and re-runs `layout()`. Safe to
call from a widget handler that re-fires over the same DOM:

```javascript
$('#gallery').GalleryFilter({ columns: 4 });  // updates options + re-lays out
```

Call it after you inject new cards, too — but re-collect them first, since
`items` is captured at init:

```javascript
$('#gallery .filter-grid').append(newCards);
var gallery = $('#gallery').data('plugin_GalleryFilter');
gallery._collectItems();
gallery.layout();
```

### Destroy

```javascript
$('#gallery').GalleryFilter('destroy');
```

Unbinds only *this* instance's window handlers (they are namespaced per
instance), disconnects its `ResizeObserver`, removes the filter bar, and clears
the inline `position`/`width`/`height`/`left`/`top` the layout wrote — so the
cards fall back into normal document flow.

## 📞 Callbacks

### onFilter Callback

Triggered when a filter button is clicked:

```javascript
onFilter: function(category, visibleItems) {
  // category: string - selected category or 'all'
  // visibleItems: number - count of visible items
}
```

### onLayout Callback

Triggered after layout is applied:

```javascript
onLayout: function(layoutName) {
  // layoutName: string - 'masonry', 'grid', or 'bento'
}
```

### onItemClick Callback

Triggered when a gallery item is clicked:

```javascript
onItemClick: function(item, data) {
  // item: DOM element of clicked item
  // data: object with position and item data
}
```

## 🎨 Layout Types

### Grid Layout

Displays items in a uniform grid with equal-sized cells:

```javascript
$('#gallery').GalleryFilter({
  layout: 'grid',
  columns: 3,
  colGap: 12,
  rowGap: 12
});
```

### Masonry Layout

Pinterest-style masonry layout with items of variable heights:

```javascript
$('#gallery').GalleryFilter({
  layout: 'masonry',
  columns: 3
});
```

### Bento Layout

Complex grid layout where items can span multiple rows and columns:

```html
<!-- Item spanning 2 columns and 2 rows -->
<div class="filter-item" data-category="featured" data-cols="2" data-rows="2">
  <div class="filter-thumb"><img src="large.jpg" alt=""></div>
</div>

<!-- Regular 1x1 item -->
<div class="filter-item" data-category="design" data-cols="1" data-rows="1">
  <div class="filter-thumb"><img src="small.jpg" alt=""></div>
</div>
```

Initialize with bento settings:

```javascript
$('#gallery').GalleryFilter({
  layout: 'bento',
  columns: 3,
  bentoUnitHeight: 140
});
```

## 📐 Positioning & Layout Lifecycle

### The plugin owns `position`

Cards are absolutely positioned inside `.filter-grid`, but **the plugin — not
the stylesheet — applies that**. Each layout pass writes `position: absolute`
in the *same* `.css()` call as the card's `left`/`top`, so a card is never
taken out of flow before it has somewhere to sit.

> ⚠️ **Do not set `position` on `.filter-item` in your own CSS.**
> A rule like `.filter-grid .filter-item { position: absolute; }` in a theme or
> widget stylesheet re-introduces the bug this design avoids: any moment where
> layout has not run yet — a collapsed tab, a stylesheet that arrives late,
> images still downloading after a "Load More" — leaves every card stacked on
> top of the next at `0,0`.

With `position` left unset, the un-laid-out state degrades to a plain,
readable single column. `destroy()` clears the inline value and the cards
return to flow.

The bundled `jquery.GalleryFilter.css` follows this rule. If you ship your own
stylesheet, style everything else you like — background, border, radius,
transitions — just leave `position` alone.

### When layout runs

| Trigger | Why it exists |
|---------|---------------|
| Next animation frame after init | First layout no longer waits for `window load`, which could be seconds away on a slow page |
| Retry loop while `.filter-grid` measures `0` | A grid inside a hidden tab/accordion, or before its CSS applies, has no width; layout retries (up to ~60 frames) instead of bailing permanently |
| `window load` | Anything that landed after the first pass can still change card heights |
| `document.fonts.ready` | Web fonts swap in after first paint and reflow every card |
| `window resize` (debounced 120 ms) | Viewport changes the breakpoint / column count |
| `ResizeObserver` on `.filter-grid` | Container-width changes that fire **no** window resize: a revealed tab, a late stylesheet, a resized sidebar or column. Width-only — height changes are the plugin's own doing and are ignored |
| Re-calling the plugin on an initialized element | Ajax refresh or editor re-render |

### Masonry and images

Masonry needs real card heights, so `layout()` places everything it can measure
**immediately** and then corrects once the pending `<img>` elements fire
`load`/`error`. Freshly revealed cards are therefore positioned from the first
frame rather than sitting in normal flow on top of the grid while their
thumbnails download.

### Hidden items

Masonry skips items whose computed `display` is `none` — typically the
remainder a host "Load More" control keeps hidden. They do not book a slot, so
no phantom row gap is left behind. Revealing them and calling `layout()` places
them normally.

Note this is different from *filtered-out* items, which get the
`.filter-hidden` class (opacity/scale, still positioned) so they can animate.

## 📱 Responsive Breakpoints

Customize layout for different screen sizes:

```javascript
$('#gallery').GalleryFilter({
  layout: 'bento',
  columns: 4,          // Desktop (1024px+)
  bentoUnitHeight: 140,
  responsive: [
    {
      maxWidth: 480,   // Mobile (up to 480px)
      columns: 1,
      bentoUnitHeight: 180
    },
    {
      maxWidth: 768,   // Tablet (up to 768px)
      columns: 2,
      bentoUnitHeight: 160
    },
    {
      maxWidth: 1024,  // Small desktop (up to 1024px)
      columns: 3,
      bentoUnitHeight: 150
    }
  ]
});
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE 11 (basic support)

`ResizeObserver` and `document.fonts.ready` are used when present and skipped
when they are not — on a browser without them you simply lose the container
resize and font-swap correction passes; everything else still works.

## 📝 Styling Customization

You can override default styles using CSS:

```css
/* Custom colors */
.filter-wrap .filter-btn.filter-active {
  background: #your-color;
  border-color: #your-color;
}

/* Custom item styling — anything except `position` */
.filter-item {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Custom filter bar */
.filter-bar {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e5e7eb;
}
```

> ⚠️ Never add `position` to `.filter-item` (or `.filter-grid .filter-item`).
> The plugin applies it together with the coordinates — see
> [Positioning & Layout Lifecycle](#positioning--layout-lifecycle).

## 🎬 Animation Performance

For better performance on mobile devices, disable animations:

```javascript
$('#gallery').GalleryFilter({
  animate: false,  // Disable animations
  layout: 'grid'
});
```

Or use reduced motion preferences:

```javascript
var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

$('#gallery').GalleryFilter({
  animate: !prefersReducedMotion,
  animationDuration: 200
});
```

## 🐛 Troubleshooting

### Gallery items not displaying

- Ensure `.filter-item` elements have `data-category` attribute
- Check that `.filter-thumb` contains an `<img>` tag
- Verify CSS file is properly loaded

### All cards stacked on top of each other at the top-left

Something else is setting `position: absolute` on the cards before the plugin
lays them out. Search your theme/widget CSS for rules like
`.filter-grid .filter-item { position: absolute }` and remove them — the plugin
applies `position` itself, alongside `left`/`top`. See
[Positioning & Layout Lifecycle](#positioning--layout-lifecycle).

### Cards overlap after a "Load More" click

The newly revealed cards are laid out on the next frame and corrected once
their images load, so this should resolve itself. If they stay overlapped, the
`position` rule above is almost always the cause. Also call `_collectItems()`
before `layout()` if the cards were **appended**, not just un-hidden.

### Gallery inside a tab / accordion lays out wrong

Handled automatically — the first layout retries while the grid measures `0`,
and a `ResizeObserver` re-lays out when the container gains width. If your tab
script replaces the grid element entirely, re-init instead:
`$('#gallery').GalleryFilter()`.

### Unexpected empty rows in masonry

Items with `display: none` are skipped so they cannot book a slot. If you hide
cards with `visibility: hidden` or `opacity: 0` instead, they still occupy
space — use `display: none`, or the built-in filter.

### Filters not working

- Make sure `showFilters: true` is set (default)
- Verify category names match between HTML and data

### Layout not responsive

- Add proper `responsive` breakpoints configuration
- Ensure viewport meta tag is present: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

### Animation lag

- Set `animate: false` or increase `animationDuration`
- Reduce number of gallery items
- Check for conflicting CSS transitions

## 📄 License

This plugin is provided as-is for use in your projects.

## 🤝 Contributing

Contributions and feedback are welcome! Please feel free to submit issues or improvements.

## 📞 Support

For questions or issues, please refer to the example files:
- `demo.html` - Basic gallery demo
- `image-gallery.html` - Advanced bento layout example

---

**Version:** 1.0.1  
**Last Updated:** 2026-08-19

### Changelog

**1.0.1**
- `position: absolute` is now written by the layout methods alongside `left`/`top` instead of being declared in the stylesheet — cards no longer pile up at `0,0` when layout is delayed, and degrade to a single column instead
- First layout runs on the next animation frame instead of `window load`, and retries while `.filter-grid` still measures `0`
- `ResizeObserver` on the grid handles container-width changes that fire no window resize
- `document.fonts.ready` added as a correction pass
- Masonry places measurable cards immediately, then corrects after images settle
- Masonry skips `display: none` items so they leave no phantom row gap
- Window handlers are namespaced per instance; `destroy()` only unbinds its own and disconnects its observer
- Re-initializing over an existing instance merges options and re-lays out instead of silently doing nothing
