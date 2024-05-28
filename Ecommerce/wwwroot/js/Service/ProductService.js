var ProductService = {
    proList: (callback) => {
       // self api
        //$.get("http://localhost:11084/ProductAPIControllers/ProductList", function (data, status) {
        //    callback(data);
        //})


        // dummy api link
        $.get("https://dummyjson.com/products", function (data, status) {
            callback(data);
        })

    }
}