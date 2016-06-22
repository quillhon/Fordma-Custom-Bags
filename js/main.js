var selection = {
  bodyColor: ''
}

var colors = {
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

$.templates('ColorOption', '<li class="color-option"><a data-alias="{{:alias}}" data-color="{{:color}}"></li>')
$.templates('ColorSelect', '<ul class="color-select">{{for colors tmpl="ColorOption" /}}</ul>')

$('#body-color').popover({
  html: true,
  trigger: 'manual',
  content: $.templates.ColorSelect(colors)
})

$('#body-color').on('click', function() {
  $(this).popover('toggle')
})

$('#body-color').on('shown.bs.popover', function() {
  $('.color-option a').css('background-color', function() {
    return $(this).data('color')
  })
  $('.color-option a').on('click', function() {
    selection.bodyColor = $(this).data('alias')
    $('#body-color-text').html(selection.bodyColor)
    $('#body-color').popover('toggle')
  })
})
