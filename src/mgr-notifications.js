(function () {
	// jshint latedef: false
	'use strict';

	angular
		.module('mgr.notifications', [])
		.directive('mgrNotifications', [
			mgrNotifications
		]);

	function mgrNotifications() {
		return {
			restrict: 'EA',
			replace: true,
			templateUrl: 'mgr-notifications.html',
			scope: {
				list: '=ngModel',
				permanent: '=',
				sticky: '=',
				position: '@'
			},
			bindToController: true,
			controller: NotificationsController,
			controllerAs: 'notifications'
		};

		function NotificationsController() {
			var notifications = this;

			notifications.updateClasses = updateClasses;
			notifications.dismiss = dismiss;

			function updateClasses() {
				var classes = {
					'mgr-permanent':       notifications.permanent,
					'mgr-sticky':          notifications.sticky,
					'mgr-position-top':    /top/.test(notifications.position),
					'mgr-position-left':   /left/.test(notifications.position),
					'mgr-position-bottom': /bottom/.test(notifications.position),
					'mgr-position-right':  /right/.test(notifications.position)
				};

				if (!notifications.position) {
					classes['mgr-position-top'] = true;
				}

				return classes;
			}

			function dismiss($index) {
				notifications.list.splice($index, 1);
			}
		}
	}
})();
