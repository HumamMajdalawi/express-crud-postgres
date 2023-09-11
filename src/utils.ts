/* Check if string is valid UUID */
export function checkIfValidUUID(str: string) {
  // Regular expression to check if string is a valid UUID
  const uuidv4Pattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  return uuidv4Pattern.test(str);
}
