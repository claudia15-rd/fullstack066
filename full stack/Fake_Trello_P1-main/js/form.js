var forms = document.querySelectorAll('.needs-validation')
        
Array.prototype.slice.call(forms)
.forEach(function (form) {
	form.addEventListener('click', function (event) {
	if (!form.checkValidity()) {
		event.preventDefault()
		event.stopPropagation()
	}

	form.classList.add('was-validated')
	}, false)
})