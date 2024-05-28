var AccountController = {
    VerifyUser: (actionBtn,url) => {
        let pUserName = $('#txtUserName').val();
        let pPassword = $('#txtPassword').val();


        var modelAccount = {
            UserName: pUserName,
            Password: pPassword
        }
        //callback function
        AccountService.VerifyUser(modelAccount, function (response) {
            debugger;
            if (response == "Successfully Authorized") {
                // window.location.href = "http://localhost:11084/Product/Index";
                localStorage.setItem("UserName", pUserName);
                window.location.href = url;
            }
            else {
                alert("Unauthorized");
            }
        })

    }
}