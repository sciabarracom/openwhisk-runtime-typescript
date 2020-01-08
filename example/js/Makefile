IMG=action-typescript-v3.7:latest
ACT=hello-demo-javascript
PREFIX=actionloop

src.zip: src/hello.js src/main.js package.json
	zip -r src.zip $^

bin.zip: src.zip
	docker run -i $(IMG) -compile main <src.zip >bin.zip

clean:
	-rm src.zip bin.zip

test-single:
	nim action update $(ACT) main.ts --docker $(PREFIX)/$(IMG)
	nim action invoke $(ACT) -r
	nim action invoke $(ACT) -p name Mike -r

test-src-zip: src.zip
	nim action update $(ACT) $< --docker $(PREFIX)/$(IMG)
	nim action invoke $(ACT) -r
	nim action invoke $(ACT) -p name Mike -r

test-bin-zip: bin.zip
	nim action update $(ACT) $< --docker $(PREFIX)/$(IMG)
	nim action invoke $(ACT) -r
	nim action invoke $(ACT) -p name Mike -r

.PHONE: test-single test-src-zip test-bin-zip clean

