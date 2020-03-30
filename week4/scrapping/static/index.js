function openclose() {
    if ($('#posting-box').css('display') == 'block') {
        $('#posting-box').hide();
        $('#btn-posting-box').text('포스팅 박스 열기')
    } else {
        $('#posting-box').show();
        $('#btn-posting-box').text('포스팅 박스 닫기')
    }
}

$(document).ready(function() {
    $('#cards-box').html('');
    listing();
});

function listing() {
    $.ajax({
        type: "GET",
        url: "/reviews",
        data: {},
        success: function(response) {
            console.log(response)
            let reviews = response['reviews'];
            for (let i = 0; i < reviews.length; i++) {
                make_card(
                    reviews[i]['star'],
                    reviews[i]['title'])
            }
        }
    })
}

function make_card(star, title) {
    let temp_html = '<div class="card">\
      <div class="card-body">\
        <a class="card-title">' + title + '</a>\
        <p class="card-text">' + star + '</p>\
      </div>\
    </div>';
    $('#cards-box').append(temp_html);
}