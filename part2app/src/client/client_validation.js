import validator from "validator";

export const validate = (propName, formdata) => {
  const val = formdata.get(propName);
  const results = {};

  const validationChain = {
    get propertyName() {
      return propName;
    },
    get results() {
      return results;
    },
  };

  validationChain.required = () => {
    results.required = !validator.isEmpty(val, { ignore_whitespace: true });
    // results.required = val?.trim().length > 0;
    return validationChain;
  };

  validationChain.minLength = (min) => {
    results.minLength = validator.isLength(val, { min });
    // results.minLength = val?.trim().length >= min;
    return validationChain;
  };

  validationChain.isInteger = () => {
    results.isInteger = validator.isInt(val);
    // results.isInteger = /^[0-9]+$/.test(val);
    return validationChain;
  };

  return validationChain;
};
