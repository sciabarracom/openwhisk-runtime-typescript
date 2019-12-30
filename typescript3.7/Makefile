PREFIX=docker.io/actionloop
RTM=action-typescript-v3.7
INVOKE=python3 ../tools/invoke.py

build:
	$(MAKE) build-rtm -C ..

start:
	docker run -p 8080:8080 -ti -v $(PWD):/mnt $(RTM)

debug: build
	docker run -p 8080:8080 -p 8081:8081 -ti --entrypoint=/bin/bash \
	-v $(PWD):/mnt -e OW_COMPILER=/mnt/bin/compile $(RTM) 

.PHONY: build start debug

## You need to execute make start in another terminal 
test-single:
	$(INVOKE) init main ../example/main.ts
	#$(INVOKE) run '{}'
	#$(INVOKE) run '{"name":"Mike"}'


test-src-zip:
	$(MAKE) -C ../example src.zip
	$(INVOKE) init ../example/src.zip
	$(INVOKE) run '{}'
	$(INVOKE) run '{"name":"Mike"}'

test-bin-zip:
	$(MAKE) -C ../example bin.zip
	$(INVOKE) init ../example/bin.zip
	$(INVOKE) run '{}'
	$(INVOKE) run '{"name":"Mike"}'
