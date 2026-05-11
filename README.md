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

## 📋 Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [HTML Structure](#html-structure)
4. [Configuration Options](#configuration-options)
5. [Usage Examples](#usage-examples)
6. [API Methods](#api-methods)
7. [Callbacks](#callbacks)
8. [Layout Types](#layout-types)
9. [Responsive Breakpoints](#responsive-breakpoints)
10. [Browser Support](#browser-support)

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
  layout: 'bento',

  // Category attribute key in HTML data attributes
  categoryAttr: 'category',

  // Show/hide filter buttons
  showFilters: true,

  // Label for "Show All" filter button
  allLabel: 'All',

  // Gap between items (pixels)
  gap: 12,

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
  gap: 10
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
gallery.currentLayout = 'masonry';
gallery.layout();
```

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
  gap: 12
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

## 📝 Styling Customization

You can override default styles using CSS:

```css
/* Custom colors */
.filter-wrap .filter-btn.filter-active {
  background: #your-color;
  border-color: #your-color;
}

/* Custom item styling */
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

**Version:** 1.0.0  
**Last Updated:** 2026
