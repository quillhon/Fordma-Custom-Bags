var selection = {
  trimmingColor: 'a',
  bodyMaterial: '600',
  bodyColor: 'a',
  coverMaterial: '600',
  coverColor: 'a'
}

var trimmingOptions = {
  colors: [
    { alias: 'a', color: '#8e7a04' },
    { alias: 'b', color: '#c9be5d' },
    { alias: 'c', color: '#517fe4' },
    { alias: 'd', color: '#801847' },
    { alias: 'e', color: '#801847' },
    { alias: 'f', color: '#fef652' },
    { alias: 'g', color: '#5890cd' },
    { alias: 'l', color: '#9062f9' }
  ]
}

var bodyOptions = [
  { 
    alias: '600', 
    material: '600', 
    colors: [
      { alias: 'a', color: '#8e7a04' },
      { alias: 'b', color: '#c9be5d' },
      { alias: 'c', color: '#517fe4' },
      { alias: 'd', color: '#801847' },
      { alias: 'e', color: '#801847' },
      { alias: 'f', color: '#fef652' },
      { alias: 'g', color: '#5890cd' },
      { alias: 'l', color: '#9062f9' }
    ],
  },
  { 
    alias: '1000', 
    material: '1000', 
    colors: [
      { alias: '1', color: '#8e7a04' },
      { alias: '2', color: '#c9be5d' },
      { alias: '3', color: '#517fe4' },
      { alias: '4', color: '#801847' }
    ] 
  }
]

var coverOptions = [
  { 
    alias: '600', 
    material: '600', 
    colors: [
      { alias: 'a', color: '#8e7a04' },
      { alias: 'b', color: '#c9be5d' },
      { alias: 'c', color: '#517fe4' },
      { alias: 'd', color: '#801847' },
      { alias: 'e', color: '#801847' },
      { alias: 'f', color: '#fef652' },
      { alias: 'g', color: '#5890cd' },
      { alias: 'l', color: '#9062f9' }
    ],
  },
  { 
    alias: '1000', 
    material: '1000', 
    colors: [
      { alias: '1', color: '#8e7a04' },
      { alias: '2', color: '#c9be5d' },
      { alias: '3', color: '#517fe4' },
      { alias: '4', color: '#801847' }
    ] 
  }
]

function ColorLuminance(hex, lum) {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  }
  lum = lum || 0;

  // convert to decimal and change luminosity
  var rgb = "#", c, i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i*2,2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00"+c).substr(c.length);
  }

  return rgb;
}

function closeAllPopovers() {
  $('#trimming-color').popover('hide')
  $('#body-material').popover('hide')
  $('#body-color').popover('hide')
  $('#cover-material').popover('hide')
  $('#cover-color').popover('hide')
}

function updateText() {
  $('#trimming-color-text').html(selection.trimmingColor)
  $('#body-material-text').html(selection.bodyMaterial)
  $('#body-color-text').html(selection.bodyColor)
  $('#cover-material-text').html(selection.coverMaterial)
  $('#cover-color-text').html(selection.coverColor)
}

updateText()

$.templates('MaterialOption', '<li class="material-option"><a data-alias="{{:alias}}">{{:material}}</a></li>')
$.templates('MaterialSelect', '<ul class="material-select">{{for materials tmpl="MaterialOption" /}}</ul>')

$.templates('ColorOption', '<li class="color-option"><a data-alias="{{:alias}}" data-color="{{:color}}"></a></li>')
$.templates('ColorSelect', '<ul class="color-select">{{for colors tmpl="ColorOption" /}}</ul>')

var popoverOptions = {
  html: true,
  trigger: 'manual',
  placement: 'left'
}

/* ============================
 * Trimming Color
 * ============================ */
$('#trimming-color').popover($.extend({}, popoverOptions, {
  content: $.templates.ColorSelect(trimmingOptions)
}))

$('#trimming-color').on('click', function() {
  closeAllPopovers()
  $(this).popover('toggle')
})

$('#trimming-color').on('shown.bs.popover', function() {
  $('.color-option a').css('background-color', function() {
    return $(this).data('color')
  })
  $('.color-option a').on('click', function() {
    selection.trimmingColor = $(this).data('alias')
    updateText()
    $('#trimming-color').popover('toggle')
  })
})

/* ============================
 * Body Material
 * ============================ */
$('#body-material').popover($.extend({}, popoverOptions, {
  content: $.templates.MaterialSelect({ materials: bodyOptions })
}))

$('#body-material').on('click', function() {
  closeAllPopovers()
  $(this).popover('toggle')
})

$('#body-material').on('shown.bs.popover', function() {
  $('.material-option a').on('click', function() {
    if (selection.bodyMaterial != $(this).data('alias')) {
      selection.bodyColor = ''
    }
    selection.bodyMaterial = $(this).data('alias')
    updateText()
    $('#body-material').popover('toggle')
  })
})

/* ============================
 * Body Color
 * ============================ */
$('#body-color').popover($.extend({}, popoverOptions, {
  content: function() {
    var options = { }
    $.each(bodyOptions, function(index, value) {
      if (value.alias == selection.bodyMaterial) {
        options.colors = value.colors
        return false
      }
    })
    return $.templates.ColorSelect(options)
  }
}))

$('#body-color').on('click', function() {
  closeAllPopovers()
  $(this).popover('toggle')
})

$('#body-color').on('shown.bs.popover', function() {
  $('.color-option a').css('background-color', function() {
    return $(this).data('color')
  })
  $('.color-option a').on('click', function() {
    selection.bodyColor = $(this).data('alias')
    updateText()
    $('#body-color').popover('toggle')
  })
})

/* ============================
 * Cover Material
 * ============================ */
$('#cover-material').popover($.extend({}, popoverOptions, {
  content: $.templates.MaterialSelect({ materials: coverOptions })
}))

$('#cover-material').on('click', function() {
  closeAllPopovers()
  $(this).popover('toggle')
})

$('#cover-material').on('shown.bs.popover', function() {
  $('.material-option a').on('click', function() {
    if (selection.coverMaterial != $(this).data('alias')) {
      selection.coverColor = ''
    }
    selection.coverMaterial = $(this).data('alias')
    updateText()
    $('#cover-material').popover('toggle')
  })
})

/* ============================
 * Cover Color
 * ============================ */
$('#cover-color').popover($.extend({}, popoverOptions, {
  content: function() {
    var options = { }
    $.each(coverOptions, function(index, value) {
      if (value.alias == selection.coverMaterial) {
        options.colors = value.colors
        return false
      }
    })
    return $.templates.ColorSelect(options)
  }
}))

$('#cover-color').on('click', function() {
  closeAllPopovers()
  $(this).popover('toggle')
})

$('#cover-color').on('shown.bs.popover', function() {
  $('.color-option a').each(function(index, ele) {
    if ($(this).data('alias') == selection.coverColor) {
      $(this).addClass('active')
      $(this).html('<i class="fa fa-check" aria-hidden="true"></i>')
    }
  })
  $('.color-option a').css('background', function() {
    var color = $(this).data('color')
    var lighter = ColorLuminance(color, 0.2)
    return '-webkit-linear-gradient(45deg, ' + color + ' 0%, ' + lighter + ' 100%)'
  })
  $('.color-option a').on('click', function() {
    selection.coverColor = $(this).data('alias')
    updateText()
    $('#cover-color').popover('toggle')
  })
})
