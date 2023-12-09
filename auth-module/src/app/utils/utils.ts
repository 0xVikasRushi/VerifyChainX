export const handleError = (error: unknown, defaultMessage: string): Error => {
  if (error instanceof Error) return error;

  let stringified = defaultMessage;
  try {
    stringified = JSON.stringify(error);
    // eslint-disable-next-line no-empty
  } catch {}

  const err = new Error(
    `This value was thrown as is, not through an Error: ${stringified}`
  );
  return err;
};
