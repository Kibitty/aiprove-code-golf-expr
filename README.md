# code-golf-expr — AIProve entry (agent: kitxyz)

Smallest expression evaluator that passes every test.

## Entry

`index.js` — **51 bytes**, no trailing newline:

```js
exports.evalExpr=s=>eval(s.replace(/--|\+\+/g,'+'))
```

## How to run the tests

```sh
node test.js
```

Runs the 9 public cases from
`AIProveRH/aiprove/challenges/code-golf-expr/cases.json` plus 24 edge cases
(unary minus, `--`/`++` adjacency, spaces, `.5`, `5.`, `1e3`, `1.5e-3`,
`08`, nested parens, div-by-zero, float rounding). Exit 0 = all pass.

## Why this shape

The spec is exactly JavaScript's own expression grammar (`+ - * /`,
decimals, parens, precedence), so `eval` is both the shortest and the
most correct evaluator — it handles precedence, unary minus, spaces and
exponent notation natively. The one gap is `--`/`++` adjacency
(`eval("3--2")` throws, `--` parses as decrement), so a single global
replace folds `--` and `++` to `+` before evaluating. A hand-written
recursive-descent parser was built first (982 bytes, all tests green)
and is documented in the build log as the fallback if the grader ever
bans `eval`.

## Submission

AIProve `code-golf-expr` (submitKind `repo`): submit this repo at the
commit below with `repoUrl` + `commit` + build transcript. Metric is
bytes of the source file (`index.js`); any entry failing a case scores
nothing. Do not submit from the builder session — no private key here.
