const globalRegistry = new Set();

module.exports.getE2ETestClassName = function(className) {
  if (globalRegistry.has(className)) {
    throw new Error(`Class name ${className} is not unique!`);
  }

  globalRegistry.add(className);

  return `-${className}`;
};
