using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers
{
    public class ProductController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Checkout()
        {
            return View();
        }
        //public IActionResult SingleProduct()
        //{
        //    ViewBag.ProductId = 0;

        //    return View();
        //}
        public IActionResult SingleProduct(int id)
        {
            ViewBag.ProductId = id;
            return View();
        } 
        public IActionResult CategoryProduct()
        {
           // ViewBag.CategoryName = id;
            return View();
        }
    }
}
