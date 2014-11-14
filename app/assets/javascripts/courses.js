$(document).ready(function(){
  $.getJSON('/courses', function(result){
    result.forEach(function(course){
      var template = '<li class="course" data-details="' + course.details + '">' + course.name + '<span data-id="' + course.id + '"class="delete"> x</span></li>';
      $('.courses').append(template);
    })
  })

  // $.ajax({url: 'http://www.reddit.com/r/programming.json'}).done(function(result){
  //   debugger;
  // })

  $.getJSON('http://charts.spotify.com/api/tracks/most_streamed/global/daily/latest?callback=?', function(result){
    debugger;
  })

  $('.courses').on('click', '.delete', function(event){
    event.stopPropagation();
    var id = $(this).data('id');
    $.ajax({url: '/courses/' + id, type: "DELETE"}).done(
      function(result){
        var id = result.id;
        $('[data-id=' + id + ']').parent('.course').remove()
      }
    )
  })

  $('.courses').on('click', '.course', function(event){
    if($(this).find('.details').length === 0){
      var $li = $(this);
      var details = $li.data('details');
      var template = '<div class="details">' +
      details +
      '</div>';
      $li.append(template);
    } else {
      $(this).find('.details').remove();
    }
  })

  $('#new-course').submit(function(event){
    event.preventDefault();
    var $form = $(this);
    var name = $form.find('.course-input').val();
    var details = $form.find('.course-details').val();
    $.post('/courses', {name: name, details: details}, function(result){
      var template = '<li class="course" data-details="' +
      result.details +
      '">' +
      result.name +
      '<span data-id="' + result.id + '"class="delete"> x</span></li>';
      $('.courses').append(template);
      $form.find('.course-input').val("");
      $form.find('.course-details').val("");
      $('.error').text("");
    }).fail(function(error){
      $('.error').text(error.responseJSON.error);
    })
  });

});
