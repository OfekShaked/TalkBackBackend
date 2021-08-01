module.exports = isValid = (schema, object) => {
  const { error, value } = schema.validate(object);
  if(error) return false;
  return true;
};
