interface GlobalObject {
  [fieldName: string]: unknown;
}

const clone = (o: GlobalObject): GlobalObject => JSON.parse(JSON.stringify(o));

const isObject = (val: any) =>
  val != null && typeof val === 'object' && Array.isArray(val) === false;

const isEqual = (a: GlobalObject, b: GlobalObject): boolean => {
  return JSON.stringify(a) === JSON.stringify(b);
};

export { clone, isObject, isEqual };
