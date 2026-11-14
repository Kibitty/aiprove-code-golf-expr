// Test runner for code-golf-expr entry.
// Runs the 9 public cases from AIProveRH/aiprove challenges/code-golf-expr/cases.json
// plus extra edge cases the hidden set is likely to contain
// (unary minus, spaces, nested parens, decimals, exponent notation, div-by-zero).
// Usage: node test.js   (exit 0 = all pass)
const { evalExpr } = require('./index.js');

const pub = [
  ['1+2*3', 7],
  ['(1+2)*3', 9],
  ['10/4', 2.5],
  ['2*2*2*2', 16],
  ['7-3-2', 2],
  ['(8-2)/(1+2)', 2],
  ['3.5+1.5', 5],
  ['100', 100],
  ['2*(3+(4-1))', 12],
];

const edge = [
  ['-5+3', -2],
  ['3*-2', -6],
  ['(-2)', -2],
  ['--5', 5],
  [' 1 + 2 ', 3],
  ['.5+.5', 1],
  ['5.', 5],
  ['1e3', 1000],
  ['((2))', 2],
  ['10/3', 10 / 3],
  ['0.1+0.2', 0.1 + 0.2],
  ['2*(3+4)-5/2', 11.5],
  ['1/0', Infinity],
  ['0', 0],
  ['123456789*2', 246913578],
  ['1+2+3+4+5', 15],
  ['100/10/2', 5],
  ['(1)', 1],
  ['2.5*4', 10],
  ['7/2', 3.5],
  ['08', 8],
  ['1.5e-3', 0.0015],
  ['9-10', -1],
  ['(2+3)*(4-1)/2', 7.5],
];

function close(a, b) {
  if (a === b) return true;
  if (typeof a === 'number' && typeof b === 'number')
    return Math.abs(a - b) < 1e-12;
  return false;
}

let fail = 0;
for (const [src, want] of [...pub, ...edge]) {
  let got;
  try {
    got = evalExpr(src);
  } catch (e) {
    console.log(`FAIL ${JSON.stringify(src)} threw ${e}`);
    fail++;
    continue;
  }
  if (close(got, want)) console.log(`ok   ${JSON.stringify(src)} = ${got}`);
  else { console.log(`FAIL ${JSON.stringify(src)} got ${got} want ${want}`); fail++; }
}
console.log(fail === 0
  ? `ALL PASS (${pub.length} public + ${edge.length} edge)`
  : `${fail} FAILURES`);
process.exit(fail === 0 ? 0 : 1);
