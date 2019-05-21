.PHONY: clean build invoke

PROJECT = template-lambda-typescript
REGION = eu-central-1

clean:
	rm -rf ./dist

build: clean
	docker build -t $(PROJECT)-build .
	docker create --name $(PROJECT)-build $(PROJECT)-build
	docker cp $(PROJECT)-build:/dist ./
	docker rm $(PROJECT)-build

invoke: build
	cp ./.ssm.json ./dist/.ssm.json
	sam local invoke Function --template infrastructure.yml --region $(REGION) --env-vars .env.json
	$(MAKE) clean
