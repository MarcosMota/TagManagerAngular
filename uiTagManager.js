(function (root, factory) {
    'use strict'
    /* istanbul ignore if */
    if (typeof module !== 'undefined' && module.exports) {
        var ng = typeof angular === 'undefined' ? require('angular') : angular
        factory(ng)
        module.exports = 'iuTagManager'
        /* istanbul ignore next */
    } else if (typeof define === 'function' && /* istanbul ignore next */ define.amd) {
        define(['angular'], factory)
    } else {
        factory(root.angular)
    }
}(this, function (angular) {
    'use strict'
    angular.module('iuTagManager', [])
            .service('tagManagerConfig', TagManagerConfigProvider)
            .service('tagManagerValidator', TagManagerValidatorService)
            .directive('tagManager', TagManagerDirective)



    TagManagerDirective.$inject = ['tagManagerConfig', 'tagManagerValidator']
    function TagManagerDirective(defaultConfig, configurationValidator) {
        var directiveDefinition = {
            bindToController: false,
            controller: TagController,
            controllerAs: 'tagManagerController',
            replace: true,
            require: 'ngModel',
            restrict: 'E',
            scope: {
                onPushed: "=",
                onPushing: "=",
                onSpliced: "=",
                OnSplicing: "=",
                OnPopped: "=",
                OnPopping: "=",
                OnRefresh: "=",
                OnEmptied: "=",
                OnHide: "=",
                "OnShow": "="
            },
            template: '<input type="text" name="tags" class="form-control tm-input"/>',
        }
        TagController.$inject = ['$scope', '$element', '$attrs']

        function TagController($scope, $element, $attrs) {
            var configuration = createConfiguration();
                var ngModel;
                jQuery($element).tagsManager(configuration);

                function $render() {
                    //$scope.changeView(configuration.startView, new DateObject({utcDateValue: getUTCTime(ngModelController.$viewValue)}))
                    //console.log(ngModel.$viewValue);
                    console.log(jQuery($element).tagsManager('tags'));

                }


                ngModel = $element.controller('ngModel')
                ngModel.$render = $render;
                RegistrarEventos();

                function RegistrarEventos() {
                    jQuery($element).on('tm:pushing', function (e, tag) {
                        ngModel.$setViewValue(jQuery($element).tagsManager('tags'));
                        if ($scope.onPushed) {

                        }
                    });
                }
                function createConfiguration() {
                    var directiveConfig = {}

                    if ($attrs.datetimepickerConfig) {
                        directiveConfig = $scope.$parent.$eval($attrs.datetimepickerConfig)
                    }

                    var configuration = angular.extend({}, defaultConfig, directiveConfig)

                    configurationValidator.validate(configuration)

                    return configuration
                }
        };
        return directiveDefinition;
   

    }

    function TagManagerConfigProvider() {
        var defaultConfiguration = {
            CapitalizeFirstLetter: true,
            AjaxPush: null,
            AjaxPushAllTags: null,
            AjaxPushParameters: null,
            delimiters: [9, 13, 44],
            backspace: [8],
            blinkBGColor_1: '#FFFF9C',
            blinkBGColor_2: '#CDE69C',
            hiddenTagListName: 'hiddenTagListA',
            hiddenTagListId: null,
            deleteTagsOnBackspace: true,
            tagsContainer: null,
            tagCloseIcon: '×',
            tagClass: '',
            validator: null,
            onlyTagList: false
        }

        return defaultConfiguration;
    }
    
    TagManagerValidatorService.$inject = ['$log']
    function TagManagerValidatorService($log) {
        return {
            validate: validator
        }

        function validator(configuration) {
            var validOptions = [
                'prefilled',
                'CapitalizeFirstLetter',
                'AjaxPush',
                'AjaxPushAllTags',
                'AjaxPushParameters',
                'delimiters',
                'backspace',
                'blinkBGColor_1',
                'blinkBGColor_2',
                'hiddenTagListName',
                'hiddenTagListId',
                'deleteTagsOnBackspace',
                'tagsContainer',
                'tagCloseIcon',
                'tagClass',
                'validator',
                'onlyTagList',
            ]

            var invalidOptions = Object.keys(configuration).filter(function (key) {
                return (validOptions.indexOf(key) < 0)
            })

            if (invalidOptions.length) {
                throw new Error('Invalid options: ' + invalidOptions.join(', '))
            }

        }
    }
}));