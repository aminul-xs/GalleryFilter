/*!
 * jQuery GalleryFilter Plugin v1.0.1
 * A responsive image gallery plugin with Filter, Masonry, Grid & Bento layouts
 * Usage: $('#gallery').GalleryFilter({ options })
 * Author: Custom Plugin
 */
(function ($, window, document, undefined) {
  'use strict';

  var pluginName = 'GalleryFilter';

  var defaults = {
    // Layout: 'masonry' | 'grid' | 'bento'
    layout: 'masonry',

    // Filter category key in data attribute: data-category="design"
    categoryAttr: 'category',

    // Show filter buttons. Set false to control filtering manually via API
    showFilters: true,

    // Label for the "show all" filter button
    allLabel: 'All',

    // Extra CSS classes added to the filter bar element
    filterBarClass: '',

    // Extra CSS classes added to the filter bar button group
    filterBarBtnGroupClass: '',

    // Extra CSS classes added to every filter button
    filterBtnClass: '',

    // Column gap for cards (px)
    colGap: 12,

    // Row gap for cards (px)
    rowGap: 12,

    // Number of columns — set per breakpoint via `responsive`
    columns: 3,

    // Base unit height for bento rows (px)
    bentoUnitHeight: 140,

    // Thumbnail height inside cards for single-row bento (px)
    thumbHeight: 90,

    // Animate transitions
    animate: true,

    // Animation duration (ms)
    animationDuration: 380,

    // Responsive breakpoints: [{ maxWidth, columns, bentoUnitHeight }]
    responsive: [
      { maxWidth: 480,  columns: 1, bentoUnitHeight: 160 },
      { maxWidth: 768,  columns: 2, bentoUnitHeight: 150 },
      { maxWidth: 1024, columns: 3, bentoUnitHeight: 140 },
    ],

    // Callbacks
    onFilter: null,     // function(category, visibleItems)
    onLayout: null,     // function(layoutName)
    onItemClick: null,  // function(item, data)
  };

  // ─── Plugin Constructor ───────────────────────────────────────────────────
  function GalleryFilter(element, options) {
    this.el      = element;
    this.$el     = $(element);
    this.options = $.extend(true, {}, defaults, options);
    this._name   = pluginName;

    this.currentFilter = 'all';
    this.currentLayout = this.options.layout;
    this.items         = [];
    this.$grid         = null;
    this.$filterBar    = null;

    this.init();
  }

  // ─── Plugin Prototype ─────────────────────────────────────────────────────
  $.extend(GalleryFilter.prototype, {

    init: function () {
  var self = this;
  self._buildDOM();
  self._bindEvents();
  self._collectItems();

  // Single layout call, deferred one tick so $grid.width() is painted
  $(window).one('load.' + pluginName, function () {
    self.layout();
  });

  // Fallback: if load already fired (cached page), run after paint
  if (document.readyState === 'complete') {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        self.layout();
      });
    });
  }

  $(window).on('resize.' + pluginName, $.proxy(self._onResize, self));
},

    // ── Build wrapper DOM ──────────────────────────────────────────────────
    _buildDOM: function () {
      var self = this, o = self.options;

      self.$el.addClass('filter-wrap');

      // Filter bar
      if (o.showFilters) {
        self.$filterBar = $('<div class="filter-bar' + (o.filterBarClass ? ' ' + o.filterBarClass : '') + '"></div>');
        var categories = self._getCategories();
        var $btnGroup  = $('<div class="filter-group' + (o.filterBarBtnGroupClass ? ' ' + o.filterBarBtnGroupClass : '') + '"></div>');

        $('<button class="filter-btn filter-active' + (o.filterBtnClass ? ' ' + o.filterBtnClass : '') + '" data-filter="all"><span class="elementskit_filter_nav_text">' + o.allLabel + '</span></button>')
          .appendTo($btnGroup);

        $.each(categories, function (i, cat) {
          $('<button class="filter-btn' + (o.filterBtnClass ? ' ' + o.filterBtnClass : '') + '" data-filter="' + cat + '"><span class="elementskit_filter_nav_text">' +
            self._capitalize(cat) + '</span></button>').appendTo($btnGroup);
        });

        self.$filterBar.append($btnGroup);

        self.$countBadge = $('<span class="filter-count"></span>');
        self.$filterBar.append(self.$countBadge);
        self.$el.append(self.$filterBar);
      }

      // Grid container
      self.$grid = $('<div class="filter-grid"></div>');
      self.$el.append(self.$grid);

      // Move existing .filter-item children into grid, or keep grid as-is
      self.$el.children('.filter-item').appendTo(self.$grid);
    },

    // ── Collect item metadata ──────────────────────────────────────────────
    _collectItems: function () {
      var self = this, o = self.options;
      self.items = [];

      self.$grid.find('.filter-item').each(function () {
        var $item = $(this);
        self.items.push({
          $el:      $item,
          category: $item.data(o.categoryAttr) || 'general',
          cols:     parseInt($item.data('cols')) || 1,
          rows:     parseInt($item.data('rows')) || 1,
        });
      });
    },

    // ── Gather unique categories ───────────────────────────────────────────
    _getCategories: function () {
      var cats = [], o = this.options;
      this.$el.find('.filter-item').each(function () {
        var c = $(this).data(o.categoryAttr);
        if (c && $.inArray(c, cats) === -1) cats.push(c);
      });
      return cats;
    },

    // ── Bind all events ────────────────────────────────────────────────────
    _bindEvents: function () {
      var self = this;

      // Filter buttons
      self.$el.on('click.' + pluginName, '.filter-btn', function () {
        var $btn = $(this);
        self.$el.find('.filter-btn').removeClass('filter-active');
        $btn.addClass('filter-active');
        self.filter($btn.data('filter'));
      });

      // Item click
      self.$el.on('click.' + pluginName, '.filter-item', function () {
        var $item = $(this);
        if ($.isFunction(self.options.onItemClick)) {
          self.options.onItemClick.call(self, $item, $item.data());
        }
      });
    },

    // ── Resize handler ─────────────────────────────────────────────────────
    _onResize: function () {
      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout($.proxy(this.layout, this), 120);
    },

    // ── Get responsive column count ────────────────────────────────────────
    _getCols: function () {
      var w = $(window).width(), bp = this.options.responsive;
      for (var i = 0; i < bp.length; i++) {
        if (w <= bp[i].maxWidth) return bp[i].columns;
      }
      return this.options.columns;
    },

    _getBentoUnitH: function () {
      var w = $(window).width(), bp = this.options.responsive;
      for (var i = 0; i < bp.length; i++) {
        if (w <= bp[i].maxWidth) return bp[i].bentoUnitHeight;
      }
      return this.options.bentoUnitHeight;
    },

    // ── Public: filter(category) ───────────────────────────────────────────
    filter: function (category) {
      var self = this;
      self.currentFilter = category || 'all';
      self.layout();

      if ($.isFunction(self.options.onFilter)) {
        var visible = self._getVisible();
        self.options.onFilter.call(self, self.currentFilter, visible);
      }
      return self;
    },

    // ── Public: setLayout(name) ────────────────────────────────────────────
    setLayout: function (name) {
      this.currentLayout = name;
      this.layout();

      if ($.isFunction(this.options.onLayout)) {
        this.options.onLayout.call(this, name);
      }
      return this;
    },

    // ── Public: layout() — runs current layout ─────────────────────────────
    layout: function () {
      var self = this;
      var visible = self._getVisible();
      var hidden  = self._getHidden();

      // Hide filtered-out items
      hidden.forEach(function (item) {
        item.$el.addClass('filter-hidden');
      });
      visible.forEach(function (item) {
        item.$el.removeClass('filter-hidden');
      });

      // For masonry: wait for images then layout
      // For grid/bento: images don't affect height so layout immediately
      if (self.currentLayout === 'masonry') {
        self._layoutMasonryWhenReady(visible);
      } else {
        requestAnimationFrame(function () {
          if (self.currentLayout === 'grid') self._layoutGrid(visible);
          else                               self._layoutBento(visible);
        });
      }

      return self;
    },

    _getVisible: function () {
      var self = this;
      return self.items.filter(function (item) {
        return self.currentFilter === 'all' || item.category === self.currentFilter;
      });
    },

    _getHidden: function () {
      var self = this;
      return self.items.filter(function (item) {
        return self.currentFilter !== 'all' && item.category !== self.currentFilter;
      });
    },

    // ── Wait for images inside visible items, then run masonry ────────────
    // FIX: On page load, outerHeight() returns wrong values if images haven't
    //      loaded yet — causing rowGap to appear larger than defined.
    //      This collects all unloaded <img> tags inside visible items and
    //      defers the layout until every image fires load or error.
    //      After a filter tab change images are already loaded so the
    //      promise resolves instantly with no visible delay.
    _layoutMasonryWhenReady: function (visible) {
      var self    = this;
      var pending = [];

      visible.forEach(function (item) {
        item.$el.find('img').each(function () {
          // naturalWidth === 0 means not yet decoded/loaded
          if (!this.complete || this.naturalWidth === 0) {
            pending.push(this);
          }
        });
      });

      if (pending.length === 0) {
        // All images already loaded — layout on next paint
        requestAnimationFrame(function () {
          self._layoutMasonry(visible);
        });
        return;
      }

      // Wait for every pending image to finish (load or error)
      var settled = 0;
      var total   = pending.length;

      function onSettle() {
        settled++;
        if (settled === total) {
          // Double rAF: first lets the browser apply dimensions,
          // second ensures a full paint cycle so outerHeight() is accurate
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              self._layoutMasonry(visible);
            });
          });
        }
      }

      pending.forEach(function (img) {
        $(img).one('load error', onSettle);
      });
    },

    // ── Masonry layout ─────────────────────────────────────────────────────
   _layoutMasonry: function (visible) {
  var self = this, o = self.options;
  var cols   = self._getCols();
  var rowGap = o.rowGap || 0;
  var colGap = o.colGap || 0;
  var W      = self.$grid.width();

  if (!W) return;

  // FIX: Disable transitions before measuring so outerHeight()
  // reads the final settled value, not a mid-animation value
  self.$grid.find('.filter-item').css('transition', 'none');

  var cw   = (W - (cols - 1) * colGap) / cols;
  var colH = [];
  for (var i = 0; i < cols; i++) colH.push(0);

  visible.forEach(function (item) {
    item.$el.css({ width: cw, height: '' });
  });

  // FIX: Force a reflow so the browser applies the new width
  // BEFORE we read outerHeight()
  self.$grid[0].offsetHeight; // triggers reflow

  visible.forEach(function (item) {
    var minH = Math.min.apply(null, colH);
    var col  = colH.indexOf(minH);
    item.$el.css({
      left: col * (cw + colGap),
      top:  colH[col],
    });
    colH[col] += item.$el.outerHeight(false) + rowGap;
  });

  var maxH = Math.max.apply(null, colH);
  if (maxH > 0) self.$grid.css('height', maxH);

  // FIX: Re-enable transitions after a frame so the browser
  // doesn't animate from the old position to new position wrong
  requestAnimationFrame(function () {
    self.$grid.find('.filter-item').css('transition', '');
  });
},

    // ── Grid layout ────────────────────────────────────────────────────────
    _layoutGrid: function (visible) {
      var self = this, o = self.options;
      var cols   = self._getCols();
      var rowGap = o.rowGap || 0;
      var colGap = o.colGap || 0;
      var W      = self.$grid.width();

      // FIX: Bail if grid has no width yet (not painted)
      if (!W) return;

      var cw = (W - (cols - 1) * colGap) / cols;
      var rh = Math.round(cw * 0.85);

      visible.forEach(function (item, i) {
        var col = i % cols;
        var row = Math.floor(i / cols);
        item.$el.css({
          width:  cw,
          height: rh,
          left:   col * (cw + colGap),
          top:    row * (rh + rowGap),
        });
      });

      var rows   = Math.ceil(visible.length / cols);
      var totalH = rows * rh + (rows - 1) * rowGap;

      // FIX: Only set height if calculated value is meaningful
      if (totalH > 0) self.$grid.css('height', totalH);
    },

    // ── Bento layout ───────────────────────────────────────────────────────
    _layoutBento: function (visible) {
      var self = this, o = self.options;
      var cols   = self._getCols();
      var rowGap = o.rowGap || 0;
      var colGap = o.colGap || 0;
      var unitH  = self._getBentoUnitH();
      var W      = self.$grid.width();

      // FIX: Bail if grid has no width yet (not painted)
      if (!W) return;

      var unit   = (W - (cols - 1) * colGap) / cols;
      var occ    = [];
      var maxRow = 0;

      function isFree(c, r, cs, rs) {
        if (c + cs > cols) return false;
        for (var rr = r; rr < r + rs; rr++)
          for (var cc = c; cc < c + cs; cc++)
            if (occ[rr * cols + cc]) return false;
        return true;
      }

      function occupy(c, r, cs, rs) {
        for (var rr = r; rr < r + rs; rr++)
          for (var cc = c; cc < c + cs; cc++)
            occ[rr * cols + cc] = true;
        maxRow = Math.max(maxRow, r + rs);
      }

      function findSlot(cs, rs) {
        for (var r = 0; r < 200; r++)
          for (var c = 0; c <= cols - cs; c++)
            if (isFree(c, r, cs, rs)) { occupy(c, r, cs, rs); return { c: c, r: r }; }
        return { c: 0, r: 0 };
      }

      visible.forEach(function (item) {
        var cs = Math.min(item.cols || 1, cols);
        var rs = item.rows || 1;

        // On 1-col breakpoint force single cell
        if (cols === 1) { cs = 1; rs = 1; }

        var slot = findSlot(cs, rs);
        var x    = slot.c * (unit + colGap);
        var y    = slot.r * (unitH + rowGap);
        var w    = cs * unit + (cs - 1) * colGap;
        var h    = rs * unitH + (rs - 1) * rowGap;

        item.$el.css({
          width:  Math.round(w),
          height: Math.round(h),
          left:   Math.round(x),
          top:    Math.round(y),
        });
      });

      self.$grid.css(
        'height',
        maxRow > 0 ? maxRow * unitH + (maxRow - 1) * rowGap : 0
      );
    },

    // ── Public: destroy() ─────────────────────────────────────────────────
    destroy: function () {
      $(window).off('resize.' + pluginName);
      $(window).off('load.' + pluginName);
      this.$el.off('.' + pluginName);
      this.$filterBar && this.$filterBar.remove();
      this.$grid.find('.filter-item').css({ position: '', width: '', height: '', left: '', top: '' });
      this.$el.removeClass('filter-wrap');
      $.removeData(this.el, 'plugin_' + pluginName);
    },

    // ── Utility ────────────────────────────────────────────────────────────
    _capitalize: function (s) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    },
  });

  // ─── jQuery Plugin Bridge ─────────────────────────────────────────────────
  $.fn[pluginName] = function (options) {
    var args = arguments;

    if (typeof options === 'string') {
      // API call: $(el).GalleryFilter('filter', 'design')
      return this.each(function () {
        var instance = $.data(this, 'plugin_' + pluginName);
        if (instance && typeof instance[options] === 'function') {
          instance[options].apply(instance, Array.prototype.slice.call(args, 1));
        }
      });
    }

    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new GalleryFilter(this, options));
      }
    });
  };

})(jQuery, window, document);
