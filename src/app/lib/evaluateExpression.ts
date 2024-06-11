export const evaluateExpression = (
  expression: string,
  obj: Record<string, any>
) => {
  // Extract all string expressions from the input expression
  const regex = /\[[a-zA-Z_.]+\]/g;
  let match;
  const stringExpressions = [];

  while ((match = regex.exec(expression)) !== null) {
    stringExpressions.push(match[0].slice(1, -1)); // remove the brackets
  }

  // Iterate over the string expressions and evaluate each one
  for (const strExp of stringExpressions) {
    let evaluatedVariable;
    if (strExp.includes(".")) {
      const keys = strExp.split(".");

      evaluatedVariable = keys.reduce(
        (obj, key) => (obj && obj[key] !== undefined ? obj[key] : ""),
        obj
      );

      if (typeof evaluatedVariable === "string") {
        evaluatedVariable = evaluatedVariable ? `"${evaluatedVariable}"` : "";
      }
    } else {
      evaluatedVariable = obj[strExp];
    }
    expression = expression.replace(
      new RegExp(`\\[${strExp}\\]`, "g"),
      evaluatedVariable
    );
  }

  try {
    const evaluateExpression = eval(expression);
    return evaluateExpression;
  } catch (error) {
    return expression;
  }
};
