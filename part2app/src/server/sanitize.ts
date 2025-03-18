const matchPattern = /[&<>="'`]/g;

const characterMappings: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "=": "&#x3D;",
  "'": "&#x27;",
  "`": "&#x60;",
};

export const sanitizeValue = (value: string) => {
  console.log(value);
  let sanitizedValue = value?.replace(
    matchPattern,
    (match) => characterMappings[match]
  );
  console.log(sanitizedValue);
  return sanitizedValue;
};
