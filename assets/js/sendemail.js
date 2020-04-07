function sendMail(contactForm){
    emailjs.send("gmail", "resume_opportunity_contact_naoise_gaffney", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_request": contactForm.projectsummary.value
    })
    .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
    }, function (error) {
        console.log('FAILED...', error);
    });
    return false;
}



/*
(function () {
            emailjs.init("user_Dhpon4lpXiEEQEGFYwVco");
            var templateParams = {
                name: 'Naoise Gaffney',
                notes: 'Training and Development Opportunity'
            };

            /* Test message only...
            emailjs.send('gmail', 'resume_opportunity_contact_naoise_gaffney', templateParams)
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                }, function (error) {
                    console.log('FAILED...', error);
                });
        }) ();

        // emailjs.send("gmail", "resume_opportunity_contact_naoise_gaffney", { "from_name": "Dude", "from_email": "naoise.gaff.gaffney@gmail.com", "project_request": "Stuff!" })
    </script >
*/