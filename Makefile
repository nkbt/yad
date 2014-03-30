REPORTER = dot
test:
    @NODE_ENV=test ./node_modules/.bin/mocha -b --reporter $(REPORTER)

app-cov:
    ./node_modules/.bin/jscoverage lib lib-cov

test-cov: app-cov
    @YAD_COV=1 $(MAKE) test REPORTER=html-cov > doc/coverage.html

.PHONY: test
