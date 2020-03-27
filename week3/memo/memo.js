function openclose() {
    if ($('#posting-box').css('display') == 'block') {
        $('#posting-box').hide();
        $('#btn-posting-box').text('포스팅 박스 열기')
    } else {
        $('#posting-box').show();
        $('#btn-posting-box').text('포스팅 박스 닫기')
    }
}

// 페이지 로드가 완료되면 {} 내부의 코드가 실행된다. 
$(document).ready(function() {
    $('#cards-box').html(''); // 기존 카드 지우기 
    listing(); // listing 함수 실행 (가독성을 위해 쪼갠 것)
});

// listing 함수 구현 부분 
// function <함수 이름> () {} 형태로 작성합니다. 
function listing() {
    // ajax 함수 구성요소 : type, url, data, success 
    $.ajax({
        type: "GET",
        url: "http://spartacodingclub.shop/post",
        data: {},
        // API 통신이 성공하면 {} 내부 코드가 실행된다. 
        // 통신 결과로 받은 데이터는 response 라는 변수에 저장된다. 
        success: function(response) {
            let articles = response['articles']; // response 구조 파악 후 필요한 정보만 articles 변수에 담기 
            for (let i = 0; i < articles.length; i++) { // 복수개 정보 -> 복수개 카드 만들 것이므로 반복문 
                // response 구조 파악에 따라 넣어줄 정보만 뽑아냄
                // make_card 함수 실행 (역시 가독성을 위해 쪼갠 것)
                make_card(
                    articles[i]['comment'],
                    articles[i]['desc'],
                    articles[i]['image'],
                    articles[i]['title'],
                    articles[i]['url'])
            }
        }
    })
}

// make_card 함구 구현 부분 
// make_card 함수의 기능은 공통된 부분 (카드 HTML 화면에 더하기)과 다른 부분 (내부에 넣는 이미지, 제목, 링크 url 등)이 있음
// -> 이 경우 아래 처럼 함수 정의시 변수를 만들어 넣어주는 방식으로 처리
// 주의! 아래 함수 정의시 변수의 순서를 그대로 맞추어 위에 호출 부분에 넣어야 함.
function make_card(comment, desc, image, title, url) {
    // 원래 한줄에 쭉써도 되지만 가독성을 위해 여러줄로 나눔 
    // 한편, 이 경우 \(역슬래시) 를 꼭 넣어줘야 함
    let temp_html = '<div class="card">\
      <img class="card-img-top" src="' + image + '" alt="Card image cap">\
      <div class="card-body">\
        <a href="' + url + '" class="card-title">' + title + '</a>\
        <p class="card-text">' + desc + '</p>\
        <p class="card-text comment">' + comment + '</p>\
      </div>\
    </div>';
    // 위에서 title은 변수. 실제 담는 값은 뭘까? 
    // title -> articles[i]['title'] -> '겨울왕국2'

    $('#cards-box').append(temp_html); // temp_html을 <div id="cards-box"></div> 내부에 붙여주는 코드
}