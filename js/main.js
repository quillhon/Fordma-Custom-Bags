var constraints = {
  email: {
    presence: true,
    email: true
  },
  name: {
    presence: true
  }
}

var selection = {
  trimming: null,
  body: null,
  cover: null
}

var trimmingOptions = {
  colors: [
    { text: 'Black',  alias: 'black',  color: '#000000' },
    { text: 'Blue',   alias: 'blue',   color: '#c9be5d' },
    { text: 'Brown',  alias: 'brown',  color: '#517fe4' },
    { text: 'Green',  alias: 'green',  color: '#801847' },
    { text: 'Grey',   alias: 'grey',   color: '#801847' },
    { text: 'Orange', alias: 'orange', color: '#fef652' },
    { text: 'Pink',   alias: 'pink',   color: '#5890cd' },
    { text: 'Red',    alias: 'red',    color: '#9062f9' },
    { text: 'White',  alias: 'white',  color: '#9062f9' },
    { text: 'Yellow', alias: 'yellow', color: '#9062f9' }
  ]
}

var bodyOptions = [
  { 
    alias: '600', 
    material: '600', 
    colors: [
      { text: '600 Black',          alias: 'black',         color: '#8e7a04' },
      { text: '600 Blue',           alias: 'blue',          color: '#c9be5d' },
      { text: '600 Brown',          alias: 'brown',         color: '#517fe4' },
      { text: '600 Dark Grey',      alias: 'dark_grey',     color: '#801847' },
      { text: '600 Green',          alias: 'green',         color: '#801847' },
      { text: '600 Kahai',          alias: 'kahai',         color: '#fef652' },
      { text: '600 Military Green', alias: 'military_green', color: '#5890cd' },
      { text: '600 Navy',           alias: 'navy',          color: '#9062f9' },
      { text: '600 Orange',         alias: 'orange',        color: '#9062f9' },
      { text: '600 Purple',         alias: 'purple',        color: '#9062f9' },
      { text: '600 Red',            alias: 'red',           color: '#9062f9' },
      { text: '600 Sky_blue',       alias: 'sky_blue',      color: '#9062f9' },
      { text: '600 White',          alias: 'white',         color: '#9062f9' },
      { text: '600 Yellow',         alias: 'yellow',        color: '#9062f9' }
    ],
  },
  { 
    alias: '1000', 
    material: '1000', 
    colors: [
      { text: '1000 Purple',   alias: 'purple',   color: '#9062f9' },
      { text: '1000 Red',      alias: 'red',      color: '#9062f9' },
      { text: '1000 Sky Blue', alias: 'sky_blue', color: '#9062f9' },
      { text: '1000 White',    alias: 'white',    color: '#9062f9' },
      { text: '1000 Yellow',   alias: 'yellow',   color: '#9062f9' }
    ] 
  }
]

var coverOptions = [
  { 
    alias: '600', 
    material: '600', 
    colors: [
      { text: '600 Beige',         alias: 'beige',           color: '#c9be5d' },
      { text: '600 Black',         alias: 'black',           color: '#8e7a04' },
      { text: '600 Blue',          alias: 'blue',            color: '#517fe4' },
      { text: '600 Brown',         alias: 'brown',           color: '#517fe4' },
      { text: '600 Dark Grey',     alias: 'dark_grey',       color: '#801847' },
      { text: '600 Green',         alias: 'green',           color: '#801847' },
      { text: '600 Military Green', alias: 'military_green', color: '#5890cd' },
      { text: '600 Navy',          alias: 'navy',            color: '#9062f9' },
      { text: '600 Orange',        alias: 'orange',          color: '#9062f9' },
      { text: '600 Pink',          alias: 'pink',            color: '#9062f9' },
      { text: '600 Purple',        alias: 'purple',          color: '#9062f9' },
      { text: '600 Red',           alias: 'red',             color: '#9062f9' },
      { text: '600 Sky Blue',      alias: 'sky_blue',        color: '#9062f9' },
      { text: '600 White',         alias: 'white',           color: '#9062f9' },
      { text: '600 Yellow',        alias: 'yellow',          color: '#9062f9' }
    ],
  },
  { 
    alias: '1000', 
    material: '1000', 
    colors: [
      { text: 'Green',         alias: 'green',         color: '#801847' },
      { text: 'Military Grey', alias: 'military_grey', color: '#5890cd' },
      { text: 'Navy',          alias: 'navy',          color: '#9062f9' },
      { text: 'Orange',        alias: 'orange',        color: '#9062f9' }
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

function init() {
  selection.trimming = trimmingOptions.colors[Math.floor(Math.random() * trimmingOptions.colors.length)]
  selection.body = bodyOptions[0].colors[Math.floor(Math.random() * bodyOptions[0].colors.length)]
  selection.cover = coverOptions[0].colors[Math.floor(Math.random() * coverOptions[0].colors.length)]
  updateBagOutlook()
}

function updateBagOutlook() {
  $('#face-trimming-image').attr('src', 'img/commuter/face/trimming_' + selection.trimming.alias + '.png')
  $('#face-body-image').attr('src', 'img/commuter/face/body_' + selection.body.alias + '.png')
  $('#face-cover-image').attr('src', 'img/commuter/face/cover_' + selection.cover.alias + '.png')
}

function prepareColorOptions(selectedColor, onChange) {
  $('.color-option a').each(function(index, ele) {
    if ($(this).data('alias') == selectedColor) {
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
    $('.color-option a.active').removeClass('active').html('')
    $(this).addClass('active')
    $(this).html('<i class="fa fa-check" aria-hidden="true"></i>')
    
    onChange($(this).data())
  })
}

function validation() {
  var $btn = $('#review-order-button').button('loading')

  $('#email-group').removeClass('has-error')
  $('#name-group').removeClass('has-error')

  var data = {
    email: $('#email').val(),
    name : $('#name').val()
  }

  var validateResult = validate(data, constraints)
  if (validateResult) {
    $.each(validateResult, function(name, error) {
      $('#' + name + '-group').addClass('has-error')
    })
    $btn.button('reset')
    return false;
  } else {
    $.extend(data, selection)
    return true;
  }
}

function submitOrder() {
  console.log('submitOrder la')
}

$.templates('ColorOption', '<li class="color-option"><a data-text={{:text}} data-alias="{{:alias}}" data-color="{{:color}}"></a></li>')
$.templates('ColorSelect', '<ul class="color-select">{{for colors tmpl="ColorOption" /}}</ul>')
$.templates('MaterialSelect', '<h4>{{:material}}</h4><ul class="material-select">{{for colors tmpl="ColorOption" /}}</ul>')

/* ============================
 * Trimming Color
 * ============================ */
$('#trimming-color').on('click', function() {
  $('.colors-panel .panel-body').html($.templates.ColorSelect(trimmingOptions))
  prepareColorOptions(selection.trimming.alias, function(newChoice) {
    selection.trimming = newChoice
    updateBagOutlook()
  })
})

/* ============================
 * Body Color
 * ============================ */
$('#body-color').on('click', function() {
  $('.colors-panel .panel-body').html($.templates.MaterialSelect(bodyOptions))
  prepareColorOptions(selection.body.alias, function(newChoice) {
    selection.body = newChoice
    updateBagOutlook()
  })
})

/* ============================
 * Cover Color
 * ============================ */
$('#cover-color').on('click', function() {
  $('.colors-panel .panel-body').html($.templates.MaterialSelect(coverOptions))
  prepareColorOptions(selection.cover.alias, function(newChoice) {
    selection.cover = newChoice
    updateBagOutlook()
  })
})

/* ============================
 * Submittion
 * ============================ */
$('#review-order-button').on('click', function(event){
  if (validation()) {
    $('#order-review-modal').modal('show')
  }
})

$('#order-review-modal').on('show.bs.modal', function(event) {
  var modal = $(this)
  
  var data = {
    email: $('#email').val(),
    name : $('#name').val(),
    trimming: selection.trimming.text,
    body: selection.body.text,
    cover: selection.cover.text
  }
  
  Object.keys(data).map(function(field) {
    modal.find('.modal-body .title-' + field).html(field)
    modal.find('.modal-body .data-' + field).html(data[field])
  })
})

$('#submit-order-button').on('click', submitOrder);

/* ============================
 * Init page
 * ============================ */
init()
$('.preview-main').slick();
$('#trimming-color').click()