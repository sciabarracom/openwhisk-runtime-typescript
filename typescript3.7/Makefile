IMG=action-typescript-v3.7:latest
INVOKE=python3 ../tools/invoke.py
PREFIX=docker.io/openwhisk

build:
	docker build -t $(IMG) .

push: build
	docker login
	docker tag $(IMG) $(PREFIX)/$(IMG) 
	docker push $(PREFIX)/$(IMG)

clean:
	docker rmi -f $(IMG)

start: build
	docker run -p 8080:8080 -ti -v $(PWD):/mnt $(IMG)

debug: build
	docker run -p 8080:8080 -p 9229:9229 -ti --entrypoint=/bin/bash \
	-v $(PWD):/mnt -e OW_COMPILER=/mnt/bin/compile $(IMG) 

.PHONY: build push clean start debug

## You need to execute make start in another terminal 
test-simple:
	$(INVOKE) init simple ../example/simple.ts


test-single:
	$(INVOKE) init hello ../example/hello.py
	$(INVOKE) run '{}'
	$(INVOKE) run '{"name":"Mike"}'

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
