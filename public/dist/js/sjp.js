const ajax = async (...arguments) => {
  var url, type, param, callback;
  var len = arguments.length;
  
  // 첫 파라미터는 url
  url = arguments[0];
  // 마지막 파라미터는 callback 함수
  if(len > 1) {
    callback = arguments[len - 1];
  }
  // 파라미터 수가 3개인 경우
  if(len == 3) {
    if(typeof arguments[1] === 'string') {
      if(arguments[1].toUpperCase() === 'GET' || arguments[1].toUpperCase() === 'POST') {
        type = arguments[1];
      } else {
        param = arguments[1];
      }
    } else {
      param = arguments[1];
    }
  }
  // 파라미터 수가 4개인 경우
  else if(len == 4) {
    type = arguments[1];
    param = arguments[2];
  }

  $.ajax({
      url : url
    , type : type ? type : "get"
    , dataType : 'json'
    , data : param ? param : {}
    , timeout : 20000
  })
    .done(function(data) {
    return callback(data);
  }).fail(function(xhr, status, err) {
    console.log('xhr: ', xhr);
    console.log('status: ', status);
    console.log('err: ', err);
    return callback(err);
  })
}

const isEmpty = (param) => {
  if(param === null || param === undefined) {
    return true;
  }
  // 문자열일 때
  if(typeof param === "string") {
    if(param === "null" || param === "undefiend" || param === "") {
      return true;
    }
  } 
  // 배열일 때
  if(Array.isArray(param) && param.length === 0) {
    return true;
  }

  return false;
}

const serializeObject = (jQueryForm) => {
  var result = {};
  var arr = jQueryForm.serializeArray();
  $.each(arr, function(idx, single) {
    result[single.name] = single.value;
  })
  return result;
}