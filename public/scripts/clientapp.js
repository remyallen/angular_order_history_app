var myApp = angular.module('myApp', []);

myApp.controller('CustomerController', ['$scope', '$http', function($scope, $http) {
    $http.get('/customer').then(function(response){
        var data = response.data;
        $scope.customers = data;
    });

    $scope.getOrders = function(id) {
        $http.get('/customerorders/' + id).then(function(response){
            var data = response.data;

            $scope.orders = data;

            return $scope.orders;
        });
    }
}]);