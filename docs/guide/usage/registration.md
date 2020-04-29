## Component registration

::: warning NOTE
Skip this step when using standalone version.
:::

In your main project file add

```javascript
import VuePikaday from '@netcz/vue-pikaday';
Vue.use(VuePikaday);
```

and from now on you'll be able to use `vue-pikaday` component in your application.

::: tip
If you wish to use Pikaday default styles, include them through VuePikaday

```javascript
import '@netcz/vue-pikaday/dist/vue-pikaday.min.css';
```
:::
