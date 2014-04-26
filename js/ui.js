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
})(jQuery);