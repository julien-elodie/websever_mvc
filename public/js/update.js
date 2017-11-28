$("#select_id").select2({
  placeholder: "请选择",
  language: "zh-CN",
  width: "100%",
  // tags: true,
  allowClear: true,
  ajax: {
    type: "GET",
    url: "/master/selectIds",
    dataType: "json",
    delay: 250,
    data: function(params) {
      return {
        q: params.term,
        page: params.page
      };
    },
    processResults: function(data, params) {
      params.page = params.page || 1;
      return {
        results: data.items,
        pagination: {
          more: params.page * 10 < data.total_count
        }
      };
    },
    cache: true
  },
  escapeMarkup: function(markup) {
    return markup;
  },
  minimumInputLength: 1,
  templateResult: formatId,
  templateSelection: formatId
});

function formatId(repo) {
  if (repo.loading) {
    return repo.text;
  }
  var makeup = "<div>" + repo.name + "</div>";
  return makeup;
}

$("#select_attr").select2({
  data: [
    { id: 1, text: "标题", name: "title" },
    { id: 2, text: "上传时间", name: "date" },
    { id: 3, text: "作者", name: "username" },
    { id: 4, text: "播放量", name: "plays" },
    { id: 5, text: "评论量", name: "comments" },
    { id: 6, text: "硬币量", name: "coins" },
    { id: 7, text: "收藏量", name: "collects" }
  ],
  placeholder: "请选择",
  language: "zh-CN",
  width: "100%",
  // tags: true,
  allowClear: true
});

$("#update_submit").click(function() {
  var data = {
    id: $("#select_id").select2("data")[0].name,
    attr: $("#select_attr").select2("data")[0].name,
    value: $("#attribute").val()
  };
  var options = {
    type: "post",
    url: "./master/update",
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
