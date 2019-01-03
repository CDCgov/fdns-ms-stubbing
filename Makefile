docker-build:
	docker build \
		-t fdns-ms-stubbing \
		--rm \
		.

docker-run: docker-start
docker-start:
	docker run -d \
	-p 3002:3002 \
	fdns-ms-stubbing

docker-stop:
	docker stop fdns-ms-stubbing || true
