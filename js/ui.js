(function ($) {
	$exportedItemsList = $('.exported-items'),
	$overlay = $('.overlay');

	$('.add-checkbox').on('click',function(e) {
		var $checktedCheckBox = $(this),
			$selectedMatchedItem = $checktedCheckBox.parent();
		$checktedCheckBox.toggleClass('checkbox-checked');

		//find in exportedItemsList child with Id === $selectedMatchedItem.getId()
		//if found remove it
		//if not-found add it
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