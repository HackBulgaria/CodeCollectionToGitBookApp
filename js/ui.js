(function ($) {
	var $overlay = $('.overlay');

	$('.add-checkbox').on('click',function(e) {
		var $checktedCheckBox = $(this),
			$selectedMatchedItem = $checktedCheckBox.parent(),
			matchedItemId = $selectedMatchedItem.attr('id')
			matchedItemName = $selectedMatchedItem.children('.match-name').text();
		$checktedCheckBox.toggleClass('checkbox-checked');

		var $existinsMatchedItemExercseTag = $('.exported-items').children('#'+ matchedItemId),
			selectedExcerciseTag = generateSelectedExcerciseTagMarkup(matchedItemId, matchedItemName),		
			$container = $('.exported-items');

		if($existinsMatchedItemExercseTag.length > 0) { //tag already exists
			var contents = $('.exported-items').html(),
				newStringContents = contents.replace( selectedExcerciseTag + ',', '')
											.replace(','+ selectedExcerciseTag + ',' , '')
											.replace(','+ selectedExcerciseTag, '')
											.replace(selectedExcerciseTag, '');
			$container.empty();
			$container.append(newStringContents);
		}
		else {
			
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

	$('.open-decription').on('click', function (e){
		$overlay.removeClass('hidden');
	});

	$('.export-to-gitbook-button').on('click', function(e){
		//do exporting shit here
	});

	////////////////////////////////////
	/////	Typeahead UI init	 	////
	////////////////////////////////////

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
		}
	}

	var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
		'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
		'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
		'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
		'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
		'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
		'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
		'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
		'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
	];

	$('.typeahead').typeahead({
		hint: true,
		// highlight: true,
		minLength: 1
	},
	{
		name: 'states',
		displayKey: 'value',
		source: substringMatcher(states)
	});
})(jQuery);