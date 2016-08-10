var meanStackTrial = angular.module("MeanStackTrial", []);

meanStackTrial.controller('MeanStackController', function ($http) {
    var app = this;
    var url = "http://localhost:3000";

    function loadProducts() {
        $http.get(url).success(function (products) {
            app.products = products;

        })
    }

    app.saveProduct = function (productName, productQuantity) {
        $http.post(url + "/add", {name: productName, quantity: productQuantity}).success(function () {
            loadProducts();
        });
    }

    loadProducts();
})

