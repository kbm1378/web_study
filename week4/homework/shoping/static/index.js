function submitOrder() {
    if (!isValidOrder()) {
        return;
    } else {
        $.ajax({
            type: "POST",
            url: "/order",
            data: {},
            success: function(response) {
                alert(response.msg)
                $('#input-name').val('');
                $('#input-count').val('');
                $('#input-address').val('');
                $('#input-phone').val('');
            }
        });
    }
}

function isValidOrder() {
    let name = $('#input-name').val();
    let count = $('#input-count').val();
    let address = $('#input-address').val();
    let phone = $('#input-phone').val();

    if (name === '') {
        alert('주문자 이름을 입력해주세요.')
        $('#input-name').focus()
        return false;
    } else if (count === '') {
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
        alert('휴대폰번호 입력 형식이 틀립니다.\n010-0000-0000으로 입력해주세요.')
        return false;
    }
    return true;
}

function isValidPhoneNum(phone) {
    let splitByHyphen = phone.split('-')
    if (splitByHyphen.length != 3) {
        return false;
    } else if (splitByHyphen[0] !== '010') {
        return false;
    } else if (isNaN(splitByHyphen[1]) || isNaN(splitByHyphen[2])) {
        return false;
    } else if (splitByHyphen[1].length !== 4 || splitByHyphen[2].length !== 4) {
        return false;
    }
    return true;
}


function addWishlist() {
    let heart = $("#button-wish").text();
    if (heart == '♥') {
        alert('찜이 취소되었습니다.')
        $("#button-wish").text('♡')
    } else {
        $('#wishModal').modal('toggle')
        $("#button-wish").text('♥')
    }
}

function moveToWishList() {
    window.location.href = "http://naver.com";
}