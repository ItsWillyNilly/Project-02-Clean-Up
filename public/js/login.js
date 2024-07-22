$(document).ready(function () {
    const loginForm = $("form.login");
    const loginUsername = $('input#username');
    const loginPassword = $('input#password');

    const signUpForm = $("form.signup");
    const signUpUsername = $('input#signup-username');
    const signUpEmail = $('input#signup-email');
    const signUpPassword = $('input#signup-password');

    signUpForm.on('submit', function (event){
        event.preventDefault();
        const userData = {
            username: signUpUsername.val().trim(),
            email: signUpEmail.val().trim(),
            password: signUpPassword.val().trim()
        };

        if (!userData.username || !userData.email || !userData.password) {
            return;
        }

        signUpUser(userData.username, userData.password);
        signUpUsername.val('');
        signUpEmail.val('');
        signUpPassword.val('');
    })

    function signUpUser(username, password) {
        $.post('/api/signup', {
            username: username,
            password: password
        })
            .then(function (data) {
                window.location.replace('/home');
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    loginForm.on('submit', function (event) {
        event.preventDefault();
        const userData = {
            username: loginUsername.val().trim(),
            password: loginPassword.val().trim()
        };

        if (!userData.username || !userData.password) {
            return;
        }

        loginUser(userData.username, userData.password);
        loginUsername.val('');
        loginPassword.val('');
    });

    function loginUser(username, password) {
        $.post('/api/login', {
            username: username,
            password: password
        })
            .then(function (data) {
                window.location.replace('/home');
            })
            .catch(function (err) {
                console.log(err);
            });
    }
});