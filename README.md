# mgr.notifications

Notification component for AngularJS. Renders a nice stack of various text messages.

## Usage

```html
<!doctype html>
	<html lang="en">
		<head>
			<!-- ... -->
			<link rel="stylesheet" href="./path/to/mgr-notifcations.css" />
			<!-- ... -->
		</head>
		<body>
			<!-- ... -->
			<mgr-notifications ng-model="someController.notifications" permanent="true" sticky="true" position="top"></mgr-notifications>
			<!-- ... -->
			<script src="./path/to/mgr-notifications.js"></script>
		</body>
	</html>
```

## Available parameters:

### `ng-model`

**Required**, contains an array of notification messages. If any present, shows them. Basically you just push strings into it, and the directive decorates them in a balloon-like fashion.

### `permanent`

Optional, disabled by default. When set to `true` the dismiss buttons are disabled, so the notification cannot be closed by user.

### `sticky`

Optional, disabled by default. When set to `true` the list appears at the top of the viewport rather than the place it's included.

### `position`

Optional, set to `top` by default. Requires `sticky` to be `true`. Meaningful values are:

```
   'top left'       'top'      'top right'
              +--------------+
              |              |
       'left' |   viewport   | 'right'
              |              |
              +--------------+
'bottom left'     'bottom'     'bottom right'
```

## Notifications

As to notifications themseleves, they are simple objects:

```javascript
var genericNotification = {
  type: 'negative',
  text: 'This is not how it works. This is not how any of this works.'
};
```

The `type` is a predefined CSS class (automatically prefixed with `mgr-`) and can be:

- `default` - generic notification (default one, no need to specify it explicitly)
- `negative`
- `positive`
- `warning`

...or anything else, just style it yourself.

## Controller

The controller logic looks like this:

```javascript
// No messages by default
someController.notifications = [];

// Generic notification
someController.notifications.push({
  text: 'Your coffee is ready.'
});

// Something isn't right
someController.notifications.push({
  type: 'negative',
  text: 'You are doing it wrong.'
});

// Something nice just happened
someController.notifications.push({
  type: 'positive',
  text: 'Yay, changes saved.'
});

// Something requires additional attention.
someController.notifications.push({
  type: 'warning',
  text: 'Well, if I was you, I would not do what you are about to do.'
});
```

## See also

For a proper example see `demo/`.
