# nuxt-intercom

<a href="https://www.npmjs.com/package/nuxt-intercom"><img src="https://img.shields.io/npm/v/nuxt-intercom?style=flat-square"></a> <a href="https://www.npmjs.com/package/nuxt-intercom"><img src="https://img.shields.io/npm/dt/nuxt-intercom?style=flat-square"></a> <a href="#"><img src="https://img.shields.io/github/license/dogchef-be/nuxt-intercom?style=flat-square"></a>

NuxtJS module for Intercom

## Main features

- Load Intercom only when required (once `$intercom` is called)
- Reuse the same instance across all components
- TypeScript support

## Setup

1. Add `nuxt-intercom` dependency to your project:

```bash
npm install nuxt-intercom
```

2. Add `nuxt-intercom` module and configuration to `nuxt.config.js`:

```js
export default {
  // ...other config options
  modules: ["nuxt-intercom"];
  intercom: {
    appId: 'my_app_id',
  }
}
```

3. (Optional) TypeScript support. Add `nuxt-intercom` to the `types` section of `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["nuxt-intercom"]
  }
}
```

## Options

### `disabled`

- Type: `Boolean`
- Default: `false`

Disable Intercom. Useful for non-production environments.

### `appId`

- Type: `String`

The app_id of your Intercom app which will indicate where to store any data.

### `hideDefaultLauncher`

- Type: `Boolean`
- Default: `false`

Hide the default launcher icon. Setting to false will forcefully show the launcher icon.

### `alignment`

- Type: `String`
- Default: `right`

Dictate the alignment of the default launcher icon to be on the left/right. Possible values: "left" or "right" (any other value is treated as right).

### `horizontalPadding`

- Type: `Number`
- Default: `20`

Move the default launcher icon horizontally. Padding from right side of screen Minimum value: 20.

### `verticalPadding`

- Type: `Number`
- Default: `20`

Move the default launcher icon vertically. Padding from bottom of screen. Minimum value: 20.

### `enableMobilePadding`

- Type: `Boolean`
- Default: `false`

Apply the `verticalPadding` property to mobile devices.

## Usage

It can be used inside components like:

```html
<button type="button" @click="$intercom('show')">Chat with us</button>
```

Intercom: [Javascript API: Methods](https://developers.intercom.com/installing-intercom/docs/intercom-javascript)

## License

See the LICENSE file for license rights and limitations (MIT).
