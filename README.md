# get-e2e-test-classname

This package allow to guarantee that class names used in e2e tests are unique.
Also it adds prefix for every classname to let QA know if some classname can be used by themselves. 

Example:
```jsx harmony
import { getE2ETestClassName } from 'get-e2e-test-classname';

const myClass = getE2ETestClassName('my');

const ReactComp = () => <button className={myClass}>test</button>;
```

In case of using non-unique className, this package will throw an error. Example:
```jsx harmony
import { getE2ETestClassName } from 'get-e2e-test-classname';

const myClass = getE2ETestClassName('my');
const myClass2 = getE2ETestClassName('my'); // throw new Error
```

Default prefix is `'-'`. So `getE2ETestClassName('my') === '-my'`  

### Change prefix
To use custom prefix, you can use next code:
```jsx harmony
import { getE2ETestClassName, setPrefix } from 'get-e2e-test-classname';

setPrefix('my-prefix-');

getE2ETestClassName('name'); // 'my-prefix-name\
```

**Warn!** Created classname is `prefix + originalClassName` without any separator. 

### Create scope
To prevent issues with hard-coding long part of classnames to make them unique, you may use scopes.
Code without scope:
```jsx harmony
import { getE2ETestClassName } from 'get-e2e-test-classname';

const e2e = {
  firstNameInput: getE2ETestClassName('my-form-inside-application-first-name-input'),
  lastNameInput: getE2ETestClassName('my-form-inside-application-last-name-input'),
  emailInput: getE2ETestClassName('my-form-inside-application-email-input'),
  passwordInput: getE2ETestClassName('my-form-inside-application-password-input'),
};
```

It can be replaced with:
```jsx harmony
import { createScoped } from 'get-e2e-test-classname';

const getE2ETestClassName = createScoped('my-form-inside-application');

const e2e = {
  firstNameInput: getE2ETestClassName('first-name-input'),
  lastNameInput: getE2ETestClassName('last-name-input'),
  emailInput: getE2ETestClassName('email-input'),
  passwordInput: getE2ETestClassName('password-input'),
};
```

**Warn!** Code isn't totally equal to unscoped cause created classnames will be different:

| Manual | Scoped |
|-------|------|
| `-my-form-inside-application-first-name-input` | `-my-form-inside-application_first-name-input` |
| `                           ^                ` | `                           ^                ` |
