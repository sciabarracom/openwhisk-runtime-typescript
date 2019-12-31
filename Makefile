PREFIX=docker.io/actionloop
TS=action-typescript-v3.7:latest
JS=action-nodejs-v12:latest
IDE=ide-typescript:latest

help: 
	@echo TODO

build-ts:
	docker build -t $(TS) typescript3.7
	docker tag $(TS) $(PREFIX)/$(TS) 

build-js:
	docker build -t $(JS) nodejs12
	docker tag $(JS) $(PREFIX)/$(JS) 

build-ide:
	docker build -t $(IDE) ide
	docker tag $(IDE) $(PREFIX)/$(IDE)

push: build-js  build-ts build-ide
	docker login
	docker push $(PREFIX)/$(JS)
	docker push $(PREFIX)/$(TS)
	docker push $(PREFIX)/$(IDE)

clean:
	docker rmi -f $(RTM)
	docker rmi -f $(IDE)

