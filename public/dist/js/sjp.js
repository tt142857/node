const ajax = async (url, type, param, callback) => {
  $.ajax({
      url : url
    , type : type ? type : "get"
    , dataType : 'json'
    , data : param ? param : {}
    , timeout : 20000
  })
    .done(function(result) {
    return callback(result);
  }).fail(function(xhr, status, err) {
    console.log('xhr: ', xhr);
    console.log('status: ', status);
    console.log('err: ', err);
    return callback(err);
  })
}