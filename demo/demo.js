(function () {
	// jshint latedef: false
	'use strict';

	angular
		.module('demo', [
			'mgr.notifications'
		])
		.directive('demo', [
			demo
		]);

	function demo() {
		return {
			restrict: 'AE',
			scope: true,
			controller: DemoController,
			controllerAs: 'demo'
		};

		function DemoController() {
			var demo = this;

			demo.notifications = [];

			demo.showGenericNotification = showGenericNotification;
			demo.showPositiveNotification = showPositiveNotification;
			demo.showNegativeNotification = showNegativeNotification;
			demo.showWarning = showWarning;
			demo.clearNotifications = clearNotifications;
			demo.reset = reset;

			demo.reset();

			function reset() {
				demo.isSticky = false;
				demo.isPermanent = false;

				demo.clearNotifications();
				demo.showGenericNotification();
				demo.showPositiveNotification();
				demo.showNegativeNotification();
				demo.showWarning();
			}

			function clearNotifications() {
				demo.notifications.length = 0;
			}

			function showGenericNotification() {
				demo.notifications.push({
					text: 'Hi there!'
				});
			}

			function showPositiveNotification() {
				demo.notifications.push({
					type: 'positive',
					text: 'Good new everyone!'
				});
			}

			function showNegativeNotification() {
				demo.notifications.push({
					type: 'negative',
					text: 'Something just went terribly wrong.'
				});
			}

			function showWarning() {
				demo.notifications.push({
					type: 'warning',
					text: 'Heads up!'
				});
			}
		}
	}

})();
