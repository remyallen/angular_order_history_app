myApp.directive('ordersInfoDirective',
    function() {
        return {
            restrict: 'E',
            scope: {
                info: '='
            },
            templateUrl: 'views/ordersInfo.html',
            controller: 'CustomerController'
        }
    }
);