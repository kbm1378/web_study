// "주문하기" 버튼 클릭시 아래 함수 호출을 위해 HTML 태그에 onClick을 선언해줍니다. 
function submitOrder() {
    /* 
    1) 입력값에 대한 체크 작업을 "유효성 검사 (Input validation)" 이라 합니다. (ex: 빈칸 여부, 전화번호 포맷 체크)
       추후 구글링시 빈번하게 활용될 수 있는 키워드이므로 기억해두세요! (구글링 해보기)
    2) 한편 이 작업을 아래처럼 isValidOrder 이라는 함수로 따로 뺄 수 도 있습니다. 이를 통한 이점은 
       a. 코드 가독성 개선입니다. 
          본 함수의 실질적 기능은 주문에 대한 진행이므로 유효성 검사 부분을 다른 함수로 빼서, 추후 보다 길어질 주문 완료에 대한 코드가 보다 쉽게 읽히도록 합니다.
       b. 코드 짤때도 더 편합니다. 
          우선 아래 처럼 큰 틀을 짜두고 세부 내용을 채워가는 식으로 하는 것이 실수할 가능성을 줄일 수 있습니다. 
    */

    // 조건문 : 상황/경우에 따라 다른 기능을 수행하기 위해 사용합니다. (ex: 값 입력 안된 경우 or 입력 모두 된 경우)
    // 모두 유효한 경우 true, 아닌 경우 false 로 나오도록 했습니다. 
    if (!isValidOrder()) {
        // !는 앖의 boolean 값을 뒤집는 연산자로 위 조건은 유효하지 않은 경우를 의미합니다. 
        // 이렇게 반대로 뒤집은 이유는 의미적으로 앞에서 걸러낸다는 점을 표현하기 위해서입니다. (반대로 해보면.. 주문 완료가 위로 감)
        return;
        // return은 함수의 종료를 의미합니다. 사실 이 상황에서는 안써줘도 무방하나 명시적 표현을 위해 사용합니다. 
    } else {
        alert("주문완료!")
            // $().val('A') : 특정 input 태그에 값 입력하기 
        $('#input-name').val('');
        $('#input-count').val('');
        $('#input-address').val('');
        $('#input-phone').val('');
    }
}

function isValidOrder() {
    // 변수 : 변경될 수 있는 값을 담기 위해 필요합니다. (ex: 주문자 이름, 수량, 주소, 전화번호)
    // $().val() : 특정 input 태그의 값 가져오기 (위 $().val('A')와 비교)
    let name = $('#input-name').val();
    let count = $('#input-count').val();
    let address = $('#input-address').val();
    let phone = $('#input-phone').val();

    if (name === '') {
        alert('주문자 이름을 입력해주세요.')
            // $().focus() : 특정 input 태그에 포커스가 맞춰지도록 하기
        $('#input-name').focus()
        return false;
    } else if (count === '') {
        // 위 조건문을 위해 HTML 태그에서 디폴트 옵션 부분에 value=''를 선언해줘야 합니다. 
        alert('수량을 입력해주세요.')
        $('#input-count').focus()
        return false;
    } else if (address === '') {
        alert('주소를 입력해주세요.')
        $('#input-address').focus()
        return false;
    } else if (phone === '') {
        alert('전화번호를 입력해주세요.')
        $('#input-phone').focus()
        return false;
    } else if (!isValidPhoneNum(phone)) {
        // 함수 : 여러번 사용되는 기능을 묶어두기 위해 사용합니다. (ex: 전화번호 포맷 유효성 검사)
        alert('휴대폰번호 입력 형식이 틀립니다.\n010-0000-0000으로 입력해주세요.')
        return false;
    }
    return true;
}

function isValidPhoneNum(phone) {
    // 조건 : A-B-C (A : 010,  B : 숫자 4자리, C:  숫자 4자리)
    // 방법?
    // 1) '-'로 split 한다. 이때 무조건 3조각으로 나뉘어야 한다.
    // 2) A조각은 무조건 010
    // 3) B와 C조각은 숫자로 이루어진 4자리 
    let splitByHyphen = phone.split('-')
    if (splitByHyphen.length != 3) {
        return false;
    } else if (splitByHyphen[0] !== '010') {
        return false;
    } else if (isNaN(splitByHyphen[1]) || isNaN(splitByHyphen[2])) {
        // google : js check string is number
        // https://stackoverflow.com/questions/175739/built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
        return false;
    } else if (splitByHyphen[1].length !== 4 || splitByHyphen[2].length !== 4) {
        return false;
    }
    return true;
}