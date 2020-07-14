exports.handler = async(event) => {
  console.log('triggered: ' + JSON.stringify(event));
  return JSON.stringify(event);
};
