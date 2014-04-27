function generateSelectedExcerciseTagMarkup(id, name) {
	return '<li id="' + id + '" class="exported-item border-round3"><p class="tag"><span class="item-name">' + name + '</span><button class="remove-exported-item-button">X</button></p></li>';
}


function generateSelectedTag(tagName) {
    var tagMarkup = "<button data-value='<%= tagName %>' class='selected-tag btn btn-warning'><%= tagName %></button>"
    return _.template(tagMarkup, {
        tagName : tagName
    })
};

function generateDownloadButtom(url) {
    var buttonMarkup = "<a href='<%= url %>' target='_blank' class='btn btn-lg btn-success'>Download exported!</a>"

    return _.template(buttonMarkup, {
        url : url
    })
};
