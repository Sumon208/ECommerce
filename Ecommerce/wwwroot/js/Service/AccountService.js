var AccountService = {
    VerifyUser: (modelAccount,callback) => {
        //$.get("http://localhost:11084/AccountAPIControllers/VerifyUser?UserName=" + UserName + "&Password=" + Password, function (data, status) {
        //   // alert(" Now I am in going to Controller")
        //    callback(data);
        //});


        // Now JQuery Post
        $.post(
            "http://localhost:11084/AccountAPIControllers/VerifyUser",
            { "modelAccount": modelAccount },
            function (data, status) {
                callback(data);

            }
        )
    }
}