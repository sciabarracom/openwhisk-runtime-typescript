PREFIX=docker.io/actionloop
RTM=action-typescript-v3.7
INVOKE=python3 ../tools/invoke.py

start:
	docker run -p 8080:8080 -ti -v $(PWD):/mnt $(RTM)

debug: build
	docker run -p 8080:8080 -p 8081:8081 -ti --entrypoint=/bin/bash \
	-v $(PWD):/mnt -e OW_COMPILER=/mnt/bin/compile $(RTM) 

.PHONY: build start debug

## You need to execute make start in another terminal 
test-single:
	$(INVOKE) init main ../example/ts/main.ts
	$(INVOKE) run '{}'
	$(INVOKE) run '{"name":"Mike"}'

test-src-zip:
	$(MAKE) -C ../example/ts clean src.zip
	$(INVOKE) init  ../example/ts/src.zip
	$(INVOKE) run '{}'
	$(INVOKE) run '{"name":"Mike"}'

test-bin-zip:
	$(MAKE) -C ../example/ts clean bin.zip
	$(INVOKE) init ../example/ts/bin.zip
	$(INVOKE) run '{}'
	$(INVOKE) run '{"name":"Mike"}'

test-single-js:
	$(INVOKE) init main ../example/js/main.js
	$(INVOKE) run '{}'
	$(INVOKE) run '{"name":"Mike"}'

test-src-zip-js:
	$(MAKE) -C ../example/js clean src.zip
	$(INVOKE) init src/main ../example/js/src.zip
	$(INVOKE) run '{}'
	$(INVOKE) run '{"name":"Mike"}'

test-bin-zip-js:
	$(MAKE) -C ../example/js clean bin.zip
	$(INVOKE) init src/main ../example/js/bin.zip
	$(INVOKE) run '{}'
	$(INVOKE) run '{"name":"Mike"}'
