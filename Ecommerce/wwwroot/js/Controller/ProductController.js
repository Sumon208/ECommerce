var proListCartProducts = [];
var ProductController = {

    LoadProductCategories: (pUrl) => {
       // var pUrl ='http://localhost:11084/Product/CategoryProduct/'

      let LiCategories = "";
        ProductService.LoadCategories(function (response) {
           
            $.each(response, function (index, value) {

                LiCategories = LiCategories + `<a href="${pUrl}?CategoryName=${value.name}">${value.name}</a><br />`;
               // LiCategories = LiCategories + `<a href="${pUrl}/${value.name}">${value.name}</a><br />`

            })
            $('#ulMenu').html(LiCategories);
        })
      
    },
    ListCategoryProduct: (CategoryName) => {
        ProductService.LoadProductByCategory(CategoryName,function (response) {
            let productContent = '';
            $.each(response.products, function (index, value) {
                // console.log(value) 
                productContent = productContent + `
                  <div class="col sm-3" style="margin-top:10px">

                    <div class="thumb-wrapper">
                       <span class="widh-icon"><i class="fa fa-heart-o"></i></span>
                       <div class="img-box">
                          <img id='pdPicture_${value.id}' src="${value.thumbnail}" onclick="window.location.href='/Product/SingleProduct/${value.id}'" class="img-fluid" alt="">
                       </div>
                       <div class="thumb-content">
                       <h4 id='pdName_${value.id}'>${value.title}</h4>
                           <div class="star-rating">
                                <ul class="list-inline">
                                   <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                   <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                   <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                   <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                   <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                </ul>
                           </div>
                           <p class="item-price"><strike>${value.price}</strike> <b id='pdPrice_${value.id}'>${value.price}</b></p>
                           <a href="#" class="btn btn-primary" id='btnPdAddToCard_${value.id}' onclick='ProductController.AddToCart(this)'>Add to Cart</a>

                       </div>
                    </div>
                  </div>
                `;
            })
            $('#dvproductList').html(productContent);

        })
    },
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
                          <img id='pdPicture_${value.id}' src="${value.thumbnail}" onclick="window.location.href='/Product/SingleProduct/${value.id}'" class="img-fluid" alt="">
                       </div>
                       <div class="thumb-content">
                       <h4 id='pdName_${value.id}'>${value.title}</h4>
                           <div class="star-rating">
                                <ul class="list-inline">
                                   <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                   <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                   <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                   <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                   <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                </ul>
                           </div>
                           <p class="item-price"><strike>${value.price}</strike> <b id='pdPrice_${value.id}'>${value.price}</b></p>
                           <a href="#" class="btn btn-primary" id='btnPdAddToCard_${value.id}' onclick='ProductController.AddToCart(this)'>Add to Cart</a>

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
            id: targetIndex,
            Image: targetImage,
            Name: targetName,
            Price: targetPrice
        }
       
          proListCartProducts.push(targetProduct);
          ProductController.ArrangeProductsForCarts();
       
        alert("Added to cart successfully");


    },
    DeleteFromCart: (targetIndex) => {
        debugger;
        let proListCartProducts_upd = [];
        $.each(proListCartProducts, function (index, value) {
            if (targetIndex != value.id) {
                proListCartProducts_upd.push(value);
            }
        })
        proListCartProducts = proListCartProducts_upd;
        localStorage.setItem("proListCartProducts", JSON.stringify(proListCartProducts)); 
        ProductController.ArrangeProductsForCarts();
        alert("Cart Updated");
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

        if ($('body').find('#dvDetailsCartsProduct').length > 0) {
            $("#dvDetailsCartsProduct").html('');
        }

        if (proListCartProducts.length > 0) {
            //cart count update
            $('#lblCardCount').html(proListCartProducts.length);
           //view cart update
            $.each(proListCartProducts, function (index, value) {
                $("#dvViewCarts").append(`
                    <div id='dvCartWrapper_${value.id}' style="clear:both;display black;border:2px solid #eee;height:100px;width:100%">

                            
                        <div class="row" style="padding:5px;">
                                <div class="col col-sm-3">
                                    <img src="${value.Image}" style="width:100px;" onclick="window.location.href='/Product/SingleProduct/${value.id}'"  />
                                </div>
                                <div class="col col-sm-3">
                                    <span onclick="window.location.href='/Product/SingleProduct/${value.id}'" >${value.Name}</span> 
                                </div>
                                <div class="col col-sm-3">
                                    <span>${value.Price}</span>
                                </div> 
                                <div class="col col-sm-3">
                                    <span id='delCartProduct_${value.id}' style="padding:3px;background:red;color:white;cursor:pointer;" onclick="javascript:ProductController.DeleteFromCart(${value.id})" >x</span>
                                </div>

                            </div>

                      
                    </div>
                            
                `);

            })

            //Checout for  details update
            if ($('body').find('#dvDetailsCartsProduct').length > 0) {
                $("#dvDetailsCartsProduct").html();

                $.each(proListCartProducts, function (index, value) {
                    $("#dvDetailsCartsProduct").append(`
                       <div id='dvCheckoutCartWrapper_${value.id}' style="clear:both;display black;border:2px solid #eee;height:100px;width:100%">


                            <div class="row" style="padding:5px;">
                                <div class="col col-sm-3">
                                    <img src="${value.Image}"  onclick="window.location.href='/Product/SingleProduct/${value.id}'"  style="width:100px;"  />
                                </div>
                                <div class="col col-sm-3">
                                    <span onclick="window.location.href='/Product/SingleProduct/${value.id}'" >${value.Name}</span>
                                </div>
                                <div class="col col-sm-3">
                                    <span>${value.Price}</span>
                                </div>
                                <div class="col col-sm-3">
                                    <span id='delCheckoutCartProduct_${value.id}' style="padding:3px;background:red;color:white;cursor:pointer;" onclick="javascript:ProductController.DeleteFromCart(${value.id})" >x</span>
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
    LoadCartCommon: () => {
        if (localStorage.getItem("proListCartProducts") != null && localStorage.getItem("proListCartProducts") != undefined) {

            proListCartProducts = JSON.parse(localStorage.getItem("proListCartProducts"));

            ProductController.ArrangeProductsForCarts();

        }
    },
    SingleProduct: (ProductID) => {
       // console.log(ProductID);
        ProductService.SingleProduct(ProductID, function (response) {

            var ImageHtml = ''
            $.each(response.images, function (index, value) {
                if (index == 0) {
                    ImageHtml = ImageHtml + `
                    <div class="col" style="width:100px;height:100px;">
                            <img src="${value}" onclick="javascript:$('#imgTargetBigView').attr('src','${value}')" style="width:100px;height:100px" />
                        </div>
                    `
                }
                else {
                    ImageHtml = ImageHtml + `
                    <div class="col" style="width:100px;height:100px;margin-left:5px">
                            <img src="${value}" onclick="javascript:$('#imgTargetBigView').attr('src','${value}')" style="width:100px;height:100px" />
                        </div>
                    `
                }

                
            })
           
            var singelProduct = ''
            singelProduct = singelProduct + `<div class="row">
                <div class="col col-4">
                    <div class="row">
                        <div class="col col-12" style="width:500px;height:264px">
            
                            <img id="imgTargetBigView" src="${response.images[0]}" style="width:100%;height:264px" />
                        </div>
                    </div>
                    <div class='row' style="margin-top:10px;width:500px;height:210px;overflow:auto">
                       ${ImageHtml}
                    </div>
                </div>
                <div class="col col-8">
                    <span>${response.title}</span><br />
                    <span> ${response.description} </span><br />
                    <span> ${response.price} </span><br />
                    <span class='btn btn-primary'> Add To Cart </span><br />
                </div>
            </div>`;

            $('#dvSingleViewProduct').html(singelProduct);
        })
    }
   
}


    