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

Currently prefix is `'-'`. So `getE2ETestClassName('my') === '-my'`  