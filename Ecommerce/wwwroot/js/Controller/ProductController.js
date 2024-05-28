var proListCartProducts = [];
var ProductController = {
    proList: () => {
        ProductService.proList(function (response) {
            let productContent = '';
            $.each(response.products, function (index, value) {
                // console.log(value) 
                productContent = productContent + `
                  <div class="col sm-3" style="margin-top:10px">

                    <div class="thumb-wrapper">
                       <span class="widh-icon"><i class="fa fa-heart-o"></i></span>
                       <div class="img-box">
                          <img id='pdPicture_${index}' src="${value.thumbnail}" class="img-fluid" alt="">
                       </div>
                       <div class="thumb-content">
                       <h4 id='pdName_${index}'>${value.title}</h4>
                           <div class="star-rating">
                                <ul class="list-inline">
                                   <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                   <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                   <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                   <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                   <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                </ul>
                           </div>
                           <p class="item-price"><strike>${value.price}</strike> <b id='pdPrice_${index}'>${value.price}</b></p>
                           <a href="#" class="btn btn-primary" id='btnPdAddToCard_${index}' onclick='ProductController.AddToCart(this)'>Add to Cart</a>

                       </div>
                    </div>
                  </div>
                `;
            })
            $('#dvproductList').html(productContent);

        })
    },
    AddToCart: (cntrl) =>{
      
        var targetIndex = $(cntrl).attr("id").split('_')[1];
        var targetImage = $('#pdPicture_' + targetIndex).attr('src');
        var targetName = $('#pdName_' + targetIndex).html();
        var targetPrice = $('#pdPrice_' + targetIndex).html();


       

        var targetProduct = {
            Image: targetImage,
            Name: targetName,
            Price: targetPrice
        }
       
          proListCartProducts.push(targetProduct);
          ProductController.ArrangeProductsForCarts();
       
        alert("Added to cart successfully");


    },
    DeleteFromCart: (targetProductID, targetIndex) => {
        let proListCartProducts_upd = [];
        $.each(proListCartProducts, function (index, value) {
            if (targetIndex != index) {
                proListCartProducts_upd.push(value);
            }
        })
        proListCartProducts = proListCartProducts_upd;
        ProductController.ArrangeProductsForCarts();
        alert("cart Updated");
    },
    ViewCart: () => {

        if ($("#dvViewCartsWrapper").css('right') == "0" || $("#dvViewCartsWrapper").css('right') == "0px") {
            $("#dvViewCartsWrapper").animate({
                right: "-300"
            }, "fast");
        }
        else {
            $("#dvViewCartsWrapper").animate({
                right: "0"
            }, "fast");

        }    
        
    },
    ArrangeProductsForCarts: () => {
        $('#lblCardCount').html("0");
        $("#dvViewCarts").html('');

        if (proListCartProducts.length > 0) {
            //cart count update
            $('#lblCardCount').html(proListCartProducts.length);
           //view cart update
            $.each(proListCartProducts, function (index, value) {
                $("#dvViewCarts").append(`
                    <div id='dvCartWrapper_${index}' style="clear:both;display black;border:2px solid #eee;height:100px;width:100%">

                            
                        <div class="row" style="padding:5px;">
                                <div class="col col-sm-3">
                                    <img src="${value.Image}" style="width:100px;" />
                                </div>
                                <div class="col col-sm-3">
                                    <span>${value.Name}</span>
                                </div>
                                <div class="col col-sm-3">
                                    <span>${value.Price}</span>
                                </div> 
                                <div class="col col-sm-3">
                                    <span id='delCartProduct_${index}' style="padding:3px;background:red;color:white;cursor:pointer;" onclick="javascript:ProductController.DeleteFromCart('dvCartWrapper_${index}',${index})" >X</span>
                                </div>

                            </div>

                      
                    </div>
                            
                `);

            })

            //Checout update
            if ($('body').find('#dvDetailsCartsProduct').length > 0) {

                $.each(proListCartProducts, function (index, value) {
                    $("#dvDetailsCartsProduct").append(`
                       <div id='dvCheckoutCartWrapper_${index}' style="clear:both;display black;border:2px solid #eee;height:100px;width:100%">


                            <div class="row" style="padding:5px;">
                                <div class="col col-sm-3">
                                    <img src="${value.Image}" style="width:100px;" />
                                </div>
                                <div class="col col-sm-3">
                                    <span>${value.Name}</span>
                                </div>
                                <div class="col col-sm-3">
                                    <span>${value.Price}</span>
                                </div>
                                <div class="col col-sm-3">
                                    <span id='delCartProduct_${index}' style="padding:3px;background:red;color:white;cursor:pointer;" onclick="javascript:ProductController.DeleteFromCart('dvCartWrapper_${index}',${index})" >X</span>
                                </div>

                            </div>


                      </div>

                   `);

                })

            }
            

        }
       
    },
    PrepareCartForCheckoutUI: (url) => {
        if (proListCartProducts.length > 0) {
            localStorage.setItem("proListCartProducts", JSON.stringify(proListCartProducts)); 
            window.location.href = url;
        }
        else {
            alert("Cart empty");
        }
    },
    LoadCartProductForCheckout: () => {

        if (localStorage.getItem("proListCartProducts") != null && localStorage.getItem("proListCartProducts") != undefined) {

            proListCartProducts = JSON.parse(localStorage.getItem("proListCartProducts"));

            ProductController.ArrangeProductsForCarts();
            
        }
             
    }
}


    