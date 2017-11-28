$("#add_submit").click(function() {
  // alert("提交成功!");
  var data = {
    id: $("#txt_add_id").val(),
    title: $("#txt_add_title").val(),
    date: $("#txt_add_date").val(),
    username: $("#txt_add_username").val(),
    plays: $("#txt_add_plays").val(),
    comments: $("#txt_add_comments").val(),
    coins: $("#txt_add_coins").val(),
    collects: $("#txt_add_collects").val()
  };
  var options = {
    type: "post",
    url: "./master/add",
    data: data,
    dataType: "json",
    success: function(res) {
      alert("添加成功!");
      location.reload(true);
    },
    error: function(xhr, type, err) {
      alert("添加失败,请重试.");
    }
  };
  $.ajax(options);
});

$(".form_datetime").datetimepicker({
  format: "yyyy-mm-dd hh:ii:ss",
  autoclose: true,
  todayBtn: true,
  startDate: "2017-01-01 00:00:00",
  minuteStep: 5
});
