export const getEnvVar = (envVar: string) => {
  const value = process.env[envVar];
  if (!value) {
    throw new Error(`missing env variable ${envVar}`);
  }
  return value;
};
