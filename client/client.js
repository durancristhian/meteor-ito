if (Meteor.isClient) {

	Template.messages.messages = function () {
	
		return Messages.find({}, { 
			sort: { time: -1 
		}});
	};

	Template.actions.events = {

		'keydown input#message' : function (event) {

			var message = "";
			var name = "";

			if (event.which == 13) {

				if (Meteor.user()) {

		  			name = Meteor.user().profile.name;					
				}
				else {

		  			name = 'Anónimo';
				}

				message = document.getElementById('message');
   
				if (message.value != '') {

					Messages.insert({
						name: name,
						message: message.value,
						time: Date.now(),
					});
	   
					document.getElementById('message').value = '';
			  		message.value = '';
				}
			}
		},
		"click a#delete-messages": function (event) {

			event.preventDefault();

			Meteor.call('removeAllMessages')
		}
	};
}