// a string any dictionary
interface ClassDictionary {
  [key: string]: any;
}

//a possible value for class
type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassDictionary
  | ClassArray;

//an array of classvalue
type ClassArray = ClassValue[];

/**
 * convert a class value item to its string representation
 */
function toVal(mix: ClassValue): string {
  let k: number;
  let y: string | number;
  let str = '';

  //string or number -> use asis
  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix;
    //not a null objet -> spread into a single string
  } else if (typeof mix === 'object' && mix !== null) {
    //array
    if (Array.isArray(mix)) {
      const len = mix.length;
      //for each value
      for (k = 0; k < len; k++) {
        if (mix[k]) {
          //join resulting string
          if ((y = toVal(mix[k]))) {
            str && (str += ' ');
            str += y;
          }
        }
      }
      // otherwise join asis
    } else {
      for (y in mix) {
        if (mix[y]) {
          str && (str += ' ');
          str += y;
        }
      }
    }
  }

  return str;
}

/**
 * Merge class names into a single line string
 */
export function clsx(...args: ClassValue[]): string {
  let i = 0;
  let tmp: ClassValue;
  let x: string;
  let str = '';
  const len = args.length;

  for (; i < len; i++) {
    if ((tmp = args[i])) {
      if ((x = toVal(tmp))) {
        str && (str += ' ');
        str += x;
      }
    }
  }
  return str;
}

export default clsx;
