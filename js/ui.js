(function ($) {
    var $overlay = $('.overlay'),
        selectedTags = [],
        selectedProblems = [],
        problemsToExport = [];

    $(document).on('click', '.add-checkbox', function(e) {
        var $checktedCheckBox = $(this),
            $selectedMatchedItem = $checktedCheckBox.parent(),
            matchedItemId = $selectedMatchedItem.attr('id')
            matchedItemName = $selectedMatchedItem.children('.match-name').text();
        $checktedCheckBox.toggleClass('checkbox-checked');
        console.log(matchedItemId)

        var $existinsMatchedItemExercseTag = $('.exported-items').children("#" + matchedItemId),
            selectedExcerciseTag = generateSelectedExcerciseTagMarkup(matchedItemId, matchedItemName),
            $container = $('.exported-items');

        if($existinsMatchedItemExercseTag.length > 0) { //tag already exists
            var contents = $('.exported-items').html();

            if(contents !== undefined) {
                console.log("asd")
                var newStringContents = contents.replace( selectedExcerciseTag + ',', '')
                                                .replace(','+ selectedExcerciseTag + ',' , '')
                                                .replace(','+ selectedExcerciseTag, '')
                                                .replace(selectedExcerciseTag, '');
                }
            $container.empty();
            $container.append(newStringContents);

            problemsToExport = problemsToExport.filter(function(id) {
                return id !== matchedItemId
            });
        }
        else {

            problemsToExport.push(matchedItemId);
            if($container.children().length > 0) {
                $container.append(',' + selectedExcerciseTag);
            }
            else {
                $container.append(selectedExcerciseTag);
            }
        }
    });

    $('.close-match-desc').on('click', function(e){
        $overlay.addClass('hidden');
    });

    $('.overlay-background').on('click', function(e){
        $overlay.addClass('hidden');
    });

    $(document).on('click', '.open-decription', function (e){
        $parent = $(this).parent()
        markdown = $parent.find(".problem-description").val()
        name = $parent.find(".match-name").text().trim()
        console.log(name)
        console.log(markdown)

        $(".overlay-match-information .match-name").html(name)
        $(".overlay-match-information .match-description").html(markdown)
        $overlay.removeClass('hidden');
    });

    $('.export-to-gitbook-button').on('click', function(e){
        //do exporting shit here
        console.log(problemsToExport)
        objectsToExport = []

        _.each(problemsToExport, function(id) {
            _.each(selectedProblems, function(problem) {
                if(problem.unique_id === id) {
                    objectsToExport.push(problem)
                }
            })
        });

        console.log(objectsToExport)
        var payload = {
            "introduction" : "Exported from Code Collection",
            "chapters" : []
        };

        _.each(objectsToExport, function(problem) {
            next = {
                "chapterName" : problem.name,
                "chapterFile" : problem.name.replace(" ", "_") + ".md",
                "chapterContent" : problem.markdown
            };

            payload.chapters.push(next)
        });

        console.log(payload)
        sendBook(payload, function(data) {
            previewUrl = data.previewUrl;
            downloadButton = generateDownloadButtom(previewUrl)
            $("#download-container").empty()
            $("#download-container").append(downloadButton)

        });
        // send to export service
    });

    var updateProblemList = function(problems) {
        selectedProblems = problems;

        $(".matches").empty()

        _.each(problems, (function(problem) {
            itemTemplate = $("#problemItem").html()
            itemHtml = _.template(itemTemplate, {
                id : problem["unique_id"],
                problemName : problem["name"],
                problemDescription : atob(problem.markdown)
            });

            $(".matches").append(itemHtml)
        }));



    };


    ////////////////////////////////////
    /////   Typeahead UI init       ////
    ////////////////////////////////////

    fetchTags(function(tags) {
        var substringMatcher = function(strs) {
          return function findMatches(q, cb) {
            var matches, substringRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function(i, str) {
              if (substrRegex.test(str)) {
                // the typeahead jQuery plugin expects suggestions to a
                // JavaScript object, refer to typeahead docs for more info
                matches.push({ value: str });
              }
            });

            cb(matches);
          };
        };

        console.log(tags)
        $('.typeahead').typeahead({
          hint: true,
          highlight: true,
          minLength: 1
        },
        {
          name: 'states',
          displayKey: 'value',
          source: substringMatcher(tags),
        }).on('typeahead:selected', function(evt, item) {
            selectedTags.push(item.value)
            $(".selected-tags").append(generateSelectedTag(item.value))
            $('.typeahead').typeahead('val', "");

            fetchTasksByTags(updateProblemList, selectedTags);
        });
    });

    $(document).on('click', '.selected-tag', function(event) {
        event.preventDefault();
        tagName = $(this).data("value")

        selectedTags = selectedTags.filter(function(item) {
            return item !== tagName
        });

        $(this).remove()

        fetchTasksByTags(updateProblemList, selectedTags);
    });
})(jQuery);
