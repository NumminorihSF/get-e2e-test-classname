// @flow
const globalRegistry: Set<string> = new Set();

let prefix: string = '-';

function getE2ETestClassName(className: string): string {
  if (globalRegistry.has(className)) {
    throw new Error('Class name ' + className + ' is not unique!');
  }

  globalRegistry.add(className);

  return `${prefix}${className}`;
}

module.exports.getE2ETestClassName = getE2ETestClassName;

module.exports.setPrefix = function setPrefix(nextPrefix: mixed) {
  if (typeof nextPrefix !== 'string') {
    throw new Error('Prefix should be a string. Got ' + nextPrefix);
  }
  if (globalRegistry.size !== 0) {
    throw new Error('Prefix can\'t be changed after creating any classname');
  }

  prefix = nextPrefix;
};

module.exports.createScoped = function createScoped(scopeName: string) {
  return function getE2ETestClassNameScoped(className: string): string {
    return getE2ETestClassName(scopeName + '_' + className);
  };
};
