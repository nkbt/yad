node_modules\.bin\jscoverage lib lib-cov
set YAD_COV=1
set NODE_ENV=test
node_modules\.bin\mocha -b --reporter=html-cov > doc/coverage.html
