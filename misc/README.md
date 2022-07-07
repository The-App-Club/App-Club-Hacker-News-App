Graph 化にあたり必要なのは flatten

```bash
$ node -r esm basic.js

$ node -r esm pagination.js

$ node -r esm flatten.js >dump.json

$ time node -r esm grouping.js > grouping-by-dump.json

real    0m3.063s
user    0m1.089s
sys     0m0.086s
```
