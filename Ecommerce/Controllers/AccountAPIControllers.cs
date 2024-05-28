using Microsoft.AspNetCore.Mvc;
using Ecommerce.Models;
using System.Diagnostics.Eventing.Reader;

namespace Ecommerce.Controllers
{
    public class AccountAPIControllers : Controller
    {
        //AccountAPI/VerifyUser?UserName=opi&Password=12345
        //http://localhost:11084/AccountAPIControllers/VerifyUser?UserName=opi&Password=12345

        [HttpPost]
        public IActionResult VerifyUser(Account modelAccount)
        {
            if(modelAccount.UserName == "opi" && modelAccount.Password == "12345"){
                return Ok ("Successfully Authorized");
            }
            else Unauthorized (new {Message = "Unauthorized Access"} );
            return View();
        }
    }
}
