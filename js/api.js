var fetchTags = function(cb) {
    $.ajax({
        type: "GET",
        url: "http://146.185.169.9:3000/tags?callback=?",
        dataType: 'jsonp',
        success: function(data){
            cb(data)
        }
    });
};

var fetchTasksByTags = function(cb, selectedTags) {
    selectedTags = selectedTags.map(function(item) {
        return "tag=" + item
    });
    tagsQuery = selectedTags.join("&")
    console.log(tagsQuery)

    $.ajax({
        type: "GET",
        url: "http://146.185.169.9:3000/tasks/filter?" + tagsQuery,
        dataType: 'jsonp',
        success: function(data){
            cb(data)
        }
    });

};

var sendBook = function(payload, cb) {
    $.ajax({
        type: "POST",
        url: "http://146.185.169.9:3100/generate_book",
        dataType: 'json',
        data : payload,
        success: function(data){
           cb(data)
        }
    });
};
