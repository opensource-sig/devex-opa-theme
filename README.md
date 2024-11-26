# DevEx-OPA Theme 🎨

A set of theming options for [MUI Material UI](https://mui.com/material-ui/) and
[Backstage](https://backstage.io/) that look more similar to [PatternFly](https://www.patternfly.org/).

It also includes a [Storybook](https://storybook.js.org/) and
a [Storybook test-runner](https://github.com/storybookjs/test-runner) for automatic visual regression tests.

## API

Returns all testable themes (incl. the backstage default color scheme and older DevEx Theme versions):

* `getAllThemes: () => AppTheme[]`
* `useAllThemes: () => AppTheme[]`

Returns the latest, not released DevEX light and dark theme for your backstage/DevEx instance:

* `getThemes: () => AppTheme[]`
* `useThemes: () => AppTheme[]`
* `useLoaderTheme: () => MUIv5.Theme`

## Install dependencies

```shell
npm install @opensource-sig/devex-opa-theme
```

or

```shell
yarn add @opensource-sig/devex-opa-theme
```

## Use it with DevEx app

Starting with latest versions this library is shipped with your DevEx installation.

On older DevEx instances you can install it:

1. Install the dependency with

   ```shell
   yarn workspace app add @opensource-sig/devex-opa-theme
   ```

2. In `packages/app/src/components/DynamicRoot/DynamicRoot.tsx`

   ```tsx
   import { useThemes } from '@opensource-sig/devex-opa-theme';

   // ...

     const themes = useThemes();

   // ... 

         app.current = createApp({
           apis: [...staticApis, ...remoteApis],
           // ... remove defaultThemes from here:
           themes,
           components: defaultAppComponents,
         });
   ```

## Use it with any Backstage app

1. Install the dependency with

   ```shell
   yarn workspace app add @opensource-sig/devex-opa-theme
   ```

2. Update `packages/app/src/App.tsx` and apply the themes to `createApp`:

   ```tsx
   import { getThemes } from '@opensource-sig/devex-opa-theme';

   // ...

   const app = createApp({
     apis,
     // ...
     themes: getThemes(),
   ```

## Use it while developing a plugin


1. Install the dependency with

   ```shell
   yarn workspace <plugin-root or plugin-name> add @opensource-sig/devex-opa-theme
   ```

2. Add to your `*/dev/index.tsx`:

   ```tsx
   import { getAllThemes } from '@opensource-sig/devex-opa-theme';

   // ...

   createDevApp()
     .registerPlugin(...)
     .addThemes(getAllThemes())
     .addPage({
       // ...
     })
     .render();
   ```

## Use `yarn link`

1. Clone the devex-opa-theme and run `npm link` in it:

   ```shell
   cd devex-opa-theme
   yarn link
   ```

2. To use this link you can cd any other repository:

   ```shell
   cd ../backstage-plugins
   yarn link @opensource-sig/devex-opa-theme
   ```

## Additional links

* Backstage
  * [Getting started > App custom theme](https://backstage.io/docs/getting-started/app-custom-theme/)
  * [packages/theme/src/unified](https://github.com/backstage/backstage/tree/master/packages/theme/src/unified)
  * [packages/theme/src/unified/types.ts](https://github.com/backstage/backstage/blob/master/packages/theme/src/unified/types.ts)
  * [packages/theme/src/v4/baseTheme.ts](https://github.com/backstage/backstage/blob/master/packages/theme/src/v4/baseTheme.ts)
  * [packages/theme/src/unified/UnifiedTheme.tsx](https://github.com/backstage/backstage/blob/master/packages/theme/src/unified/UnifiedTheme.tsx)
* PatternFly
  * [PatternFly design foundation](https://www.patternfly.org/design-foundations/colors)
  * [PatternFly v6 design foundation](https://staging-v6.patternfly.org/design-foundations/colors)
  * [Red Hat Brand standards/colors](https://www.redhat.com/en/about/brand/standards/color)
* MUI v4:
  * [Theming](https://v4.mui.com/customization/theming/)
  * [Palette](https://v4.mui.com/customization/palette/)
* MUI v5
  * [Theming](https://mui.com/material-ui/customization/theming/)
  * [Palette](https://mui.com/material-ui/customization/palette/)
  * [Theme components](https://mui.com/material-ui/customization/theme-components/)
  * [packages/mui-material/src/styles/adaptV4Theme.js](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/styles/adaptV4Theme.js)
