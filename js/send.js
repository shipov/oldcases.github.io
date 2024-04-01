 $(document).ready(function() {
 	$('#message-form, #feedback-form').submit(function(e) {
 		e.preventDefault();

 		var form = this;

 		var data = {
 			name: $('#name').val().trim(),
 			phone: $('#phone').val().trim(),
 			body: $('#body').val().trim()
 		};

 		// if ($(this).prop('id') == 'message-form') {
 		// 	data.email =  $('#email').val().trim();
 		// 	data.subject = $('#subject').val().trim();
 		// }

 		$.ajax({
 			url: 'send.php',
 			method: 'POST',
 			dataType: 'json',
 			data: data,
 			success: function(resp) {
 				if (resp.result) {
 					$.notify({

 						icon: "img/ok.png",
 						message: 'Ваше сообщение успешно отправлено!' 
 					}, 					
 					{
 						icon_type: 'image',
 						type: 'success',
 						placement: {
 							from: "top",
 							align: "center"
 						},
 						delay: 2000,
 						allow_dismiss: false				
 					});

 					form.reset();
 					$('.test').click();
 				} else {
 					$.notify({
 						message: 'Ошибка: ' + resp.error 
 					},
 					{
 						type: 'danger',
 						placement: {
 							from: "top",
 							align: "center"
 						},
 						delay: 300,
 						allow_dismiss: false					
 					});				
 				}
 			}
 		});
});
});

